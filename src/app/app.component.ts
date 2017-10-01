import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { WelcomePage } from '../pages/welcome/welcome';
import { AxServiceProvider } from '../providers/ax-service/ax-service';
import { DomSanitizer } from '@angular/platform-browser';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';


@Component({
  templateUrl: 'app.html'
})


export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WelcomePage;
  //rootPage: any = HomePage;

  public pages: Array<{title: string, component: any}>;
  public imagestr: string;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
      public axServiceProvider: AxServiceProvider, private sanitizer: DomSanitizer,
      private backgroundGeolocation: BackgroundGeolocation) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },      
      { title: 'Settings', component: SettingsPage }
    ];

    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    };

  this.backgroundGeolocation.configure(config).subscribe((location: BackgroundGeolocationResponse) => {
    console.log('Location');
    // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
    // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
    // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
    this.backgroundGeolocation.finish().then((value:any)=>{console.log(value);}
    , (reason:any)=>{console.log(reason);
    }); // FOR IOS ONLY
  }, ( error:any ) => {
    console.log( 'error');
  });
  
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  public openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  public getImageStr()
  { 
    //console.log(this.axServiceProvider.userImage);
    
    if(this.axServiceProvider.userImage == "" || this.axServiceProvider.userImage == null){
      return "assets/icon/user.png";
    } else {
      var img = "data:image/jpeg;base64," + this.axServiceProvider.userImage;      
      return this.sanitizer.bypassSecurityTrustUrl(img);
    }
  }
}
