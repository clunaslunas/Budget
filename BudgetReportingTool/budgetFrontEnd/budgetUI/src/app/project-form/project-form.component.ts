import { Component, OnInit, ViewChild, NgZone} from '@angular/core';
import { Project } from '../entity/project';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { PortfolioService } from '../services/portfolio.service';
import { ProjectListComponent } from '../project-list/project-list.component';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  create=false;
  portfolios: any[];
  label: string;
  progress: number=0;
  projectModel = new Project();
  @ViewChild(ProjectListComponent) viewChild: ProjectListComponent;

  constructor(private projectService: ProjectService, private portfolioService: PortfolioService) { }

  ngOnInit() {
    this.getPortfolios();
  }

  onSubmit(form: NgForm) {
    let portfolioLink = this.projectModel.portfolio;
    this.projectService.createProject(this.projectModel).subscribe( project =>{
      let projectPortfolioLink = project._links.portfolio.href;
      this.projectService.setProjectURL(projectPortfolioLink);
      this.projectService.putPortfolio(portfolioLink).subscribe( portfolio =>{
        console.log(portfolio);
      });
    });
    form.reset();
    this.create = false;
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
  getPortfolios() {
    this.portfolioService.getPortfolios().subscribe( portfolios => {
      this.portfolios = portfolios;
    });
  }

  setCreate() {
    this.create = true;
  }

  reload() {
    this.viewChild.ngOnInit();
  }


}
