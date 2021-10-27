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

  constructor(
    private noticeService: NoticeService,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public config: Config,
    private util: UtilService
  ) {}

  ngOnInit() {
    this.getAllNotice();
    this.ios = this.config.get('mode') === 'ios';
  }

  getAllNotice(): any {
    this.util.showLoader$.next(true);
    this.noticeService.get().subscribe(
      (data: any) => {
        console.log(data);
        this.allNotices = data;
        this.util.showLoader$.next(false);
      },
      (err: any) => {
        this.util.showLoader$.next(false);
      }
    );
  }

  updateNotice(ev: any) {
    console.log('>>>>>>>>>>>>>>>>>>>', ev.detail.value);
    if (ev.detail.value === 'all') {
      this.noticeService.get().subscribe((data: any) => {
        this.allNotices = data;
      });
    } else {
      this.noticeService.get().subscribe((data: NoticeModel[]) => {
        this.allNotices = data.filter((e) => e.isFavorite);
      });
    }
  }

  addFavorite(data: NoticeModel) {
    console.log(data, '>>>>>>>>>>>>>>>>');
    const r = {} as NoticeModel;
    r.isFavorite = true;

    this.noticeService
      .put(data.id, r)
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

  async removeFavorite(slidingItem: IonItemSliding, id: string) {
    console.log(id);
    this.util
      .deleteConfirmation(
        'Remove Favorite',
        'Are you sure to delete notice',
        slidingItem,
        () => this.noticeService.delete(id)
      )
      .then(() => {
        this.getAllNotice();
      });
  }
}
