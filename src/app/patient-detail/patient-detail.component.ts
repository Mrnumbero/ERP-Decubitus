import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../service/dashboard.service';


@Component({
  selector: 'app-patient-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit{
  constructor(private DashboardService:DashboardService) { }
  ngOnInit(): void {
      this.DashboardService.getBottomWidgets().subscribe((response: any) => {
        console.log(response);
        
        this.transactions = response;
      });
  }
  transactions = [
    {
      id: 1,
      name: "สรวิชญ์ เลยวานิชย์เจริญ",
      position: "ก้น",
      wound: "แผลกดทับระดับที่ 3",
      status: "รอการตรวจจากผู้เชี่ยวชาญ"
    },
    {
      id: 2,
      name: "สรวิชญ์ เลยวานิชย์เจริญ",
      position: "ก้น",
      wound: "แผลกดทับระดับที่ 3",
      status: "ผ่านการตรวจเรียบร้อย"
    },
    {
      id: 3,
      name: "สรวิชญ์ เลยวานิชย์เจริญ",
      position: "ก้น",
      wound: "แผลกดทับระดับที่ 3",
      status: "รอการตรวจจากผู้เชี่ยวชาญ"
    }
  ];

}
