import { Component } from '@angular/core';
import { UtilService } from './core/services/util.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public labels = [
    { title: 'Notice Board', url: '/app/notices', icon: 'school-outline' },

    { title: 'Faculty', url: '/app/faculty', icon: 'home-outline' },
    { title: 'Profile', url: '/app/profile', icon: 'person-outline' },
    {
      title: 'About',
      url: '/app/about',
      icon: 'information-circle-outline',
    },
  ];
  loader: any;
  constructor(private util: UtilService) {
    this.loader = this.util.showLoader$;
  }

  feedback() {
    window.open('https://www.google.com/forms/about/', '_blank');
  }

  logoOut() {
    this.util.clear();
  }
}
