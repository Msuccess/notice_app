import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { StudentPage } from '../student/student.page';
import { AboutPage } from './about/about.page';
import { FacultyPage } from './faculty/faculty.page';
import { HomePage } from './home/home.page';
import { ProfilePage } from './profile/profile.page';
import { IonicModule } from '@ionic/angular';
import { AddNoticePage } from './home/add-notice/add-notice.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsNoticePage } from './home/details-notice/details-notice.page';

@NgModule({
  declarations: [
    PagesComponent,
    AboutPage,
    FacultyPage,
    StudentPage,
    ProfilePage,
    HomePage,
    AddNoticePage,
    DetailsNoticePage,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [AddNoticePage],
})
export class PagesModule {}
