import { Component, OnInit } from '@angular/core';
import { LineOfBusiness, RecentQuote } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';
import { tap, map, groupBy, mergeMap, toArray } from 'rxjs/operators'; /* NEW */

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  linesOfBusiness: LineOfBusiness[] = [];
  // quotes: RecentQuote[] = []; /* NEW */
  highestQuotes: number[] = []; /* NEW */

  constructor(private lineOfBusinessService: LineOfBusinessService) {}

  ngOnInit() {
    this.getQuotesForLinesOfBusiness();
    this.getLinesOfBusiness();
  }

  // getLinesOfBusiness(): void {
  //   this.lineOfBusinessService
  //     .getLinesOfBusiness()
  //     .subscribe(
  //       (linesOfBusiness) =>
  //         (this.linesOfBusiness = linesOfBusiness.slice(1, 4))
  //     );
  // }

  // NEW START -
  getQuotesForLinesOfBusiness(): void {
    this.lineOfBusinessService
      .getQuotes()
      .subscribe((quotes) => (this.highestQuotes = this.sortQuotes(quotes)));
  }

  getLinesOfBusiness(): void {
    this.lineOfBusinessService
      .getLinesOfBusiness()
      .pipe(
        map((lines) =>
          lines.filter(
            (line) =>
              line.id === this.highestQuotes[0] ||
              line.id === this.highestQuotes[1]
          )
        ),
      )
      .subscribe((linesOfBusiness) => (this.linesOfBusiness = linesOfBusiness));
  }

  sortQuotes(quotes: RecentQuote[]): number[] {
    let currentLine = '';
    const hash = { [currentLine]: 0 };

    // create hashtable for lines of business and how many quotes they each have
    for (const quote of quotes) {
      const line = quote.lineOfBusiness;
      if (hash[line]) hash[line] += 1;
      else hash[line] = 1;
    }

    // sort lines based on highest number of quotes and return line ids
    let sortedHash = Object.keys(hash)
      .sort((a, b) => hash[b] - hash[a])
      .map((sortedHash) => parseInt(sortedHash));

    return sortedHash;
  }

  // getQuotesForLinesOfBusiness(): void {
  //   this.lineOfBusinessService
  //     .getQuotes()
  //     .pipe(
  //       // Group quotes for the same lineOfBusiness together
  //       mergeMap((quotes) => quotes),
  //       groupBy((quote) => quote.lineOfBusiness),

  //       // find the sum of the quotes based on group lengths
  //       mergeMap((groupedSums) => {
  //         return groupedSums.pipe(
  //           toArray(),
  //           map((items) => {
  //             return { lineOfBusiness: groupedSums.key, sum: items.length };
  //           })
  //         );
  //       }),
  //       toArray(),

  //       // sort by lobs with greatest number of quotes and slice down to top 2
  //       map((lobs) => {
  //         lobs.sort((a, b) => b.sum - a.sum);
  //         return lobs.map((highest) => highest.lineOfBusiness).slice(0, 2);
  //       }),
  //       tap(console.log)
  //     )
  //     .subscribe((highestQuote) => (this.highestQuotes = highestQuote));
  // }

  // NEW END -
}
