import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  private target: string = "http://localhost:8080/ProjectedSpend";
  body: any[];

  constructor(private http: Http) { }

  ngOnInit() {
    this.getBody().subscribe( body => {
      console.log(body);
    })
  }

  getBody(): Observable<any> {
    return this.http.get(this.target).map(this.extractData);
  }

  extractData(res: Response) {
    console.log(res);
    let body = res.json();
    return body;
  }

}
