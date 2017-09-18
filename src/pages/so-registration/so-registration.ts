import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AxServiceProvider } from '../../providers/ax-service/ax-service';
import { PickingPage } from '../picking/picking';

/**
 * Generated class for the SoRegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-so-registration',
  templateUrl: 'so-registration.html',
})

export class SoRegistrationPage {
  public soLineList;
  public saleId;

  constructor(public navCtrl: NavController, public navParams: NavParams,public axService:AxServiceProvider) {
    this.saleId = navParams.get('saleId');
    this.soLineList = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SoRegistrationPage');
      this.axService.getSORegistration( this.saleId ).subscribe((response)=>{
      this.soLineList = response;       
      })
  }

  itemSelected( item :any ) {
    console.log('Item clicked');
    this.navCtrl.push(PickingPage, { saleId:this.saleId, lineNum:item.lineNum});    
  }
}
