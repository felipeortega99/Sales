 import { Injectable } from '@angular/core';
 import { ToastController } from 'ionic-angular';
 // Models
import { UserModel } from '../../models/user.model';
import { Profile } from '../../models/profile.model';
//firebase authentication
import { User } from 'firebase/app'
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import * as firebase from 'firebase/app';
// Plugins
import { Facebook } from '@ionic-native/facebook';

@Injectable()
export class AuthenticationProvider {
  profile: Profile;
  public currentUser: firebase.User;

  constructor(private afAuth: AngularFireAuth, private toastCtrl: ToastController,
    private afDb: AngularFireDatabase, private fb: Facebook) {
    afAuth.authState.subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  get authenticated(): boolean {
    return this.currentUser !== null;
  }

  signInWithEmailAndPassword(userModel: UserModel): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(userModel.email, userModel.password);
  }

  createUserWithEmailAndPassword(userModel: UserModel): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(userModel.email, userModel.password);
  }

  signInWithFacebookCordova(): Promise<any> {
    let facebookRes;
    this.fb.login(['email', 'public_profile']).then(res => {
      const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
      facebookRes = firebase.auth().signInWithCredential(facebookCredential);
    });
    return facebookRes;
  }

  signInWithFacebookWeb(): Promise<any> {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  createProfile(profile: Profile) {
    this.afAuth.authState.subscribe(auth => {
        this.afDb.object(`/users/${auth.uid}`).set(profile).then(() => {
  
        }).catch(error => {
            this.showToast("Algo salió mal, intentalo de nuevo.");
            console.log("Error: "+error);
        });
    });
  }

  isUserInDB(): boolean {    
    let userEmail;
    this.afAuth.authState.subscribe((user: User) => {        
      this.afDb.database.ref(`/users/${user.uid}/email`)
      .once('value').then((snapshot) => {  
        userEmail = snapshot.val() || 'Anonymous';  
      }).catch(error => {
        console.log('Eror at getting the user email: '+error)
      });    
    });
    console.log(userEmail == 'Anonymous' || userEmail == null? false: true);
    return userEmail == 'Anonymous' || userEmail == null? false: true;
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  private showToast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2500
    }).present();
  }
}
