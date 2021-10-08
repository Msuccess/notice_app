import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { AuthService } from '../core/services/auth.service';

@NgModule({
  declarations: [AuthComponent, LoginPage, RegisterPage],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    IonicModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
