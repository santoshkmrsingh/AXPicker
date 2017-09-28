import { Component, ViewChild, trigger, transition, style, state, animate, keyframes } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { HomePage } from '../home/home';
import { OneSignal } from '@ionic-native/onesignal';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
  animations: [    
        trigger('bounce', [
          state('*', style({
            transform: 'translateX(0)'
          })),
          transition('* => rightSwipe', animate('700ms ease-out', keyframes([
            style({transform: 'translateX(0)', offset: 0}),
            style({transform: 'translateX(-65px)', offset: .3}),
            style({transform: 'translateX(0)', offset: 1})
          ]))),
          transition('* => leftSwipe', animate('700ms ease-out', keyframes([
            style({transform: 'translateX(0)', offset: 0}),
            style({transform: 'translateX(65px)', offset: .3}),
            style({transform: 'translateX(0)', offset: 1})
          ])))
        ])
      ]
})


export class WelcomePage {
  @ViewChild(Slides) slides: Slides;
  skipMsg: string = "Skip";
  state: string = 'x';

  
  constructor(public navCtrl: NavController, private oneSignal: OneSignal) {
    this.oneSignal.startInit('2a111811-21d2-4b12-bf57-7b970a5c19b1', '867971927416');
    
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    
    this.oneSignal.handleNotificationReceived().subscribe(() => {
     // do something when notification is received
    });
    
    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });
    
    this.oneSignal.endInit();

  }

  slideChanged() {
    if (this.slides.isEnd())
      this.skipMsg = "Alright, I got it";
    else
    this.skipMsg = "Skip";
    this.state = 'x';
  }

  slideMoved() {
    if (this.slides.getActiveIndex() >= this.slides.getPreviousIndex())
      this.state = 'rightSwipe';
    else
      this.state = 'leftSwipe';

      console.log(this.state);
  }

  animationDone() {
    //this.state = 'x';
  }

  skip() {
    this.navCtrl.setRoot(HomePage);
  }
  
}
