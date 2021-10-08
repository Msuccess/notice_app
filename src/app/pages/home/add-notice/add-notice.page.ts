import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LoadingController,
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { NoticeModel } from 'src/app/core/models/notice.model';
import { NoticeService } from 'src/app/core/services/notice.service';
import { Location } from '@angular/common';
import { UtilService } from 'src/app/core/services/util.service';

@Component({
  templateUrl: './add-notice.page.html',
  styleUrls: ['./add-notice.page.scss'],
})
export class AddNoticePage implements OnInit {
  public noticeForm: FormGroup;
  notice = {} as NoticeModel;
  faculties: { id: number; name: string }[];
  submitted = false;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private noticeService: NoticeService,
    private modalController: ModalController,
    public toastController: ToastController,
    private utilService: UtilService
  ) {
    this.faculties = utilService.getGroups();
  }

  get formControl(): any {
    return this.noticeForm.controls;
  }

  onSubmit(form: NgForm): void {
    this.submitted = true;

    if (form.invalid) {
      return;
    }

    this.notice.date = new Date(Date.now()).toISOString();

    this.noticeService
      .post(this.notice)
      .then((resp) => {
        this.notice = {} as NoticeModel;
        this.submitted = false;
        this.navigateBack();
        this.utilService.presentToast('Notice Add Successfully');
      })
      .catch((error) => {
        console.log(error);
        this.submitted = false;
      });
  }

  navigateBack(): void {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  ngOnInit(): void {}
}
