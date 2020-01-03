import { Component, OnInit, Input } from '@angular/core';
import { IValue } from '../store/model';

@Component({
  selector: 'app-value-list',
  templateUrl: './value-list.component.html',
  styleUrls: ['./value-list.component.css']
})
export class ValueListComponent implements OnInit {

  @Input() values:IValue[];
  
  constructor() { }

  ngOnInit() {
  }

}
