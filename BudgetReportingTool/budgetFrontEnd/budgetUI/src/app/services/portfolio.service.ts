import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { DeleteService } from '../services/delete.service';
import { EditService } from '../services/edit.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class PortfolioService {

  private portfoliosURL = 'http://localhost:8080/portfolios';
  private portfolioURL;

  constructor(private http: Http, private deleteService: DeleteService, private editService: EditService) { }

  getPortfolios(): Observable<any[]> {
    return this.http.get(this.portfoliosURL)
    .map(this.extractDatas);
  }

  getPortfolio(): Observable<any> {
    return this.http.get(this.portfolioURL)
    .map(this.extractData);
  }

  setPortfolioURL(url: string) {
    this.portfolioURL = url;
  }

  createPortfolio(portfolio: any):Observable<any> {
    return this.http.post(this.portfoliosURL, portfolio).map(this.extractData);
  }

  EditService(body) {
    this.editService.editEntity(body, this.portfolioURL).subscribe( portfolio => {
      console.log(portfolio);
    });
  }

  deletePortfolio(){
    this.deleteService.delete(this.portfolioURL).subscribe(portfolio => {
      console.log(portfolio);
    });
  }
  
  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  private extractDatas(res: Response) {
    let body = res.json();
    return body._embedded.portfolios || {};
  }

}
