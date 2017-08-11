import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Person } from '../entity/person';
import { Projection } from '../entity/projection';
import { DeleteService } from '../services/delete.service';
import { EditService } from '../services/edit.service';

@Injectable()
export class ProjectionService {

  private projectionsURL = 'http://40.80.152.41:5000/projections';
  private projectionURL;
  private projectionPersonURL;
  private projectionProjectURL;

  constructor(private http: Http, private deleteService: DeleteService, private editService: EditService) { }

  getProjections(): Observable<any[]> {
    return this.http.get(this.projectionsURL)
    .map(this.extractDatas);
  }

  getProjection(): Observable<any> {
    return this.http.get(this.projectionURL)
    .map(this.extractData);
  }

  getOptionHeader(): RequestOptions {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});
    return options;
  }

  getProjectBody(projectLink) {
    let projectBody = '{"_links": {"project":{"href":"' + projectLink + '"}}}';
    return projectBody;
  }

  getPersonBody(personLink) {
    let personBody = '{"_links": {"person":{"href":"' + personLink + '"}}}';
    return personBody;
  }

  setProjectionURL(url: string) {
    this.projectionURL = url;
  }

  setProjectionPersonURL(url: string) {
    this.projectionPersonURL = url;
  }

  setProjectionProjectURL(url: string) {
    this.projectionProjectURL = url;
  }

  putProject(projectLink): Observable<any> {
    console.log(this.projectionProjectURL);
    let options = this.getOptionHeader();
    let projectBody = this.getProjectBody(projectLink);
    console.log(projectBody);
    return this.http.put(this.projectionProjectURL, projectBody, options).map(this.extractData);
  }

  putPerson(personLink): Observable<any> {
    console.log(this.projectionPersonURL);
    let options = this.getOptionHeader();
    let personBody = this.getPersonBody(personLink);
    console.log(personBody);
    return this.http.put(this.projectionPersonURL, personBody, options).map(this.extractData);
  }

  createProjection(projection: Projection): Observable<any> {
    return this.http.post(this.projectionsURL, projection).map(this.extractData);
  }

  deleteProjection() {
    this.deleteService.delete(this.projectionURL).subscribe( projection =>{
      console.log(projection);
    });
  }

  editProjection(body){ 
    this.editService.editEntity(body, this.projectionURL).subscribe( projection =>{
      console.log(projection);
    });
  }

  private extractDatas(res: Response) {
    let body = res.json();  
    return body._embedded.projections;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }



}
