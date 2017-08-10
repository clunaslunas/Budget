import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RestangularModule, RestangularHttp, Restangular } from 'ngx-restangular';
import { AppComponent } from './app.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { RateListComponent } from './rate-list/rate-list.component';
import { ActualListComponent } from './actual-list/actual-list.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectionListComponent } from './projection-list/projection-list.component';
import { PortfolioListComponent } from './portfolio-list/portfolio-list.component';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonFormComponent } from './person-form/person-form.component';
import { MdTableModule } from '@angular/material';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectionFormComponent } from './projection-form/projection-form.component';
import { ActualFormComponent } from './actual-form/actual-form.component';
import { RateFormComponent } from './rate-form/rate-form.component';
import { PortfolioFormComponent } from './portfolio-form/portfolio-form.component';
import { AlertModule } from 'ngx-bootstrap';
import { AccordionModule } from 'ngx-bootstrap';
import { ContentEditableDirective } from './directives/content-editable.directive';
import { ReportsComponent } from './reports/reports.component';

export function RestangularConfigFactory(RestangularProvider) {
  RestangularProvider.setBaseUrl('http://localhost:8080');
  RestangularProvider.addResponseInterceptor((data, operation, what, url, response) => {
    return data._embedded.departments;
  });
}
@NgModule({
  declarations: [
    AppComponent,
    DepartmentListComponent,
    RateListComponent,
    ActualListComponent,
    ProjectListComponent,
    ProjectionListComponent,
    PortfolioListComponent,
    PersonListComponent,
    PersonFormComponent,
    DepartmentFormComponent,
    ProjectFormComponent,
    ProjectionFormComponent,
    ActualFormComponent,
    RateFormComponent,
    PortfolioFormComponent,
    ContentEditableDirective,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RestangularModule.forRoot(RestangularConfigFactory),
    MdTableModule,
    AlertModule.forRoot(),
    AccordionModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
