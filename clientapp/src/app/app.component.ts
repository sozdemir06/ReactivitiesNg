import { Component, OnInit } from '@angular/core';
import  moment from "moment-timezone";
import { Router, NavigationEnd, NavigationCancel, NavigationError, NavigationStart } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'clientapp';
  date:Date=new Date();
  loading:boolean=true;
  constructor(
    private router:Router
  ){}
  

  ngOnInit(){
    //let localtime=moment(this.date).tz('Asia/Istanbul|Turkey').format();
    //console.log(this.isoToLocaleFormat(this.date));

    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  
  }

  isoToLocaleFormat(date){
    const offsetMs = date.getTimezoneOffset() * 60 * 1000;
    const msLocal =  date.getTime() - offsetMs;
    const dateLocal = new Date(msLocal);
    const iso = dateLocal.toISOString();
    const isoLocal = iso.slice(0, 19);
    return isoLocal;
  }
}
