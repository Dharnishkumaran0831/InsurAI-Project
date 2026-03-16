
// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';

// export const authGuard: CanActivateFn = (route) => {

//   const router = inject(Router);

//   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
//   const user = JSON.parse(localStorage.getItem('user') || '{}');

//   const allowedRoles = route.data?.['roles'];

//   if (!isLoggedIn || !allowedRoles?.includes(user.role)) {
//     router.navigate(['/login']);
//     return false;
//   }

//   return true;
// };
// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';

// export const authGuard: CanActivateFn = (route) => {

//   const router = inject(Router);

//   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
//   const user = JSON.parse(localStorage.getItem('user') || '{}');

//   const allowedRoles = route.data?.['roles'];

//   if (!isLoggedIn) {
//     router.navigate(['/login']);
//     return false;
//   }

//   if (!allowedRoles.includes(user.role)) {
//     router.navigate(['/login']);
//     return false;
//   }

//   return true;
// };
// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = () => {
//   return true;
// };
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
