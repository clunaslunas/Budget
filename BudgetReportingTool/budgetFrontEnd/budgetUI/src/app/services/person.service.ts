import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Person } from '../entity/person';
import { EditService } from '../services/edit.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class PersonService {
  private personsURL = 'http://40.80.152.41:5000/persons';
  private personURL;
  private departmentURL;
  private rateURL;
  person: Person;
  constructor(private http: Http, private editService: EditService) { }

  createPerson(person: Person): Observable<any>{
    return this.http.post(this.personsURL, person).map(this.extractPerson);
  }

  editPerson(entity) {
    this.editService.editEntity(entity, this.personURL).subscribe(person => {
      console.log(person);
    });
    
  }

  putDepartment(departmentLink): Observable<any> {
    console.log("Updating: " + this.departmentURL);
    let options = this.getOptionHeader();
    let departmentBody = this.getDepartmentBody(departmentLink);
    console.log(departmentBody);
    return this.http.put(this.departmentURL, departmentBody, options).map(this.extractDepartment);
  }

  putRate(rateLink): Observable<any> {
    console.log("Updating: " + this.rateURL);
    let options = this.getOptionHeader();
    let rateBody = this.getRateBody(rateLink);
    console.log(rateBody);
    return this.http.put(this.rateURL, rateBody, options).map(this.extractRate);
  }

  getPersons(): Observable<any[]> {
    return this.http.get(this.personsURL)
    .map(this.extractDatas)
    .catch(this.handleError);
  }

  getNextPersons(): Observable<any[]> {
    return this.http.get('http://localhost:8080/persons?page=1&size=20')
    .map(this.extractDatas)
    .catch(this.handleError);
  }

  getDepartmentBody(departmentLink) {
    let departmentBody = '{"_links": {"department":{"href":"' + departmentLink + '"}}}';
    console.log(departmentLink)
    console.log(departmentBody);
    return departmentBody;
  }

  getRateBody(rateLink) {
    console.log(rateLink);
    let rateBody = '{"_links": {"rate":{"href":"' + rateLink + '"}}}';  
    console.log(rateBody);
    return rateBody;
  }

  getOptionHeader(): RequestOptions {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});
    return options;
  }

  getPerson(): Observable<any> {
    return this.http.get(this.personURL)
    .map(this.extractData);
  }

  setRateURL(url: string) {
    this.rateURL = url;
    console.log("Rate URL " + this.rateURL);
  }

  setDepartmentURL(url: string) {
    this.departmentURL = url;
    console.log("Department URL " + this.departmentURL);
  }

  setPersonURL(url: String) {
    this.personURL = url;
  }

  deletePerson(): Observable<any> {
    return this.http.delete(this.personURL).map(this.extractData);
  }

  private extractPerson(res: Response) {
    let body = res.json();
    return body;
  }

  private extractData(res: Response) {
    this.person = res.json();
    //console.log(this.person);
    return this.person;
  }

  private extractDatas(res: Response) {
    let body = res.json();
    return body._embedded.persons || {};
  }

  private extractRate(res: Response) {
    let body = res.json();
    console.log(body);
    return body;
  }

  private extractDepartment(res: Response) {
    let body = res.json();
    console.log(body);
    return body;
  }

  private handleError(error : Response | any) {
    let errMsg: string;    
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || 
      JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  
  }

}
