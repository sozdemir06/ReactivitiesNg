import { Component, OnInit } from '@angular/core';
import { IValue } from './store/model';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { selectAllValues, areValuesLoaded } from './store/values.selectors';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {

  values$:Observable<IValue[]>;
  valuesLoaded$:Observable<boolean>;

  constructor(
    private store:Store<AppState>
  ) { }

  ngOnInit() {
    this.reloadValues();
    this.valuesLoaded$=this.store.pipe(select(areValuesLoaded));
  }

  reloadValues(){
    this.values$=this.store.pipe(select(selectAllValues))
  }

}
