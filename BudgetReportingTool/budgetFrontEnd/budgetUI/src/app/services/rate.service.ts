import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Rate } from "../entity/rate";
import { DeleteService } from '../services/delete.service';
import { EditService } from '../services/edit.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class RateService {
  private rateURL;
  private ratesURL = 'http://localhost:8080/rates';
  rate: Rate;

  constructor(private http: Http, private deleteService: DeleteService, private editService: EditService) {}

  getRate(): Observable<Rate> {
    return this.http.get(this.rateURL)
    .map(this.extractData);    
  }

   getRates(): Observable<any[]> {    
    return this.http.get(this.ratesURL)
    .map(this.extractDatas);    
  }

  setRateURL(url: string) {
    //console.log(url);
    this.rateURL = url;
  }

  editRate(body) {
    this.editService.editEntity(body, this.rateURL).subscribe(rate => {
      console.log(rate);
    });
  }

  createRate(rate: any): Observable<Rate> {
    return this.http.post(this.ratesURL, rate)
    .map(this.extractData);
  }
  private extractData(res: Response) {
    this.rate = res.json();
    //console.log(this.rate);
    return this.rate;
  }

  private extractDatas(res: Response) {
    let body = res.json();
    //console.log(body._embedded.rates);
    return body._embedded.rates;
  }

  deleteRate() {
    this.deleteService.delete(this.rateURL).subscribe( rate =>{
      console.log(rate);
    });
  }

}
