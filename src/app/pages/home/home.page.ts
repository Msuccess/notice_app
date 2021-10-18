import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
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
export interface FILE {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;
  ngFireUploadTask: AngularFireUploadTask;
  progressNum: Observable<number>;
  progressSnapshot: Observable<any>;

  fileUploadedPath: Observable<string>;

  files: Observable<FILE[]>;

  FileName: string;
  FileSize: number;

  isImgUploading: boolean;
  isImgUploaded: boolean;
  private ngFirestoreCollection: AngularFirestoreCollection<FILE>;
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
    private util: UtilService,
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage,
  ) {
    this.isImgUploading = false;
    this.isImgUploaded = false;
    
    this.ngFirestoreCollection = angularFirestore.collection<FILE>('filesCollection');
    this.files = this.ngFirestoreCollection.valueChanges();
  }

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
    console.log(ev);
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

  fileUpload(event: FileList) {
      
    const file = event.item(0)

    if (file.type.split('/')[0] !== 'image') { 
      console.log('File type is not supported!')
      return;
    }

    this.isImgUploading = true;
    this.isImgUploaded = false;

    this.FileName = file.name;

    const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;

    const imageRef = this.angularFireStorage.ref(fileStoragePath);

    this.ngFireUploadTask = this.angularFireStorage.upload(fileStoragePath, file);

    this.progressNum = this.ngFireUploadTask.percentageChanges();
    this.progressSnapshot = this.ngFireUploadTask.snapshotChanges().pipe(
      
      finalize(() => {
        this.fileUploadedPath = imageRef.getDownloadURL();
        
        this.fileUploadedPath.subscribe(resp=>{
          this.fileStorage({
            name: file.name,
            filepath: resp,
            size: this.FileSize
          });
          this.isImgUploading = false;
          this.isImgUploaded = true;
        },error => {
          console.log(error);
        })
      }),
      tap(snap => {
          this.FileSize = snap.totalBytes;
      })
    )
}

fileStorage(image: FILE) {
  const ImgId = this.angularFirestore.createId();
  
  this.ngFirestoreCollection.doc(ImgId).set(image).then(data => {
    console.log(data);
  }).catch(error => {
    console.log(error);
  });
} 
}

  

