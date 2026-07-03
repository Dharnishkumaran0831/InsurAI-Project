import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './employee-dashboard.component.html',
})
export class EmployeeDashboardComponent {
  user = JSON.parse(localStorage.getItem('user') || '{}');
}


//   user: any;

//   constructor(private router: Router) {}

//   ngOnInit() {
//     const isLoggedIn = localStorage.getItem('isLoggedIn');
//     const user = JSON.parse(localStorage.getItem('user') || '{}');

//     if (!isLoggedIn || user.role !== 'employee') {
//       this.router.navigate(['/']);
      
//     }

//     this.user = user;
//   }
// }
