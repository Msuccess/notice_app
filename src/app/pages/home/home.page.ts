import { Component, OnInit, ViewChild } from '@angular/core';
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
    console.log();
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
    const r = {} as NoticeModel;
    r.isFavorite = true;
    console.log(r);
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
