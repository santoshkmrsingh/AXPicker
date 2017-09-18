import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyApp } from '../../app/app.component';

import { SettingsPage } from '../settings/settings';
import { PickListPage } from '../pick-list/pick-list';
import { ProdListPage } from '../prod-list/prod-list';
import { HomePage } from '../home/home';

/**
 * Generated class for the StartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})


export class StartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }

  openPage(p){
     // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    switch (p){
      case 'PickListPage':
        this.navCtrl.push(PickListPage);
        break;
      case 'ProdListPage':
        this.navCtrl.push(ProdListPage);
        break;    
      case 'SettingsPage':
        this.navCtrl.push(SettingsPage);
        break;
      case 'Logout':
        this.navCtrl.setRoot(HomePage);
        break;
    }
  }
}
