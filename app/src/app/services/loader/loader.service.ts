import { Injectable } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private spinnerState = false;
  private ssSub = new Subject<boolean>();
  constructor() {
    this.ssSub.subscribe((val) => {
      this.spinnerState = val;
    });
  }

  getSpinnerState() {
    return this.spinnerState;
  }
// eventemitter ?
  setSpinnerState(val: boolean) {
    console.log('setLoading', val);

    this.ssSub.next(val);
  }
}
