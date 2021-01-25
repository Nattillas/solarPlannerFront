import { Component, OnInit,Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {

  @Input('data') data:any;
  @Input('title') title:any;
  @Input('emisiones') emisiones:any;


  Highcharts = Highcharts;
  chartOptions: {};
  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'column'
    },
    title: {
        text: this.title
    },
    accessibility: {
        announceNewData: {
            enabled: true
        }
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: (this.emisiones == true) ? 'Kg CO2' : 'Pv power generated (Kw)'
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: ''
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f} ' + (this.emisiones == true) ? 'Kg CO2' : 'KW' + '</b><br/>'
    },

    series: [
        {
            name: (this.emisiones == true) ? "Emisiones evitadas" : "Power generated",
            colorByPoint: true,
            data: this.data
        }
    ],

  }
    HC_exporting(Highcharts);

  }

}
