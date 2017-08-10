import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Projection } from '../entity/projection';
import { Month } from '../entity/month';
import { ProjectionListComponent } from '../projection-list/projection-list.component';
import { PersonService } from '../services/person.service';
import { ProjectService } from '../services/project.service';
import { ProjectionService } from '../services/projection.service';

@Component({
  selector: 'app-projection-form',
  templateUrl: './projection-form.component.html',
  styleUrls: ['./projection-form.component.css']
})
export class ProjectionFormComponent implements OnInit {

  create = false;
  projectionModel = new Projection();
  persons: any[];
  projects: any[];
  month = Month;
  months: any[];
  nums: Number[];
  label: string;
  progress: number = 0;
  @ViewChild(ProjectionListComponent) viewChild: ProjectionListComponent;

  constructor(private projectionService: ProjectionService, private personService: PersonService, private projectService: ProjectService, private ngzone: NgZone) { 
    this.nums = Array.from(Array(100), (x,i)=>i+1);
  }

  ngOnInit() {
    this.getPersons();
    this.getProjects();
    this.setMonths();
  }

  processWithinAngularZone() {
    this.label = 'inside';
    this.progress = 0;
    this._increaseProgress(() => this.reload());

  }

  _increaseProgress(doneCallback: () => void) {
    this.progress += 1;
    console.log(`Current progress: ${this.progress}%`);
 
    if (this.progress < 100) {
      window.setTimeout(() => this._increaseProgress(doneCallback)), 10;
    } else {
      doneCallback();
    }
  }

  onSubmit(form: NgForm) {    
    let personLink = this.projectionModel.person;
    let projectLink = this.projectionModel.project;
    console.log(this.projectionModel.percentAllocation);
    this.projectionService.createProjection(this.projectionModel).subscribe( projection => {
      let projectionPersonLink = projection._links.person.href;   
      console.log(projectionPersonLink);   
      let projectionProjectLink = projection._links.project.href;    
      console.log(projectionProjectLink);
      this.projectionService.setProjectionPersonURL(projectionPersonLink);
      this.projectionService.setProjectionProjectURL(projectionProjectLink);
      this.projectionService.putPerson(personLink).subscribe( person =>{         
        console.log(person);              
      });      
      this.projectionService.putProject(projectLink).subscribe( project => {
        console.log(project);
      });        
    });
    form.reset();
    this.create = false;
  }

  private getPersons(){
    this.persons = [];
    this.personService.getPersons().subscribe( persons =>{
      this.persons = persons;
      if(persons.length >= 20 ) {
        this.personService.getNextPersons().subscribe( persons => {      
          this.persons = this.persons.concat(persons);          
        });
      }
    });
  }

  private getProjects() {
    this.projects = [];
    this.projectService.getProjects().subscribe( projects => {
      this.projects = projects;
      console.log(this.projects);
    });
  }

  setCreate() {
    this.create = !this.create;
  }

  setMonths() {
    this.months = [];
    for (const month in this.month) {
      if(!Number(month) && !((month.valueOf()) === '0')) {
        console.log(month);
        this.months.push(month);
      }
    }
  }

  reload() {
    this.viewChild.ngOnInit();
  }

 
}
