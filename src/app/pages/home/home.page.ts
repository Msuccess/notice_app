/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import {
  AlertController,
  Config,
  IonItemSliding,
  IonList,
  IonRouterOutlet,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { NoticeModel } from 'src/app/core/models/notice.model';
import { NoticeService } from 'src/app/core/services/notice.service';
import { UtilService } from 'src/app/core/services/util.service';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;
  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  allNotices = [] as NoticeModel[];
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  showSearchbar: boolean;

  ngFireUploadTask: AngularFireUploadTask;
  progressNum: Observable<number>;
  progressSnapshot: Observable<any>;

  fileUploadedPath: Observable<string>;

  isImgUploading: boolean;
  isImgUploaded: boolean;
  role: string;

  constructor(
    private noticeService: NoticeService,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public config: Config,
    private util: UtilService
  ) {
    this.util.getUserRole().subscribe((res: any) => {
      this.role = res.role;
    });
  }

  ngOnInit() {
    this.getAllNotice();
    this.ios = this.config.get('mode') === 'ios';
  }

  getAllNotice(): any {
    this.util.showLoader$.next(true);

    this.noticeService.get().subscribe(
      (data: any) => {
        if (data) {
          // eslint-disable-next-line arrow-body-style
          this.allNotices = data.map((e: any) => {
            return {
              id: e.payload.doc.id,
              date: e.payload.doc.data()['date'],
              description: e.payload.doc.data()['description'],
              faculty: e.payload.doc.data()['faculty'],
              title: e.payload.doc.data()['title'],
              fileName: e.payload.doc.data()['fileName'],
              user: e.payload.doc.data()['user'],
              isFavorite: e.payload.doc.data()['isFavorite'],
              hide: e.payload.doc.data()['hide'],
              file: e.payload.doc.data()['file'],
            };
          });
        }
        this.util.showLoader$.next(false);
      },
      (err: any) => {
        this.util.showLoader$.next(false);
      }
    );
  }

  getFavAllNotice(): any {
    this.util.showLoader$.next(true);

    this.noticeService.get().subscribe(
      (data: any) => {
        if (data) {
          // eslint-disable-next-line arrow-body-style
          this.allNotices = data.map((e: any) => {
            return {
              id: e.payload.doc.id,
              date: e.payload.doc.data()['date'],
              description: e.payload.doc.data()['description'],
              faculty: e.payload.doc.data()['faculty'],
              title: e.payload.doc.data()['title'],
              fileName: e.payload.doc.data()['fileName'],
              user: e.payload.doc.data()['user'],
              isFavorite: e.payload.doc.data()['isFavorite'],
              hide: e.payload.doc.data()['hide'],
              file: e.payload.doc.data()['file'],
            };
          });
        }
        this.allNotices = this.allNotices.filter((r: any) => r.isFavorite);
        this.util.showLoader$.next(false);
      },
      (err: any) => {
        this.util.showLoader$.next(false);
      }
    );
  }

  updateNotice(ev: any) {
    if (ev.detail.value === 'all') {
      this.getAllNotice();
    } else {
      this.getFavAllNotice();
    }
  }

  addFavorite(data: NoticeModel) {
    this.noticeService
      .put(data.id, data)
      .then(() => {
        this.getAllNotice();
      })
      .catch(() => {
        this.util.presentErrorMessage(
          'Error adding notice to favorite',
          'Error'
        );
      });
  }

  deleteNotice(slidingItem: IonItemSliding, data: any) {
    this.util.deleteConfirmation(
      'Delete',
      'Are you sure to delete notice',
      slidingItem,
      () =>
        this.noticeService
          .delete(data.id)
          .then(() => {
            this.getAllNotice();
            this.util.presentToast('Notice deleted successfully');
          })
          .catch((e: any) => this.util.presentErrorMessage(e.message, 'Error'))
    );
  }

  removeFavorite(slidingItem: IonItemSliding, data: any) {
    this.noticeService
      .putRemove(data.id, data)
      .then(() => {
        this.getAllNotice();
      })
      .catch(() => {
        this.util.presentErrorMessage(
          'Error removing notice form favorite',
          'Error'
        );
      });
  }
}
