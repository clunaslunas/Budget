import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class EditService {

  constructor(private http: Http) { }

  editEntity(entity, link): Observable<any> {
    let options = this.getOptionHeader();
    return this.http.patch(link, entity,options).map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();   
    console.log(body);
    return body;
  }

  private getOptionHeader(): RequestOptions {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');    
    let options = new RequestOptions({headers: headers});
    return options;
  }

}
