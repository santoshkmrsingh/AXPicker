import { Component, ViewChild, trigger, transition, style, state, animate, keyframes } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { HomePage } from '../home/home';

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

  constructor(public navCtrl: NavController) {

  }

  skip() {
    this.navCtrl.setRoot(HomePage);
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
}
