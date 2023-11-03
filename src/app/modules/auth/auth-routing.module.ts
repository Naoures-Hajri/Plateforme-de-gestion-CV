import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';


import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CodeComponent } from './components/code/code.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'sign-up', component: SignUpComponent },
  
 
  

  { path: 'code/:id', component: CodeComponent },
  

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })

export class AuthRoutingModule { }