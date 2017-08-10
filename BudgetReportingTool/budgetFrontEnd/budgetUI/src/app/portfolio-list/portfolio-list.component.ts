import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PortfolioType } from '../entity/portfolioType';
import { PortfolioService } from '../services/portfolio.service';
import { Portfolio } from '../entity/portfolio';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css']
})
export class PortfolioListComponent implements OnInit {

  portfolios: Portfolio[];
  portfolio;
  label: string;
  progress: number = 0;
  delete = false;
  portfolioType = PortfolioType;
  types: any[];
  editable: boolean = false;
  rowToEdit: any;
  portfolioToEdit = new Portfolio();

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit() {
    this.getPortfolios();
  }

  onSubmit(form: NgForm) {
    this.resetForm(form);
  }

  getPortfolios() {
    this.portfolioService.getPortfolios().subscribe(portfolios => {
      this.portfolios = portfolios;
    })
  }

  editPortfolio(portfolio) {
    let portfolioLink = portfolio._links.self.href;
    this.toggleEditable();  
    let body = this.interceptBody();
    console.log(body);
    this.portfolioService.setPortfolioURL(portfolioLink);
    this.portfolioService.EditService(body);    
  }

  deletePortfolio(portfolio) {
    this.portfolioService.setPortfolioURL(portfolio);
    this.portfolioService.deletePortfolio();    
  }

  processWithinAngularZone() {
    this.label = 'inside';
    this.progress = 0;
    this._increaseProgress(() => this.reload());

  }

  _increaseProgress(doneCallback: () => void) {
    this.progress += 1;
    console.log(`Current progress: ${this.progress}%`);
 
    if (this.progress < 100) {
      window.setTimeout(() => this._increaseProgress(doneCallback)), 10;
    } else {
      doneCallback();
    }
  }

  interceptBody( ): any{
    let body = Object.keys(this.portfolioToEdit).map(i =>{
      let value = {};
      if(!(this.portfolioToEdit[i] == null)) {
        
        value[i] = this.portfolioToEdit[i];
      }        
      return value;
    });
    let combine = {};
    for(let i of body) {      
      combine = Object.assign(combine,i);
    }   
    return combine;
  }

  checkNull(value){
    return !(value == null);
  }  

  reload() {
    this.getPortfolios();
  }

  setDelete() {
    this.delete = true;
  }

  setTypes() {
    this.types = [];
    this.types.push(this.portfolioType[this.portfolioType.Development].toString());
    this.types.push(this.portfolioType[this.portfolioType.MPS].toString());  
  }

  toggleContentEditable(row) {
    this.rowToEdit = row;
    this.toggleEditable();
    this.setTypes();
  }

  toggleEditable() {
    this.editable = !this.editable;
  }

  setRowToEdit() {
    this.rowToEdit = " "; 
  }

  resetForm(form: NgForm) {
    form.reset();
  }

}
