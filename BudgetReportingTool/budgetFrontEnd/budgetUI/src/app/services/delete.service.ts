import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class DeleteService {

  constructor(private http: Http) { }

  delete(url: any): Observable<any> {
    return this.http.delete(url).map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }


}
