import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNoticePage } from './home/add-notice/add-notice.page';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent implements OnInit {
  constructor(public modalController: ModalController) {}

  async openCreateNotice(): Promise<void> {
    const modal = await this.modalController.create({
      component: AddNoticePage,
    });
    return await modal.present();
  }

  ngOnInit(): void {}
}
