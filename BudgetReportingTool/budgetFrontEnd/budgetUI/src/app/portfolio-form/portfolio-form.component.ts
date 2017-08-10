import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Portfolio } from '../entity/portfolio';
import { PortfolioType } from '../entity/portfolioType';
import { PortfolioService } from '../services/portfolio.service';
import { PortfolioListComponent } from '../portfolio-list/portfolio-list.component';

@Component({
  selector: 'app-portfolio-form',
  templateUrl: './portfolio-form.component.html',
  styleUrls: ['./portfolio-form.component.css']
})

export class PortfolioFormComponent implements OnInit {

  create: boolean=false;
  portfolioType = PortfolioType;
  types: any[];
  label: string;
  progress: number=0;
  portfolioModel = new Portfolio();
  @ViewChild(PortfolioListComponent) viewChild: PortfolioListComponent;

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit() {
    this.setTypes();
  }

  onSubmit(form: NgForm) {
    this.portfolioService.createPortfolio(this.portfolioModel).subscribe( portfolio=>{
      console.log(portfolio);
    });
    form.reset();
    this.setCreate();
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

  setTypes() {
    this.types = [];
    this.types.push(this.portfolioType[this.portfolioType.Development].toString());
    this.types.push(this.portfolioType[this.portfolioType.MPS].toString());  
  }

  setCreate() {
    this.create = !this.create;
  }

  reload() {
    this.viewChild.ngOnInit();
  }

}
