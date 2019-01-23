import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ReactiveFormsModule } from '@angular/forms';
// Pages
import { MyApp } from './app.component';
import { HomePage, RegisterPage, LoginPage, AddSalePage, MovementsPage } from '../pages/index.pages';

 // Providers
 import { AuthenticationProvider } from "../providers/index.providers";

 // Firebase
 import { AngularFireModule } from 'angularfire2';
 import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
 import { AngularFireAuthModule } from 'angularfire2/auth';

// Plugins
import { Facebook } from '@ionic-native/facebook';

 // Const
 import { FIREBASE_CONFIG } from "../environments/environment";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    AddSalePage,
    MovementsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    AddSalePage,
    MovementsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthenticationProvider,
    AngularFireDatabase,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
