import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App, ToastController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

// Services
import { AuthenticationProvider } from '../providers/index.providers';

@Component({
  templateUrl: 'app.html',
  providers: [AuthenticationProvider]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, private app: App, public statusBar: StatusBar, 
    public splashScreen: SplashScreen,private toastCtrl: ToastController,
    private menuCtrl: MenuController, private authService: AuthenticationProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', component: HomePage }
    ];

    this.menuCtrl.enable(false);
    this.menuCtrl.close();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();      
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.authService.logout();
    this.app.getRootNav().setRoot(LoginPage);
    this.showToast("Sesión cerrada.")
    this.menuCtrl.enable(false);
    this.menuCtrl.close();
  }

  private showToast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2500
    }).present();
  }
}
