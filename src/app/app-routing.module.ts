import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { Page404Component } from './views/pages/page404/page404.component';

import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import {AuthGuardFrontService} from "./core/services/auth-guard-front.service";
import {AuthGuardService} from "./core/services/auth-guard.service";

const routes: Routes = [
  { path: '', loadChildren: () => import('./user/user.module').then(m => m.UserModule) , canActivate: [AuthGuardFrontService] },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) , canActivate: [AuthGuardFrontService] },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  // { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
