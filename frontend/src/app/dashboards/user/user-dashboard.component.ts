// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-user-dashboard',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl:'./user-dashboard.component.html',
  
// })
// export class UserDashboardComponent {
//   user = JSON.parse(localStorage.getItem('user') || '{}');

// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../layout/navbar/navbar.component';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// import { NavbarComponent } from '../../layout/navbar/navbar.component';
// import { SidebarComponent } from '../../layout/sidebar/sidebar.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,        // ✅ REQUIRED
    NavbarComponent,
    SidebarComponent
  ],
  templateUrl: './user-dashboard.component.html',
})
export class UserDashboardComponent {
  user = JSON.parse(localStorage.getItem('user') || '{}');
}

