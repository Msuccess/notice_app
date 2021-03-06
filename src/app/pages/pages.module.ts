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
import { FileSizePipe } from '../core/file-size.pipe';

export class HomePageModule {}
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
    FileSizePipe,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [FileSizePipe],
  entryComponents: [AddNoticePage],
})
export class PagesModule {}
