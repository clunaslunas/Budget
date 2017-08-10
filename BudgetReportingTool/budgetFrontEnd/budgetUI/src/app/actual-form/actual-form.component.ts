import { Component, OnInit, NgZone, ViewChild  } from '@angular/core';
import { NgForm } from '@Angular/forms';
import { ActualService } from '../services/actual.service';
import { ProjectService } from '../services/project.service';
import { Actual } from '../entity/actual';
import { Month } from '../entity/month';
import { ActualListComponent } from '../actual-list/actual-list.component';


@Component({
  selector: 'app-actual-form',
  templateUrl: './actual-form.component.html',
  styleUrls: ['./actual-form.component.css']
})
export class ActualFormComponent implements OnInit {

  create=false;
  month = Month;
  months: any[];
  actualModel = new Actual();
  projects: any[];
  label: string;
  progress: number = 0;
  @ViewChild(ActualListComponent) viewChild: ActualListComponent;

  constructor(private actualService: ActualService, private projectService: ProjectService) {
    
   }

  ngOnInit() {
    this.getProjects();
    this.setMonths();
  }

  onSubmit(form: NgForm) {
    let projectLink = this.actualModel.project;
  
    console.log(projectLink);
    this.actualService.createActual(this.actualModel).subscribe( actual =>{
      let actualProjectLink = actual._links.project.href;
      console.log(actualProjectLink);
      this.actualService.setActualURL(actualProjectLink);
      this.actualService.putProject(projectLink).subscribe( project => {
        console.log(project);
      });
    });
    form.reset();
    this.create = false;
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

  getProjects() {
    console.log("Getting Projects!");
    this.projects = [];
    this.projectService.getProjects().subscribe( projects =>{
      this.projects = projects;
      console.log(projects);
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

  setCreate() {
    this.create = true;
  }

  reload() {
    this.viewChild.ngOnInit();
  }
}
