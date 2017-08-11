import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { DeleteService } from '../services/delete.service';
import { EditService } from '../services/edit.service';

@Injectable()
export class ActualService {
  private actualsURL = 'http://40.80.152.41:5000/actuals';
  private actualURL;
  private projectURL;

  constructor(private http: Http, private deleteService: DeleteService, private editService: EditService) { }

  getActuals(): Observable<any[]> {
    return this.http.get(this.actualsURL)
    .map(this.extractDatas);
  }

  getActual(): Observable<any> {
    return this.http.get(this.actualURL)
    .map(this.extractData);
  }

  setActualURL(url: string) {
    this.actualURL = url;
  }

  createActual(actual: any): Observable<any> {
    return this.http.post(this.actualsURL, actual).map(this.extractData);
  }

  editActual(body) {
    this.editService.editEntity(body, this.actualURL).subscribe( actual => {
      console.log(actual);
    });
  }
  deleteActual() {
    this.deleteService.delete(this.actualURL).subscribe(actual => {
      console.log(actual);
    }); 
  }

  putProject(projectLink): Observable<any> {
    let projectBody = this.getProjectBody(projectLink);
    let options = this.getOptionHeader();
    return this.http.put(this.projectURL, projectBody, options).map(this.extractData);
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

  setProjectURL(url: string) {
    this.projectURL = url;
  }

  private extractDatas(res: Response) {
    let body = res.json();
    return body._embedded.actuals || {};
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

}
