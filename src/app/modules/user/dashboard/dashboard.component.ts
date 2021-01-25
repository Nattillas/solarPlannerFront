import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project/project.service';
import { NgxSpinnerService } from "ngx-spinner";
import {MatSnackBar} from '@angular/material/snack-bar';

declare const google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  projects = [];
  markers = [];
  total_prod = '';
  nb_panels = 0;
  projects_number = 0;
  nb_visits;
  nb_projects = 0;
  prod_today = 0;
  next_prod = 0;
  previous_prod = 0;
  loaded = false;
  constructor(private service: ProjectService,private spinner: NgxSpinnerService,private _snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
    if(!sessionStorage.getItem('nb_visits'))
    {
      
      sessionStorage.setItem('nb_visits','1');
      setTimeout(() => {
        this._snackBar.open("Welcome to dashboard","close",{
          duration: 700,
        });
    
      }, 5000);
    }
    this.spinner.show();
 
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
   
    
    this.service.getDashboard().subscribe(
      p=>{p.projects.forEach(projet => {
        this.markers.push(
          {
            lat: projet.lat,
            lng: projet.lon,
            label: projet.name,
            id: projet._id,
            numberOfPanels:projet.panel_number,
            surface:projet.surface,
            draggable:false
          }
        );
        this.nb_panels+= Number(projet.panel_number);
        projet['prod_today'].forEach(today => {
          this.prod_today+= Number(Number(today[0].pv).toFixed());
        })
        projet.next_prod.forEach(next => {
          this.next_prod+=Number(Number(next[0].pv).toFixed());
        })
        projet.previous_prod.forEach(pre => {
          this.previous_prod+=Number(Number(pre[0].pv).toFixed());
        })
        
      });

      this.total_prod = Number(p.total_prod).toFixed();
      this.projects_number = this.markers.length;
        }
      ,err=>{console.log('dashboard error',err)}
    );
  }
}


