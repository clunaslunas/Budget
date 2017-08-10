import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { PortfolioService } from '../services/portfolio.service';
import { Project } from '../entity/project';
import { Portfolio } from '../entity/portfolio';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: Project[];
  project: any;
  portfolio: Portfolio;
  portfolios: any[];
  label: string;
  progress: number = 0;
  delete = false;
  rowToEdit: any;
  editable: boolean = false;
  projectToEdit = new Project();

  constructor(private projectService: ProjectService, private portfolioService: PortfolioService) { }

  ngOnInit() {
    this.getProjects();
  }

  onSubmit(form: NgForm) {
    this.resetForm(form);
  }

  getProjects() {
    this.projectService.getProjects().subscribe(projects =>
    {
      this.projects = projects;
      let num=0;
      for(let project of projects) {
        let portfolioLink = project._links.portfolio.href;
        this.portfolioService.setPortfolioURL(portfolioLink);
        this.portfolioService.getPortfolio().subscribe(portfolio =>{
          this.portfolio = portfolio;
          this.projects[num].portfolio = this.portfolio;
          num++;
        });        
      }
    })
  }

  getPortfolios() {
    this.portfolios = [];
    this.portfolioService.getPortfolios().subscribe( portfolios => {
      this.portfolios = portfolios;
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

  editProject(project) {
    let projectPortfolioLink = project._links.portfolio.href;
    let projectLink: string = project._links.self.href;
    let body = JSON.parse(this.interceptBody());

    this.projectService.setPortfolioURL(projectPortfolioLink);
    this.projectService.setProjectURL(projectLink);
    this.projectService.editProject(body);
    console.log(body);
    if(!(this.projectToEdit.portfolio == null)) {
      let portfolioLink = this.projectToEdit.portfolio;
      this.projectService.putPortfolio(portfolioLink).subscribe( project => {
        console.log(project);
      });    
    }
    
    this.toggleEditable();
  }

  interceptBody(): string {
    let body: any;
    if(this.projectToEdit.csr == null && !(this.projectToEdit.description == null)) {
      body = JSON.stringify('{ "description": "' + this.projectToEdit.description + '" }');
      console.log(body);
    } else if (this.projectToEdit.description == null && !(this.projectToEdit.csr == null)) {
      body = JSON.stringify('{ "csr" : "' + this.projectToEdit.csr + '" }');
      console.log(body);
    } else if (this.projectToEdit.csr == null && this.projectToEdit.description == null) {
      body = JSON.stringify('{}');
      console.log(body);
    } else {
      body = JSON.stringify('{ "csr" : "' + this.projectToEdit.csr + '", "description": "' + this.projectToEdit.description + '" }');
      console.log(body);
    }
    console.log(body);
    return body;
  }

  resetForm(form: NgForm) {
    form.reset();
  }

  setDelete() {
    this.delete = true;
  }

  deleteProject(project) {
    this.projectService.setProjectURL(project);
    this.projectService.deleteProject();      
  }

  reload() {
    this.getProjects();
  }

  toggleContentEditable(row) {
    this.rowToEdit = row;
    this.toggleEditable();  
    this.getPortfolios();
  }

  toggleEditable() {
    this.editable = !this.editable;
  }

  setRowToEdit() {
    this.rowToEdit = " ";
  }

}
