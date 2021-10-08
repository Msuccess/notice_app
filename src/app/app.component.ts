import { Component } from '@angular/core';
import { UtilService } from './core/services/util.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public labels = [
    { title: 'Faculty', url: '/faculty', icon: 'home-outline' },
    { title: 'Profile', url: '/profile', icon: 'person-outline' },
    {
      title: 'About',
      url: '/about',
      icon: 'information-circle-outline',
    },
  ];
  loader: any;
  constructor(private util: UtilService) {
    this.loader = this.util.showLoader$;
  }
}
