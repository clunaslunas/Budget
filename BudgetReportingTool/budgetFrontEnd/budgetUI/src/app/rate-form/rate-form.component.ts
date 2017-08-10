import { Component, OnInit, ViewChild,NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Rate } from '../entity/rate';
import { RateService } from '../services/rate.service';
import { RateListComponent } from '../rate-list/rate-list.component';

@Component({
  selector: 'app-rate-form',
  templateUrl: './rate-form.component.html',
  styleUrls: ['./rate-form.component.css']
})
export class RateFormComponent implements OnInit {

  newRate = false;
  rateModel = new Rate();
  label: string;
  progress: number = 0;

  @ViewChild(RateListComponent) viewChild: RateListComponent;

  constructor(private rateService: RateService, private ngZone: NgZone) { }

  ngOnInit() {
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

  onSubmit(form: NgForm) {
    this.createRate();
    form.reset();
    this.newRate = false;
  }

  createRate() {
    this.rateService.createRate(this.rateModel).subscribe(rate => {
      console.log(rate);
    });
  }

  setNewRate() {
    this.newRate = true;
  }

  reload() {
    this.viewChild.ngOnInit();
  }

}
