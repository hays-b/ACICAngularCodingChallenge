import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LineOfBusinessSearchComponent } from './lineOfBusiness-search/lineOfBusiness-search.component'; /* NEW */
import { LineOfBusinessComponent } from './linesOfBusiness/linesOfBusiness.component';
import { LineOfBusinessDetailComponent } from './lineOfBusiness-detail/lineOfBusiness-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard', component: LineOfBusinessSearchComponent }, /* NEW */
  { path: 'detail/:id', component: LineOfBusinessDetailComponent },
  { path: 'linesOfBusiness', component: LineOfBusinessComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
