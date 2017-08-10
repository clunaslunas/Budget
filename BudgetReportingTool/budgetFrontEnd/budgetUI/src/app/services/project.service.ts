import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { DeleteService } from '../services/delete.service';
import { EditService } from '../services/edit.service';


@Injectable()
export class ProjectService {
  private projectsURL = 'http://localhost:8080/projects';
  private projectURL;
  private portfolioURL;

  constructor(private http: Http, private deleteService: DeleteService, private editService: EditService) { }

  getProjects(): Observable<any[]> {
    return this.http.get(this.projectsURL)
    .map(this.extractDatas);
  }

  getProject(): Observable<any> {
    return this.http.get(this.projectURL)
    .map(this.extractData);
  }

  setProjectURL(url: string) {
    this.projectURL = url;
  }

  setPortfolioURL(url: string) {
    this.portfolioURL = url;
  }

  createProject(project: any): Observable<any> {
    return this.http.post(this.projectsURL, project).map(this.extractData);
  }

  editProject(body) {
    console.log("Editing at " + this.projectURL);
    this.editService.editEntity(body, this.projectURL).subscribe( project => {
      console.log(project);
    });
  }

  deleteProject() {
    this.deleteService.delete(this.projectURL).subscribe( project => {
      console.log(project);
    });
  }

  putPortfolio(portfolioLink): Observable<any> {
    let options = this.getOptionHeader();
    let portfolioBody = this.getPortfolioBody(portfolioLink);
    console.log("Putting at " + this.portfolioURL);
    return this.http.put(this.portfolioURL, portfolioBody, options).map(this.extractData);
  }

  getOptionHeader(): RequestOptions {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});
    return options;
  }

  getPortfolioBody(portfolioLink) {
    let portfolioBody = '{"_links": {"portfolio":{"href":"' + portfolioLink + '"}}}';
    return portfolioBody;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
  private extractDatas(res: Response) {
    let body = res.json();    
    return body._embedded.projects || {};
  }

}
