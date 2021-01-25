import { ProjectService } from '../../../services/project/project.service';
import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

declare const google: any;
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  isAuth:boolean;
  isUser:boolean;
  isAdmin:boolean;
  numpan = 0;
  dir = 'South';
  area: any[];
  center: any = {
    lat: 40.335652,
    lon: -3.877468
  };
  constructor(private service: AuthService, private projectS: ProjectService) { }

  ngOnInit(
  ): void {
    this.isAuth = this.service.isloggedin();
    this.isUser = this.service.isLoggedUser();
    this.isAdmin = this.service.isAdmin();
  }

  onMapReady(map) {
    this.initDrawingManager(map);
  }
  initDrawingManager(map: any) {
    const options = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ['polygon']
      },
      polygonOptions: {
        draggable: true,
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON
    };
    const that = this;
    const drawingManager = new google.maps.drawing.DrawingManager(options);
    drawingManager.setMap(map);
    const points = [];
    drawingManager.addListener('polygoncomplete', (polygon) => {
      polygon.getPath().forEach((xy, i) =>   {

        points.push({ lat: xy.lat(), lon: xy.lng()});
      });
      that.area = points;
      that.projectS.testProject({points:that.area}).subscribe((res)=>{
        that.numpan=res['numberOfPanels'];
        that.dir=res['direction'];

        console.log('landing-page res', res);
      },(err)=>{
        console.log('landing-page error', err);
      });
      
     
    });
    return false;
  }

}
