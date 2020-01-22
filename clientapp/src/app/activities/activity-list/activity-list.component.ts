import { Component, OnInit, Input } from '@angular/core';
import { IACtivity } from '../store/IActivity';
import { Store, select} from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Observable } from 'rxjs';
import * as ActivitySelectors from "../store/activity.selectors";
import { ActivityActions } from '../store/activity-actions.types';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
@Input() activities:IACtivity[] | null;
limit:any=2;
page:any=0;
activityCount$:Observable<number>;
activityCount:number;
loadMoreLoading$:Observable<boolean>;

  constructor(
    private store:Store<AppState>
  ) { }

  ngOnInit() {
    this.activityCount$=this.store.pipe(select(ActivitySelectors.activityCount));
    this.loadMoreLoading$=this.store.pipe(select(ActivitySelectors.loadMoreLoading))
  }

  totalPages():number{
      let totalPages:number=0;
      this.activityCount$.subscribe(data=>{
         totalPages=Math.ceil(data/this.limit);
         this.activityCount=data;
      })

      return totalPages;
  }

  setPage(page:number){
      this.page=page;
  }

  handleGetNext(){
      this.setPage(this.page+1);
      this.store.dispatch(ActivityActions.loadMoreStart({limit:this.limit,page:this.page}));
  }



}
