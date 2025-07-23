import { Component, OnInit } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { DashboardService } from '../service/dashboard.service';
import { ChangeDetectorRef } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-patient-numbers',
  standalone: true,
  imports: [HighchartsChartModule, NgIf],
  template: `<div *ngIf="chartOptions">
    <highcharts-chart 
      [Highcharts]="Highcharts" 
      [options]="chartOptions"
      style="width: 100%; height: 400px; display: block;">
    </highcharts-chart>
  </div>`,
  styleUrls: ['./patient-numbers.component.scss']
})
export class PatientNumbersComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;

  constructor(private dashboardService: DashboardService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.dashboardService.getMiddleWidgets().subscribe((response: any) => {

      setTimeout(() => { // Add a small delay to ensure change detection
        this.chartOptions = {
          chart: { 
            type: 'line', 
            height: 325,
            style: {
              fontFamily: 'Anuphan, sans-serif' // Change font for the entire chart
            }
          },
          title: { 
            text: 'จำนวนแผลแต่ละระดับ',
            style: {
              fontFamily: 'Anuphan, sans-serif' // Change font for the title
            }
          },
          xAxis: { 
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            labels: {
              style: {
                fontFamily: 'Anuphan, sans-serif' // Change font for the xAxis labels
              }
            }
          },
          yAxis: { 
            title: { 
              text: '',
              style: {
                fontFamily: 'Anuphan, sans-serif' // Change font for the yAxis title
              }
            },
            labels: {
              style: {
                fontFamily: 'Anuphan, sans-serif' // Change font for the yAxis labels
              }
            }
          },
          series: response.map((series: any, index: number) => ({
            ...series,
            color: ['#ffc080', '#ff9a34', '#ff0000', '#b30000', '#ef4444'][index] // Custom colors for each series
          })),
          credits: { enabled: false },
          legend: {
            itemStyle: {
              fontFamily: 'Anuphan, sans-serif' // Change font for the legend
            }
          },
          tooltip: {
            style: {
              fontFamily: 'Anuphan, sans-serif' // Change font for the tooltip
            }
          }
        };

        this.cdr.detectChanges(); // Trigger Angular change detection

      }, 100);
    });
  }
}