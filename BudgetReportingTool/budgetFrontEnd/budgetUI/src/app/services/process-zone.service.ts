import { Injectable } from '@angular/core';

@Injectable()
export class ProcessZoneService {

  constructor() { }

  processWithinAngularZone(reload, label, progress) {
    label = 'inside';
    progress = 0;
    this._increaseProgress(() => reload(), progress, label);

  }

  _increaseProgress(doneCallback: () => void, progress, label) {
    progress += 1;
    console.log(`Current progress: ${progress}%`);
 
    if (progress < 100) {
      window.setTimeout(() => this._increaseProgress(doneCallback, progress, label)), 10;
    } else {
      doneCallback();
    }
  }

}
