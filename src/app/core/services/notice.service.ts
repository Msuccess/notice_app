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

  async put(id: string, data: any) {
    await this.delete(id)
      .then(() => {})
      .catch((err: any) => console.log('>>>>>>>>>>>>>>>>>>>', err));
    return this.post(data).then(() => {});
  }

  delete(id: string) {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}
