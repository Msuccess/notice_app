import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { NoticeModel } from '../models/notice.model';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class NoticeService {
  collectionName = 'Notice';
  email: string;

  constructor(private firestore: AngularFirestore, private util: UtilService) {
    this.util.getUser().subscribe((res: any) => {
      this.email = res.email;
    });
  }

  post(data: any) {
    const notice = {} as NoticeModel;
    data.id = Date.now().toString();
    notice.date = new Date(Date.now()).toISOString();
    notice.description = data.description;
    notice.faculty = data.faculty;
    notice.isFavorite = false;
    notice.file = data.file;
    notice.fileName = data.fileName;
    notice.user = this.email;
    notice.hide = false;
    notice.title = data.title;

    return this.firestore.collection(this.collectionName).add(notice);
  }

  get() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  put(id: string, data: any) {
    const notice = {} as NoticeModel;
    data.id = data.id;
    notice.date = data.date;
    notice.description = data.description;
    notice.faculty = data.faculty;
    notice.isFavorite = true;
    notice.file = data.file;
    notice.fileName = data.fileName;
    notice.user = this.email;
    notice.hide = false;
    notice.title = data.title;
    return this.firestore.doc(this.collectionName + '/' + id).update(notice);
  }

  putRemove(id: string, data: any) {
    const notice = {} as NoticeModel;
    data.id = data.id;
    notice.date = data.date;
    notice.description = data.description;
    notice.faculty = data.faculty;
    notice.isFavorite = false;
    notice.file = data.file;
    notice.fileName = data.fileName;
    notice.user = data.email;
    notice.hide = false;
    notice.title = data.title;
    return this.firestore.doc(this.collectionName + '/' + id).update(notice);
  }

  putArchive(id: string, data: any) {
    const notice = {} as NoticeModel;
    data.id = data.id;
    notice.date = data.date;
    notice.description = data.description;
    notice.faculty = data.faculty;
    notice.isFavorite = data.isFavorite;
    notice.file = data.file;
    notice.fileName = data.fileName;
    notice.user = data.email;
    notice.hide = true;
    notice.title = data.title;
    return this.firestore.doc(this.collectionName + '/' + id).update(notice);
  }

  putUnArchive(id: string, data: any) {
    const notice = {} as NoticeModel;
    data.id = data.id;
    notice.date = data.date;
    notice.description = data.description;
    notice.faculty = data.faculty;
    notice.isFavorite = data.isFavorite;
    notice.file = data.file;
    notice.fileName = data.fileName;
    notice.user = data.email;
    notice.hide = false;
    notice.title = data.title;
    return this.firestore.doc(this.collectionName + '/' + id).update(notice);
  }

  delete(id: string) {
    return this.firestore.doc(this.collectionName + '/' + id).delete();
  }
}
