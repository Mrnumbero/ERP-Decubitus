import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { MatButtonModule } from '@angular/material/button'; // If you're using buttons
import { CommonService } from '../service/common.service';
import { environment } from '../../environments/environment.development';


@Component({
  selector: 'app-signout',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent implements OnInit{
  constructor(
    private router: Router,
    private _Commonservice: CommonService,
  ) {}
  userProfileImage: string = 'assets/profile.jpg'; // Replace with actual image URL
  userName: string = 'John Doe';
  userRole: string = 'Administrator';
  ngOnInit(): void {
      this._Commonservice.getProfile().subscribe({
        next: (response: any) => {
          this.userProfileImage = environment.ImageURL + response.profile_image;
          this.userName = response.first_name + ' ' + response.last_name;
          this.userRole = response.role[0].name;
        },
        error: (error) => {
          console.error('Error fetching profile', error);
        }
      });
  }
  onSignOut() {
    // Perform sign-out logic (clear tokens, session, etc.)
    localStorage.clear(); // Example: Clear user session data
    this.router.navigate(['/login']); // Redirect to login or home page
  }

  onCancel() {
    this.router.navigate(['/dashboard']); // Redirect back to home or dashboard
  }
}
