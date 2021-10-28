import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UtilService } from '../core/services/util.service';
import { AddNoticePage } from './home/add-notice/add-notice.page';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent implements OnInit {
  role: any;
  constructor(
    public modalController: ModalController,
    private util: UtilService
  ) {}

  async openCreateNotice(): Promise<void> {
    const modal = await this.modalController.create({
      component: AddNoticePage,
    });
    return await modal.present();
  }

  ngOnInit(): void {
    this.util.getUserRole().subscribe((res: any) => {
      this.role = res.role;
    });
  }
}
