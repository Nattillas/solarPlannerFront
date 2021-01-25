import { ProjectService } from 'src/app/services/project/project.service';
import { Component, OnInit, ViewChild, ElementRef, ɵConsole } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import * as fileSaver from 'file-saver';
import { HttpResponse } from '@angular/common/http';
import {FileService} from '../../../services/file/file.service';
import { from } from 'rxjs';
import * as moment from 'moment-timezone';
//import { threadId } from 'worker_threads';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {
  @ViewChild('miCoeficiente') miCoeficiente: ElementRef;
  id=null;
  estimations=0;
  estimations_emisiones=0;
  forecast=0;
  forecast_emisiones= 0;
  sunPath=null;
  project=null;
  area = [];
  center : any;
  estimation_data = [];
  estimation_emisiones_data=[];
  forecast_data = [];
  forecast_emisiones_data = [];
  altitude = [];
  azimuth = [];
  sun_hours = [];
  pv_today = [];
  pv_today_emisiones = [];
  pv_today_temp =[]
  panelNumber = 0;
  previous_power = 0;
  next_power = 0;
  surface = '0';
  pdfSrc = null;
  capacity = 0;
  country = "world";
  currency = "EU";
  direction = "south";
  tilt = 0;
  price = 0;
  sunrise = '00:00';
  sunset = '00:00';
  solarnoon = '00:00';
  total_pv = 0;
  total_value = 0;
  panel={
    name: '',
    height: 0,
    width: 0,
    technology: '',
    capacity: 0
  };
  coeficiente = 0.4;
  title1="production in the next 6 days";
  title2="production in the past 6 days";
  title3="emisiones evitadas en los ultimos 6 dias";
  title4="emisiones evitadas en los proximos 6 dias";

  constructor(private route: ActivatedRoute, private service:ProjectService,private spinner: NgxSpinnerService,private fileService:FileService) { }

  ngOnInit(): void {

    // inicializar las variables
    this.estimations=0;
    this.estimations_emisiones=0;
    this.forecast=0;
    this.forecast_emisiones= 0;
    this.area = [];
    this.estimation_data = [];
    this.estimation_emisiones_data=[];
    this.forecast_data = [];
    this.forecast_emisiones_data = [];
    this.altitude = [];
    this.azimuth = [];
    this.sun_hours = [];
    this.pv_today = [];
    this.pv_today_emisiones = [];
    this.pv_today_temp =[]
    this.panelNumber = 0;
    this.total_pv = 0;
    this.total_value = 0;

    this.spinner.show();
 
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
    
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.service.getprojectDetails(this.id).subscribe(
      p=>{
          console.log("getprojectDetails",p);
          this.project = p.project;
          this.sunset = p.sunset;
          this.sunrise = p.sunrise;
          this.solarnoon = p.solarnoon;
          this.capacity = p.project.panel.capacity * p.project.panel_number;
          this.surface = Number(p.project.surface).toFixed();
          this.direction = p.project.direction;
          this.tilt = p.project.tilt;
          this.country = p.project.country;
          this.price = p.project.price;
          this.currency = p.project.currency;
          this.panelNumber = this.project.panel_number;
          this.total_pv = Number(this.project.total_prod.toFixed());
          this.total_value = this.total_pv*this.project.price
          this.center = {lat: this.project.lat,lng: this.project.lon};
          this.panel = p.project.panel;
          this.project.area.forEach(point => {
          this.area.push({lat:point.lat,lng:point.lon});           
          });

          // Duplico las variables para el nuevo gráfico
          this.project.next_emisiones = this.project.next_prod.slice();
          this.project.previous_emisiones = this.project.previous_prod.slice();
          this.forecast_emisiones = this.forecast;
          this.forecast_emisiones_data = this.forecast_data.slice();
          this.estimations_emisiones = this.estimations;
          this.estimation_emisiones_data = this.estimation_data.slice();
          
          // gráfico 1
          this.project.next_prod.forEach(next => {
            let x = moment(next[0].date_time).tz(this.project.timezone).date();
            this.forecast+=next[0].pv;
            this.forecast_data.push({'name':x,y:next[0].pv,drilldown:null});}
          )
          this.project.previous_prod.forEach(pre => {
            let x = moment(pre[0].date_time).tz(this.project.timezone).date();
            this.estimations+=pre[0].pv;
            this.estimation_data.push({'name':x,y:pre[0].pv,drilldown:null});
          });

          // gráfico 2
         this.project.next_emisiones.forEach(next => {
            let x = moment(next[0].date_time).tz(this.project.timezone).date();
            this.forecast_emisiones += (next[0].pv * this.coeficiente);
            this.forecast_emisiones_data.push({'name':x,y:(next[0].pv * this.coeficiente),drilldown:null});}
          )
          this.project.previous_emisiones.forEach(pre => {
            let x = moment(pre[0].date_time).tz(this.project.timezone).date();
            this.estimations_emisiones += (pre[0].pv * this.coeficiente);
            this.estimation_emisiones_data.push({'name':x,y:(pre[0].pv * this.coeficiente),drilldown:null});
          });



          for(let i=Number(this.sunrise.split(':')[0]);i<=Number(this.sunset.split(':')[0])+1;i++)
          {
            this.pv_today_temp.push({'time':i,'pv':0});
          }
          this.project.prod_today.forEach(today => {
            let x = moment(today[0].date_time).tz(this.project.timezone).hours();
            for(let i=0;i<this.pv_today_temp.length;i++)
            {
             if(x == this.pv_today_temp[i].time)
             {
               this.pv_today_temp[i].pv+=today[0].pv;
             }
            }  
          });
          this.pv_today_temp.forEach(x => {
            this.sun_hours.push(x.time);
            this.pv_today.push(x.pv);
            this.pv_today_emisiones.push(x.pv * this.coeficiente);
            
          });

          this.azimuth = [];
          this.altitude = [];
          this.estimation_data.reverse();
          this.estimations = Number(this.estimations.toFixed());
          this.forecast = Number(this.forecast.toFixed());
          this.estimation_emisiones_data.reverse();
          this.estimations_emisiones = Number(this.estimations_emisiones.toFixed());
          this.forecast_emisiones = Number(this.forecast_emisiones.toFixed());

          this.service.getSunPath(this.id).subscribe(s =>{
            console.log('view-project', s);
            s.forEach(x => {
              this.azimuth.push(x.azimuth);
              this.altitude.push(x.solar_elevation);
            })
            console.log({
              'sun_hours':this.sun_hours,
              'pvtoday':this.pv_today,
              'pv_today_emisiones':this.pv_today_emisiones,
              'estimation_emisiones_data': this.estimation_emisiones_data,
              'estimation_data': this.estimation_data,
              'coeficiente': this.coeficiente,
              'altitude':this.altitude,
              'azimuth':this.azimuth});
            
          });

          if (p.error) {
            alert("No se ha podido recuperar información del servicio " + p.error + " para obtener los datos actualizados. Se mostrarán los datos almacenados en la base de datos.");
          }
          
        }
      ,err=>{console.log('view-project error', err)}
    );
    
    this.fileService.downloadFile(this.id).subscribe(response => {
      this.pdfSrc = response.url;
		}), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
   
  }

  downloadPlan(){
    this.fileService.downloadFile(this.id).subscribe(response => {
			let blob:any = new Blob([response.blob()], { type: 'application/pdf; charset=utf-8' });
			fileSaver.saveAs(blob, 'plan.pdf');
		}), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
  }

  reloadPlan() {

    // ACCEDO AL VALOR DEL CAMPO Y ESTABLEZCO EL VALOR DEL COEFICIENTE EN LA CLASE
    this.coeficiente = this.miCoeficiente.nativeElement.value;

    // comprobaciones de valor válido
    if (this.coeficiente > 1 || this.coeficiente <= 0) {
      alert("El valor no es correcto, debe estar entre 0 y 1");
    } else {
      this.ngOnInit();
    }
    
  };

}
