import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hr-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hr-dashboard.component.html',
})
// export class HrDashboardComponent implements OnInit {

//   constructor(private router: Router) {}

//   ngOnInit() {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');

//     if (!user || user.role !== 'hr') {
//       this.router.navigate(['/']);
//     }
//   }
export class HrDashboardComponent {
  user = JSON.parse(localStorage.getItem('user') || '{}');
}


