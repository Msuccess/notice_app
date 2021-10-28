import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentPage } from '../student/student.page';
import { AboutPage } from './about/about.page';
import { FacultyPage } from './faculty/faculty.page';
import { DetailsNoticePage } from './home/details-notice/details-notice.page';
import { HomePage } from './home/home.page';
import { PagesComponent } from './pages.component';
import { ProfilePage } from './profile/profile.page';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'about',
        component: AboutPage,
      },
      {
        path: 'faculty',
        component: FacultyPage,
      },
      {
        path: 'profile',
        component: ProfilePage,
      },
      {
        path: 'student',
        component: StudentPage,
      },
      {
        path: 'notices',
        component: HomePage,
      },
      {
        path: 'notice/:id',
        component: DetailsNoticePage,
      },
      {
        path: '',
        redirectTo: 'notices',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
