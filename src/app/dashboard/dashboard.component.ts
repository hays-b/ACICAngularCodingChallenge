import { Component, OnInit } from '@angular/core';
import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';
import { tap, map, groupBy, mergeMap, toArray } from 'rxjs/operators'; /* NEW */

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  linesOfBusiness: LineOfBusiness[] = [];
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
      .pipe(
        
        // Group quotes for the same lineOfBusiness together
        mergeMap((quotes) => quotes),
        groupBy((quote) => quote.lineOfBusiness),

        // find the sum of the quotes based on group lengths
        mergeMap((groupedSums) => {
          return groupedSums.pipe(
            toArray(),
            map((items) => {
              return { lineOfBusiness: groupedSums.key, sum: items.length };
            })
          );
        }),
        toArray(),

        // sort by lobs with greatest number of quotes and slice down to top 2
        map((lobs) => {
          lobs.sort((a, b) => b.sum - a.sum);
          return lobs.map((highest) => highest.lineOfBusiness).slice(0, 2);
        }),
        tap(console.log)
      )
      .subscribe((highestQuote) => (this.highestQuotes = highestQuote));
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
        tap(console.log)
      )
      .subscribe((linesOfBusiness) => (this.linesOfBusiness = linesOfBusiness));
  }
  // NEW END -
}
