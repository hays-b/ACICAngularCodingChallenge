import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; /* NEW 'Router' */
import { Location } from '@angular/common';

import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';

@Component({
  selector: 'app-lineOfBusiness-detail',
  templateUrl: './lineOfBusiness-detail.component.html',
  styleUrls: [ './lineOfBusiness-detail.component.css' ]
})
export class LineOfBusinessDetailComponent implements OnInit {
  lineOfBusiness: LineOfBusiness | undefined;
  quotes: number | undefined; /* NEW */

  constructor(
    private router: Router, /* NEW */
    private route: ActivatedRoute,
    private lineOfBusinessService: LineOfBusinessService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Because we are passing down a changed state when navigating between popular lines of business, we must tell the router to not reuse the previous details component
    this.router.routeReuseStrategy.shouldReuseRoute = () => false; /* NEW */
    this.getLineOfBusiness();
    this.getQuotesForLineOfBusiness() /* NEW */
  }

  getLineOfBusiness(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.lineOfBusinessService.getLineOfBusiness(id)
      .subscribe(lineOfBusiness => this.lineOfBusiness = lineOfBusiness);
  }

  // NEW START -
  getQuotesForLineOfBusiness(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.lineOfBusinessService.getQuotesForLineOfBusiness(id)
      .subscribe(n => this.quotes = n.length);
  }
  // NEW END -

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.lineOfBusiness) {
      this.lineOfBusinessService.updateLineOfBusiness(this.lineOfBusiness)
        .subscribe(() => this.goBack());
    }
  }
}
