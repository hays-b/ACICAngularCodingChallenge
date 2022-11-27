import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';

@Component({
  selector: 'app-lineOfBusiness-detail',
  templateUrl: './lineOfBusiness-detail.component.html',
  styleUrls: ['./lineOfBusiness-detail.component.css'],
})
export class LineOfBusinessDetailComponent implements OnInit {
  lineOfBusiness: LineOfBusiness | undefined;
  quotes: number | undefined;
  id: number = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

  constructor(
    private route: ActivatedRoute,
    private lineOfBusinessService: LineOfBusinessService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getLineOfBusiness();
    this.getQuotesForLineOfBusiness();
  }

  getLineOfBusiness(): void {
    this.lineOfBusinessService
      .getLineOfBusiness(this.id)
      .subscribe((lineOfBusiness) => (this.lineOfBusiness = lineOfBusiness));
  }

  getQuotesForLineOfBusiness(): void {
    this.lineOfBusinessService
      .getQuotesForLineOfBusiness(this.id)
      .subscribe((n) => (this.quotes = n.length));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.lineOfBusiness) {
      this.lineOfBusinessService
        .updateLineOfBusiness(this.lineOfBusiness)
        .subscribe(() => this.goBack());
    }
  }
}
