import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActualService } from '../services/actual.service';
import { ProjectService } from '../services/project.service';
import { Actual } from '../entity/actual';
import { Project } from '../entity/project';
import { Month } from '../entity/month';

@Component({
  selector: 'app-actual-list',
  templateUrl: './actual-list.component.html',
  styleUrls: ['./actual-list.component.css']
})
export class ActualListComponent implements OnInit {

  actuals: Actual[];
  nums: Number[];
  project: Project;
  projects: any[];  
  actual;
  label: string;
  progress: number=0;
  delete = false;
  editable: boolean = false;
  rowToEdit:any;
  actualToEdit = new Actual();
  month = Month;
  months: any[];


  constructor(private actualService: ActualService, private projectService: ProjectService) { 
    this.nums = Array.from(Array(12), (x,i)=>i+1);
  }

  ngOnInit() {
    this.getActuals();
    this.setMonths();
  }

  onSubmit(form: NgForm) {
    this.resetForm(form);
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

  setMonths() {
    this.months = [];
    for (const month in this.month) {
      if(!Number(month) && !((month.valueOf()) === '0')) {
        console.log(month);
        this.months.push(month);
      }
    }
  }

  getActuals(){
    this.actualService.getActuals().subscribe(actuals => {
      this.actuals = actuals;
      let num = 0;
      for(let actual of actuals) {
        let projectLink = actual._links.project.href;
        this.projectService.setProjectURL(projectLink);
        this.projectService.getProject().subscribe(project => {
          this.project = project; 
          this.actuals[num].project = this.project;
          num++;
        });
      }
    })
  }

  editActual(actual){
    let actualLink = actual._links.self.href;
    let actualProjectLink = actual._links.project.href;
    let projectLink = this.actualToEdit.project;
    let body = this.interceptBody();
    console.log(body);
    this.actualService.setActualURL(actualLink);
    this.actualService.editActual(body);
    if(!(actualProjectLink == null)) {
      this.actualService.setProjectURL(actualProjectLink);
      this.actualService.putProject(projectLink).subscribe( actual => {
        console.log(actual);
      });
    }
    console.log(actualLink);
    console.log(projectLink);
    console.log(actualProjectLink);
  }

  getProjects() {
    console.log("Getting Projects!");
    this.projects = [];
    this.projectService.getProjects().subscribe( projects =>{
      this.projects = projects;
      console.log(projects);
    });
  }

  deleteActual(actual) {
    console.log(actual);
    this.actualService.setActualURL(actual);
    this.actualService.deleteActual();
    this.toggleEditable();
  }

  interceptBody(): any {
    let body = Object.keys(this.actualToEdit).map(i => {
      let value = {};
      if(!(this.actualToEdit[i] == null)) {
        value[i] = this.actualToEdit[i];
      }
      return value;
    });
    let combine = {};
    for (let i of body) {
      combine = Object.assign(combine, i);
    }
    return combine;
  }

  reload() {
    this.getActuals();
    this.toggleEditable();
  }

  setRowToEdit(){
    this.rowToEdit = " ";
  }

  toggleContentEditable(row) {
    this.rowToEdit = row;
    this.getProjects();
    this.toggleEditable();
  }

  toggleEditable() {
    this.editable = !this.editable;
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
