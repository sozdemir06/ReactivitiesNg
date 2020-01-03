import { Component, OnInit, Input } from '@angular/core';
import { IACtivity } from '../store/IActivity';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
@Input() activities:IACtivity[] | null;

  constructor() { }

  ngOnInit() {
  }

}
