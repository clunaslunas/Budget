import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Person } from '../entity/person';
import { Month } from '../entity/month';
import { Projection } from '../entity/projection';
import { Project } from '../entity/project';
import { PersonService } from '../services/person.service';
import { ProjectService } from '../services/project.service';
import { ProjectionService } from '../services/projection.service';


@Component({
  selector: 'app-projection-list',
  templateUrl: './projection-list.component.html',
  styleUrls: ['./projection-list.component.css']
})
export class ProjectionListComponent implements OnInit {

  projections: Projection[];
  person: Person;
  project: Project;
  delete = false;
  projection: any;
  label: string;
  progress: number = 0;
  rowToEdit: any;
  projectionToEdit = new Projection();
  editable: boolean = false;
  persons: any[];
  projects: any[];
  month = Month;
  months: any[];

  constructor(private projectionService: ProjectionService, private personService: PersonService
              , private projectService: ProjectService) { }

  ngOnInit() {
    this.getProjections();
    this.setMonths();
  }

  onSubmit(form: NgForm) {
    this.resetForm(form);
  }
  
  getProjections() {
    this.projectionService.getProjections().subscribe( projections => {
      this.projections = projections;
      let num = 0;
      let numTwo = 0;    
      for(let projection of projections) {
        let personLink = projection._links.person.href;
        let projectLink = projection._links.project.href;    
        this.personService.setPersonURL(personLink);
        this.projectService.setProjectURL(projectLink);
        this.personService.getPerson().subscribe( person => {
          this.person = person;
          this.projections[num].person = this.person;
          num++;
        });
        this.projectService.getProject().subscribe(project =>{
          this.project = project;
          this.projections[numTwo].project = this.project;
          numTwo++;
        });
      }
    });
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

  reload() {
    this.getProjections();
  }

  editProjection(projection) {
    let projectionPersonLink = projection._links.person.href
    let projectionProjectLink = projection._links.project.href;
    let projectionLink = projection._links.self.href;
    let personLink = this.projectionToEdit.person;
    console.log(personLink);
    let projectLink = this.projectionToEdit.project;
    console.log(projectLink);
   
    this.projectionService.setProjectionPersonURL(projectionPersonLink);
    this.projectionService.setProjectionProjectURL(projectionProjectLink);
    this.projectionService.setProjectionURL(projectionLink);
    let body = JSON.parse(this.interceptBody());
    console.log(body);
    this.projectionService.editProjection(body);
    this.projectionService.putPerson(personLink).subscribe( projection => {
      console.log(projection);
    });
    this.projectionService.putProject(projectLink).subscribe( projection => {
      console.log(projection);
    });      
    this.toggleEditable();    
  }

  deleteProjection(projection) {
    this.projectionService.setProjectionURL(projection);
    this.projectionService.deleteProjection();
  }

  setRowToEdit() {
    this.rowToEdit = " ";
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

  resetForm(form: NgForm) {
    form.reset();
  }

  toggleEditable() {
    this.editable = !this.editable;
  }

  toggleContentEditable(row) {
    this.rowToEdit = row;
    this.setEditable();
    this.getPersons();
    this.getProjects();

  }

  interceptBody(): string {
    let body: any;
    console.log(this.projectionToEdit);
    if(this.projectionToEdit.month == null && !(this.projectionToEdit.percentAllocation == null)) {
      body = JSON.stringify('{ "percentAllocation" : ' + this.projectionToEdit.percentAllocation + '}');
    } else if (this.projectionToEdit.percentAllocation == null && !(this.projectionToEdit.month == null)) {
      body = JSON.stringify('{ "month" : "' + this.projectionToEdit.month + '" }');    
    } else if (this.projectionToEdit.month == null && this.projectionToEdit.month == null) {
      body = JSON.stringify('{ }');
    } else {
      body = JSON.stringify('{ "month": "' + this.projectionToEdit.month + '", "percentAllocation": ' + this.projectionToEdit.percentAllocation + '}');
    }    
    return body;
  }


  private setEditable() {
    this.editable = !this.editable;
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

}
