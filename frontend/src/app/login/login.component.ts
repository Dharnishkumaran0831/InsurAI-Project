// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterModule } from '@angular/router';

// import { AuthService } from '../services/auth.service';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule],
//   templateUrl: './login.component.html',
// })
// export class LoginComponent {

//   isLogin = true;

//   email = '';
//   password = '';
//   fullName = '';
//   selectedRole = 'EMPLOYEE';

//   constructor(
//     private router: Router,
//     private authService: AuthService
//   ) {}

//   handleSubmit() {

//     this.authService.login({
//       email: this.email,
//       password: this.password,
//       role: this.selectedRole
//     }).subscribe({

//       next: (res: any) => {

//         // ✅ Save login info
//         localStorage.setItem('isLoggedIn', 'true');
//         localStorage.setItem('user', JSON.stringify(res));

//         console.log('Login success, role:', res.role);

//         // ✅ Role-based redirect
//         if (res.role === 'USER') {
//           this.router.navigate(['/user']);
//         } 
//         else if (res.role === 'EMPLOYEE') {
//           this.router.navigate(['/employee']);
//         }
//       },

//       error: (err) => {
//         console.error('Login failed', err);
//       }

//     });
// //   }
// // }


// handleSubmit() {

//   this.authService.login(this.email, this.password).subscribe({

//     next: (res: any) => {

//       // save login info
//       localStorage.setItem('isLoggedIn', 'true');
//       localStorage.setItem('user', JSON.stringify(res));

//       console.log('Login success, role:', res.role);

//       // role-based redirect
//       if (res.role === 'USER') {
//         this.router.navigate(['/user']);
//       }
//       else if (res.role === 'EMPLOYEE') {
//         this.router.navigate(['/employee']);
//       }
//     },

//     error: (err) => {
//       console.error('Login failed', err);
//     }

//   });

// }
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  // ✅ ADD THIS (FIXES YOUR ERROR)
  isLogin: boolean = true;

  fullName = '';
  email = '';
  password = '';
  selectedRole = 'USER';

  constructor(private router: Router) {}

  handleSubmit() {

    const mockUser = {
      name: this.fullName,
      email: this.email,
      role: this.selectedRole
    };

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(mockUser));

    if (this.selectedRole === 'USER') {
      this.router.navigate(['/user']);
    } else if (this.selectedRole === 'EMPLOYEE') {
      this.router.navigate(['/employee']);
    } else if (this.selectedRole === 'HR') {
      this.router.navigate(['/hr']);
    }
  }
//   handleSubmit() {
//   console.log('Clicked');
//   this.router.navigateByUrl('/user');
// }

}
