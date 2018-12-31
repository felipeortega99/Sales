import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from "@angular/forms";
import { ValidationMessages } from '../../validators/messages';
// Models
import { UserModel } from '../../models/user.model';
import { Profile } from './../../models/profile.model';
// Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AuthenticationProvider } from '../../providers/index.providers';
import { HomePage } from '../index.pages';
import { RegisterPage } from '../register/register';
import { User } from 'firebase/app';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  profile = {} as Profile;
  validationMessages = ValidationMessages;
  registerPage = RegisterPage;

  constructor(public formbuilder: FormBuilder, 
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
     public authProvider: AuthenticationProvider, 
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private menuCtrl: MenuController) {

      this.loginForm = this.formbuilder.group({
      email: new FormControl('', Validators.compose([Validators.required, 
        Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)]
        )),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });

    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];
  }

  logIn(){

  }

  signInWithFacebook() {
    this.authProvider.signInWithFacebook().then(res => {
      if(!this.authProvider.isUserInDB()){
        let user = res.user;
        this.profile.name = user.displayName;
        this.profile.email = user.email;
        this.authProvider.createProfile(this.profile);  
      }
      this.menuCtrl.enable(true);
      this.navCtrl.setRoot(HomePage);
    }).catch(error => {
      this.showToast("Algo salió mal, intentalo de nuevo.");
      console.log("Error: "+error);
    });
  }

  private showToast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2500

    }).present();
  }

}
