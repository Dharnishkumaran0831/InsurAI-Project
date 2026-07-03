// import { Component } from '@angular/core';
// import { LoginComponent } from './login/login.component';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [LoginComponent],
//   template: `<app-login></app-login>`,
// })
// export class AppComponent {}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {}
