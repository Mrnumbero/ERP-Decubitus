import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faLocation,
  faShop,
  faBoxes,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from '../service/dashboard.service';

@Component({
  selector: 'app-top-widgets',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './top-widgets.component.html',
  styleUrls: ['./top-widgets.component.scss']
})
export class TopWidgetsComponent implements OnInit{
  faLocation = faLocation;
  faShop = faShop;
  faBoxes = faBoxes;
  faMoneyBill = faMoneyBill;

  countpatients: number = 0;
  countpatientsinNurse: number = 0;
  countpatientsoutNurse: number = 0;

  constructor(
    private DashboardService: DashboardService,
  ) { }

  ngOnInit() {
    this.DashboardService.getTopWidgets().subscribe((response: any) => {
      console.log(response);
      this.countpatients = response.countpatient;
      this.countpatientsinNurse = response.countpatientInNurse;
      this.countpatientsoutNurse = response.countpatientOutNurse;
    });
  }

}
