import { Component, Input, Output, EventEmitter, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faDashboard, faXmark } from '@fortawesome/free-solid-svg-icons';
import { MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { navbarData } from './nav-data';
import { style, transition, trigger ,animate} from '@angular/animations';
import { MatCardModule } from '@angular/material/card';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterModule, CommonModule, MatIconModule, FontAwesomeModule, MatCardModule],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeInOut', [ 
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms', 
          style({ opacity: 1 })
        )
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms', 
          style({ opacity: 0 })
        )
      ])
    ])
  ]  
})
export class SidenavComponent implements OnInit {
  faXmark = faXmark;

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  filteredNavData = navbarData;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = window.innerWidth;
      if(this.screenWidth <= 980) {
        this.collapsed = false;
        this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
      }
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    const roleId = Number(localStorage.getItem('roleId'));

    // Filter navigation items based on roleId
    if (roleId !== 1) {
      this.filteredNavData = this.navData.filter(item => item.routeLink === 'dashboard'|| item.routeLink === 'signout');
    }
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  getIcon(IconName: string) {
    // Implement your icon logic here
  }
  
}