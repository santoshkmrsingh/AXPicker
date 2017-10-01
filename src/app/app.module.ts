import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SettingsPage } from '../pages/settings/settings';
import { AxServiceProvider } from '../providers/ax-service/ax-service';
import { HttpModule } from '@angular/http';
import { ProdListPage } from '../pages/prod-list/prod-list';
import { ProdOrderRafPage } from '../pages/prod-order-raf/prod-order-raf';
import { PickListPage } from '../pages/pick-list/pick-list';
import { PickingPage } from '../pages/picking/picking';
import { StartPage } from '../pages/start/start';
import { SoRegistrationPage } from '../pages/so-registration/so-registration';
import { IonicStorageModule } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DataAreaPage } from '../pages/data-area/data-area';
import { WelcomePage } from '../pages/welcome/welcome';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OneSignal } from '@ionic-native/onesignal';
import { AutoTabDirective } from '../directives/auto-tab/auto-tab';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SettingsPage,
    ProdListPage,
    ProdOrderRafPage,
    PickListPage,
    PickingPage,
    StartPage,
    SoRegistrationPage,
    DataAreaPage,
    WelcomePage,
    AutoTabDirective
  ],

  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SettingsPage,
    ProdListPage,
    ProdOrderRafPage,
    PickListPage,
    PickingPage,
    StartPage,
    SoRegistrationPage,
    DataAreaPage,
    WelcomePage
  ],

  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},    
    AxServiceProvider,
    BarcodeScanner,
    OneSignal,
    BackgroundGeolocation
  ]
  
})
export class AppModule {}
