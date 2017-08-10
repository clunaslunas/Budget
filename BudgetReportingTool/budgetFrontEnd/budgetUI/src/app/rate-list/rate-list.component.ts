import { Component, OnInit } from '@angular/core';
import { Rate } from '../entity/rate';
import { NgForm } from '@angular/forms';
import { RateService } from '../services/rate.service';

@Component({
  selector: 'app-rate-list',
  templateUrl: './rate-list.component.html',
  styleUrls: ['./rate-list.component.css']
})
export class RateListComponent implements OnInit {

  rates: Rate[];
  rate;
  delete = false;
  label: string;
  progress: number = 0;
  editable: boolean=false;
  rowToEdit: any;
  rateToEdit = new Rate();

  constructor(private rateService: RateService) { }

  ngOnInit() {
    this.getRates();
  }

  onSubmit(form: NgForm){
    this.resetForm(form);
  }

  resetForm(form: NgForm) {
    form.reset();
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

  getRates() {
    this.rateService.getRates().subscribe(rates => this.rates = rates);
  }

  setDelete() {
    this.delete = true;
  }

  editRate(rate){
    this.toggleEditable();
    let rateLink = rate._links.self.href;
    this.rateService.setRateURL(rateLink);
    let body = JSON.parse(this.interceptBody());    
    this.rateService.editRate(body);
  }

  deleteRate(form: NgForm) {
    this.rateService.setRateURL(this.rate);
    this.rateService.deleteRate();
    form.reset();
    this.delete = false;

    //TODO: Verify this rate does not belong to a person!!
  }
  
  reload() {
    this.getRates();
  }

  toggleContentEditable(row) {
    this.editable = !this.editable
    this.rowToEdit = row;
  }

  toggleEditable() {
    this.editable = !this.editable;
  }

  setRow(){
    this.rowToEdit = "";
  }

  interceptBody(): string {
    let body = JSON.stringify(this.rateToEdit);
    return body;
  }

}
