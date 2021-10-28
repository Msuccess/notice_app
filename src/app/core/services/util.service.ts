import { Injectable } from '@angular/core';
import {
  AlertController,
  IonItemSliding,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  showLoader$ = new BehaviorSubject<boolean>(false);

  constructor(
    public toastController: ToastController,
    public alertCtrl: AlertController
  ) {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }

  async presentErrorMessage(message: string, title: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message,
      buttons: ['OK'],
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  async deleteConfirmation(
    title: string,
    message: string,
    slidingItem: IonItemSliding,
    callback: () => any
  ) {
    const alert = await this.alertCtrl.create({
      header: title,
      message,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            slidingItem.close();
          },
        },
        {
          text: 'Remove',
          handler: () => {
            callback();
            console.log('Delete');
            slidingItem.close();
          },
        },
      ],
    });
    // now present the alert on top of all other content
    await alert.present();
  }

  getSchools() {
    return [
      { id: 1, name: 'Computer Science' },
      { id: 2, name: 'Business' },
      { id: 3, name: 'Engineering' },
    ];
  }

  getGroups() {
    return [
      { id: 1, name: 'All' },
      { id: 2, name: 'Computer Science' },
      { id: 3, name: 'Business' },
      { id: 4, name: 'Engineering' },
    ];
  }

  public getUser(): Observable<any> {
    const user: any = localStorage.getItem('user');
    try {
      return of(JSON.parse(user.split(',')));
    } catch (e) {
      return of([]);
    }
  }

  public getUserRole(): Observable<any> {
    const user: any = localStorage.getItem('userData');
    try {
      return of(JSON.parse(user.split(',')));
    } catch (e) {
      return of([]);
    }
  }

  public setUser(key: string, user: any): any {
    if (user != null) {
      localStorage.setItem(key, JSON.stringify(user));
    }
    return this;
  }

  public clear(): void {
    localStorage.removeItem('user');

    sessionStorage.removeItem('user');
  }
}
