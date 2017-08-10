import { Component } from '@angular/core';
import { DepartmentService } from './services/department.service';
import { RateService } from './services/rate.service';
import { PersonService } from './services/person.service';
import { ProjectionService } from './services/projection.service';
import { ProjectService } from './services/project.service';
import { PortfolioService } from './services/portfolio.service';
import { ActualService } from './services/actual.service';
import { DeleteService } from './services/delete.service';
import { ProcessZoneService } from './services/process-zone.service';
import { EditService } from './services/edit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ DepartmentService, 
               RateService, 
               PersonService, 
               ProjectionService, 
               ProjectService, 
               PortfolioService, 
               ActualService, 
               DeleteService, 
               ProcessZoneService,
               EditService ]
})
export class AppComponent {
  title = 'Budget Application User Interface';
}
