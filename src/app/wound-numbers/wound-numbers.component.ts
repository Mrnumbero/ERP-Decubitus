import { Component } from '@angular/core';
import { HighchartsChartModule} from 'highcharts-angular'
import Highcharts, { Options, SeriesOptionsType, PointOptionsObject } from 'highcharts';

@Component({
  selector: 'app-wound-numbers',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './wound-numbers.component.html',
  styleUrls: ['./wound-numbers.component.scss']
})
export class WoundNumbersComponent {
  chart = Highcharts;
    chartOptions: Options = {
      chart: {
        type: 'pie',
        height: 325
      },
      title: {
        text: 'จำนวนผู้ป่วยจำแนกตามการรักษา',
        align: 'left'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.y} แผล'
          },
          showInLegend: false
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
      series: [
       {
        type: 'pie',
        data: [
          {
            name: 'ผู้ป่วยที่แผลมีความรุนแรงเท่าเดิม',
            y: 20,
            color: '#044342',
          },
          {
            name: 'ผู้ป่วยที่แผลมีความรุนแรงมากขึ้น',
            y: 40,
            color: '#7e0505',
          },
          {
            name: 'ผู้ป่วยที่แผลมีความรุนแรงลดลง',
            y: 365,
            color: '#ed9e20',
          },
          {
            name: 'ผู้ป่วยที่แผลหายเเล้ว',
            y: 300,
            color: '#6920fb',
          },
        ]
       }
      ],
      credits: {
        enabled: false
      }
    };

    getTotal(): number {
      const data = (this.chartOptions.series![0] as Highcharts.SeriesPieOptions).data as Highcharts.PointOptionsObject[];
      return data.reduce((total, point) => total + point.y!, 0);
    }
    
}