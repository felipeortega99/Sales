import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, MenuController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from "@angular/forms";
import { ValidationMessages } from '../../validators/messages';
import { HomePage } from '../index.pages';
import { RegisterPage } from '../register/register';
// Models
import { UserModel } from '../../models/user.model';
import { Profile } from './../../models/profile.model';
// Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from 'firebase/app';
// Providers
import { AuthenticationProvider } from '../../providers/index.providers';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  validationMessages = ValidationMessages;
  registerPage = RegisterPage;
  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  profile = {} as Profile;
  user = {} as UserModel;

  constructor(public formbuilder: FormBuilder, public navCtrl: NavController,
    private afAuth: AngularFireAuth, public authProvider: AuthenticationProvider, 
    private loadingCtrl: LoadingController, private toastCtrl: ToastController,
    private menuCtrl: MenuController, public platform: Platform,
    public navParams: NavParams) {

      this.loginForm = this.formbuilder.group({
      email: new FormControl('', Validators.compose([Validators.required, 
        Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)]
        )),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });

    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];
  }

  ionViewDidLoad() {
    const user = this.navParams.get('user');
    if(user != null) {
      this.email.setValue(user.email);
      this.password.setValue(user.password);
    }
  }

  logIn(){
    // present the loading animation
    let loading = this.loadingCtrl.create({
      content: 'Iniciando sesión. Por favor, espere...'
    });
    loading.present();

    // Get data from the loginForm
    this.user.email = this.email.value;
    this.user.password = this.password.value;

    this.authProvider.signInWithEmailAndPassword(this.user).then(result => {
      loading.dismiss();
      this.menuCtrl.swipeEnable(true);
      this.navCtrl.setRoot(HomePage);
    }).catch(error => {
      loading.dismiss();
      if (error.message.includes("There is no user record corresponding to this identifier")) {
        this.showToast('Usuario inexistente.');
      } else if (error.message.includes("The password is invalid")) {
        this.showToast('Contraseña incorrecta.');
      } else if (error.message.includes("A network error (such as timeout, interrupted connection or unreachable host) has occurred.")) {
        this.showToast('No hay conexión a internet.');
      } else {
        this.showToast('Ha ocurrido un error inesperado. Por favor intente nuevamente.');
      }
      console.log(error);
    });
  }

  signInWithFacebook() {
    if (this.platform.is('cordova')) {
      // signin form the celular
      this.authProvider.signInWithFacebookCordova().then(user => {
        // check if the user is in the database,
        // if not, creates a profile
        if(!this.authProvider.isUserInDB()){          
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

    }else{
      // signin form the browser
      this.authProvider.signInWithFacebookWeb().then(res => {
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
  }

  private showToast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2500

    }).present();
  }

}
