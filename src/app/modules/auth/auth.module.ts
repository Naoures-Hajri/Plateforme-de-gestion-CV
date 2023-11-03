import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

import { AuthRoutingModule } from './auth-routing.module';
import {MatIconModule} from '@angular/material/icon';


import {MatButtonModule} from '@angular/material/button';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

import { CodeComponent } from './components/code/code.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    
    CodeComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatIconModule,
    MatButtonModule,
    Ng2SearchPipeModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    FormsModule,
  ]
})
export class AuthModule { }
