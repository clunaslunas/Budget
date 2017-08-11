import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Department } from "../entity/department";
import { DeleteService } from '../services/delete.service';
import { EditService } from '../services/edit.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class DepartmentService {
  
  private departmentsURL = 'http://40.80.152.41:5000/departments';
  private departmentURL;
  department: Department;

  constructor(private http: Http, private deleteService: DeleteService, private editService: EditService) { }

  getDepartment(): Observable<Department> {
    //console.log("GOT HERE");
    return this.http.get(this.departmentURL)
    .map(this.extractData);
  }

  getDepartments(): Observable<any[]> {
    return this.http.get(this.departmentsURL)
    .map(this.extractDepartments);
  }

  getOptionHeader(): RequestOptions {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});
    return options;
  }

  setDepartmentURL(url: string) {
    this.departmentURL = url;
  }

  createDepartment(department: any): Observable<any> {
    return this.http.post(this.departmentsURL, department).map(this.extractData);
  }

  putDepartment(department: Department): Observable<any> {
    let options = this.getOptionHeader();
    return this.http.put(this.departmentURL, department, options, )
  }

  editDepartment(body) {
    this.editService.editEntity(body, this.departmentURL).subscribe( department => {
      console.log(department);
    });
  }

  deleteDepartment(){
    this.deleteService.delete(this.departmentURL).subscribe( department => {
      console.log(department);
    });
  }

  private extractDepartments(res: Response) {
    let body = res.json();
    return body._embedded.departments || {};
  }
  private extractData(res: Response) {
    this.department = res.json();
    return this.department;
  }

}
