import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { NoticeModel } from '../models/notice.model';

@Injectable({
  providedIn: 'root',
})
export class NoticeService {
  collectionName = 'Notice';

  constructor(private firestore: AngularFirestore) {}

  post(data: NoticeModel) {
    data.id = Date.now().toString();
    return this.firestore.collection(this.collectionName).add(data);
  }

  get() {
    return this.firestore.collection(this.collectionName).valueChanges();
  }

  put(id: string, data: any) {
    return this.firestore.doc(`${this.collectionName}/` + id).update(data);
    // return this.firestore.collection(this.collectionName).doc(id).update(data);
  }

  delete(id: string) {
    this.firestore.collection(this.collectionName).doc(id).delete();
  }
}
