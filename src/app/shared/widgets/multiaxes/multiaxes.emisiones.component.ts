import { Component, OnInit,Input } from '@angular/core';
import * as Highcharts1 from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-multiaxes-emisiones',
  templateUrl: './multiaxes.emisiones.component.html',
  styleUrls: ['./multiaxes.emisiones.component.scss']
})
export class MultiaxesComponentEmisiones implements OnInit {

  @Input('axe1') axe1:any;
  @Input('time') time:any;

  Highcharts = Highcharts1;
  chartOptions: {};

  constructor() { }

  ngOnInit(): void {

    this.chartOptions = {
      chart: {
          zoomType: 'xy'
      },
      title: {
          text: 'Emisiones evitadas de kg de CO2 hoy',
          align: 'left'
      },
      xAxis: [{
          categories: this.time,
          crosshair: true,
          title: {
            text: 'Time',
        },
      }],
      yAxis: [{ 
          gridLineWidth: 0,
          title: {
              text: 'Kg CO2',
              style: {
                  color: Highcharts1.getOptions().colors[0]
              }
          },
          labels: {
              format: '{value} kg CO2',
              style: {
                  color: Highcharts1.getOptions().colors[0]
              }
          }
  
      }],
      tooltip: {
          shared: true
      },
      legend: {
          layout: 'vertical',
          align: 'left',
          x: 80,
          verticalAlign: 'top',
          y: 55,
          floating: true,
          backgroundColor:
            Highcharts1.defaultOptions.legend.backgroundColor || // theme
              'rgba(255,255,255,0.25)'
      },
      series: [{
          name: 'Kg CO2',
          type: 'column',
          yAxis: 0,
          data: this.axe1,
          tooltip: {
              valueSuffix: ' Kg CO2'
          }
      }],
      responsive: {
          rules: [{
              condition: {
                  maxWidth: 500
              },
              chartOptions: {
                  legend: {
                      floating: false,
                      layout: 'horizontal',
                      align: 'center',
                      verticalAlign: 'bottom',
                      x: 0,
                      y: 0
                  },
                  yAxis: [{
                      labels: {
                          align: 'right',
                          x: 0,
                          y: -6
                      },
                      showLastLabel: false
                  }]
              }
          }]
      }
  
  }
    HC_exporting(Highcharts1);
  }

}
