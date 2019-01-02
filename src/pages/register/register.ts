import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
// Models
import { UserModel } from '../../models/user.model';
import { Profile } from '../../models/profile.model';
// Forms
import { AbstractControl, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ValidationMessages } from '../../validators/messages';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../validators/must-match.validators';
// Firebase
import { AngularFireAuth } from 'angularfire2/auth';
// Providers
import { AuthenticationProvider } from '../../providers/index.providers';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as UserModel;
  profile = {} as Profile;
  registerForm: FormGroup;
  firstName: AbstractControl;
  lastName: AbstractControl;  
  email: AbstractControl;  
  password: AbstractControl;
  confirmPassword: AbstractControl;
  submitted = false;
  validationMessages = ValidationMessages;
  loginPage= LoginPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formbuilder: FormBuilder,private afAuth: AngularFireAuth, 
    public authProvider: AuthenticationProvider, private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,) {
      this.registerForm = this.formbuilder.group({
        firstName: new FormControl('', Validators.compose([
          Validators.required, 
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z ]*')
        ])),
        lastName: new FormControl('', Validators.compose([
          Validators.required, 
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z ]*')
        ])),
        email: new FormControl('', Validators.compose([
          Validators.required, 
          Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)
        ])),
        password: new FormControl('', Validators.compose([
          Validators.required, 
          Validators.minLength(6)
        ])),
        confirmPassword: new FormControl('', Validators.compose([Validators.required]))
      }, {  
        validator: MustMatch('password','confirmPassword')
      });
  
      this.firstName = this.registerForm.controls['firstName'];
      this.lastName = this.registerForm.controls['lastName'];
      this.email = this.registerForm.controls['email'];
      this.password = this.registerForm.controls['password'];
      this.confirmPassword = this.registerForm.controls['confirmPassword'];
  }

  ionViewDidLoad() {    
    this.user.email = '';
    this.user.password = '';    
  }

  onSubmit(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    
    let loading = this.loadingCtrl.create({
      content: 'Creando cuenta. Por favor, espere...'
    });
    loading.present();
    this.user.email = this.email.value;
    this.user.password = this.password.value;
    this.authProvider.createUserWithEmailAndPassword(this.user).then(result => {
      this.profile.email = this.email.value;
      this.profile.name = this.firstName.value + ' '+ this.lastName.value;
      this.authProvider.createProfile(this.profile);
  
      loading.dismiss();
      this.showToast("Registrado con éxito.")
      this.navCtrl.push(this.loginPage, { user: this.user });
    }).catch(error =>{
      loading.dismiss();
      if (error.message.includes("The email address is badly formatted")) {
        this.showToast("El email tiene un formato erroneo.");
      } else if (error.message.includes("The email address is already in use by another account.")) {
        this.showToast("Este email está en uso actualmente.");

      } else if (error.message.includes("A network error (such as timeout, interrupted connection or unreachable host) has occurred.")) {
        this.showToast('No hay conexión a internet.');
      } else {
        console.log(error);
        this.showToast("Ha ocurrido un error inesperado. Por favor intente nuevamente.")
      }
    });
  }

  private showToast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2500

    }).present();
  }
}

