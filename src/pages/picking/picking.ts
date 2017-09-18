import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PickingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-picking',
  templateUrl: 'picking.html',
})
export class PickingPage {
  public saleId;
  public lineNum;
  public batchList;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.saleId = navParams.get('saleId');
    this.lineNum = navParams.get('lineNum');
    console.log( this.saleId);
    console.log(this.lineNum);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickingPage');
  }

}
