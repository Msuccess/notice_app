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
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { finalize, tap } from 'rxjs/operators';
export interface FILE {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  templateUrl: './add-notice.page.html',
  styleUrls: ['./add-notice.page.scss'],
})
export class AddNoticePage implements OnInit {
  public noticeForm: FormGroup;
  notice = {} as NoticeModel;
  faculties: { id: number; name: string }[];
  submitted = false;
  fileUrl: string | any;

  ngFireUploadTask: AngularFireUploadTask;

  progressNum: Observable<number>;

  progressSnapshot: Observable<any>;

  fileUploadedPath: Observable<string>;

  // files: Observable<FILE[]>;

  fileName: string;
  fileSize: number;

  isImgUploading: boolean;
  isImgUploaded: boolean;

  private ngFirestoreCollection: AngularFirestoreCollection<FILE>;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private noticeService: NoticeService,
    private modalController: ModalController,
    public toastController: ToastController,
    private utilService: UtilService,
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage
  ) {
    this.isImgUploading = false;
    this.isImgUploaded = false;

    this.ngFirestoreCollection =
      angularFirestore.collection<FILE>('filesCollection');

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

    this.notice.file = this.fileUrl;
    this.notice.fileName = this.fileName;
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

  fileUpload(event: any) {
    const file = event.target.files.item(0);

    this.isImgUploading = true;
    this.isImgUploaded = false;

    this.fileName = file.name;

    const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;

    const imageRef = this.angularFireStorage.ref(fileStoragePath);

    this.ngFireUploadTask = this.angularFireStorage.upload(
      fileStoragePath,
      file
    );

    this.progressNum = this.ngFireUploadTask.percentageChanges();
    this.progressSnapshot = this.ngFireUploadTask.snapshotChanges().pipe(
      finalize(() => {
        this.fileUploadedPath = imageRef.getDownloadURL();

        this.fileUploadedPath.subscribe(
          (resp) => {
            this.fileUrl = resp;
            console.log('>>>>>>>>>>>>>>>>>>> file upload', resp);
            this.isImgUploading = false;
            this.isImgUploaded = true;
          },
          (error) => {
            console.log(error);
          }
        );
      }),
      tap((snap) => {
        this.fileSize = snap.totalBytes;
      })
    );
  }

  ngOnInit(): void {}
}
