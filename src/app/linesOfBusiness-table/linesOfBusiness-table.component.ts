import { Component, OnInit } from '@angular/core';
import {
  LineOfBusiness,
  RecentQuote,
  LineOfBusinessWithQuotes,
} from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';

@Component({
  selector: 'app-linesOfBusiness-table',
  templateUrl: './linesOfBusiness-table.component.html',
  styleUrls: ['./linesOfBusiness-table.component.css'],
})
export class LinesOfBusinessTableComponent implements OnInit {
  recentQuotes: RecentQuote[] = [];
  linesOfBusinessWithQuotes: LineOfBusinessWithQuotes[] = [];

  constructor(private lineOfBusinessService: LineOfBusinessService) {}

  ngOnInit() {
    this.getQuotesForLinesOfBusiness();
    this.getLinesOfBusiness();
  }

  getQuotesForLinesOfBusiness(): void {
    this.lineOfBusinessService
      .getQuotes()
      .subscribe((recentQuotes) => (this.recentQuotes = recentQuotes));
  }

  getLinesOfBusiness(): void {
    this.lineOfBusinessService
      .getLinesOfBusiness()
      .subscribe(
        (linesOfBusiness) =>
          (this.linesOfBusinessWithQuotes = this.attachQuotes(linesOfBusiness))
      );
  }

  attachQuotes(linesOfBusiness: LineOfBusiness[]): LineOfBusinessWithQuotes[] {
    let currentLine: string = '';
    const hash = { [currentLine]: 0 };

    // create hashtable for lines of business and how many quotes they each have
    for (const quote of this.recentQuotes) {
      const lineId: string = quote.lineOfBusiness.toString();
      if (hash[lineId]) hash[lineId]++;
      else hash[lineId] = 1;
    }

    // Add sum of quotes as a property to lines of business and sort
    const sortedLobs = linesOfBusiness
      .map((lobs) => ({
        ...lobs,
        quotes: hash[lobs.id.toString()],
      }))
      .sort((a, b) => b.quotes - a.quotes);

    return sortedLobs;
  }
}
