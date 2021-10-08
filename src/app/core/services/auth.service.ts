import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = [];
  collectionName = 'Auth';

  constructor(
    private firestoreAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  public signup(email: string, password: string) {
    return this.firestoreAuth.createUserWithEmailAndPassword(email, password);
  }

  public registerUser(data: any) {
    data.id = Date.now().toString();
    return this.firestore.collection(this.collectionName).add(data);
  }

  public getUser() {
    return this.firestore.collection(this.collectionName).valueChanges();
  }

  public login(email: string, password: string) {
    return this.firestoreAuth.signInWithEmailAndPassword(email, password);
  }

  public recover(email: string) {
    return this.firestoreAuth.sendPasswordResetEmail(email);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.apiKey !== null ? true : false;
  }
}
