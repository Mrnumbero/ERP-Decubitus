import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { DashboardService } from '../service/dashboard.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-wound-numbers',
  standalone: true,
  imports: [HighchartsChartModule, NgIf],
  templateUrl: './wound-numbers.component.html',
  styleUrls: ['./wound-numbers.component.scss']
})
export class WoundNumbersComponent implements OnInit {
  constructor(private dashboardService: DashboardService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.dashboardService.getMiddleWidgets2().subscribe((response: any) => {
      const formattedData = response.map((item: any, index: number) => ({
        name: item.name,
        y: item.data,
        color: ['#ffc000', '#cc0000', '#00cd00'][index] // Custom colors for each slice
      }));
  
      setTimeout(() => {
        this.chartOptions = { // Replace the entire object
          ...this.chartOptions,
          series: [{ type: 'pie', data: formattedData }]
        };
        this.cdr.detectChanges(); // Ensure UI updates
      }, 100);
    });
  }
  

  chart = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      height: 325,
      style: {
        fontFamily: 'Anuphan, sans-serif' // Change font for the entire chart
      }
    },
    title: {
      text: 'จำนวนแผลจำแนกตามอาการ',
      align: 'left',
      style: {
        fontFamily: 'Anuphan, sans-serif' // Change font for the title
      }
    },
    tooltip: {
      pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>',
      style: {
        fontFamily: 'Anuphan, sans-serif' // Change font for the tooltip
      }
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
          format: '<b>{point.name}</b>: {point.y} แผล',
          style: {
            fontFamily: 'Anuphan, sans-serif' // Change font for the data labels
          }
        },
        showInLegend: false
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      itemStyle: {
        fontFamily: 'Anuphan, sans-serif' // Change font for the legend
      }
    },
    series: [
      {
        type: 'pie',
        data: []
      }
    ],
    credits: {
      enabled: false
    }
  };

  getTotal(): number {
    const series = this.chartOptions.series?.[0] as Highcharts.SeriesPieOptions;
    if (!series || !series.data) return 0;
    
    return (series.data as Array<Highcharts.PointOptionsObject>).reduce((total, point) => {
      if (point && typeof point === 'object' && point.y !== undefined) {
        return total + (point.y || 0);
      }
      return total;
    }, 0);
  }
}