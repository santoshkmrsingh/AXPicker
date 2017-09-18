import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AxServiceProvider } from '../../providers/ax-service/ax-service';

/**
 * Generated class for the ProdOrderRafPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-prod-order-raf',
  templateUrl: 'prod-order-raf.html',
})


export class ProdOrderRafPage {
  public  prodOrder:string;
  public  quantity:number;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public alert:AlertController, public axService:AxServiceProvider) {
    this.prodOrder = navParams.get('ProdOrder');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdOrderRafPage');
  }

  reportAsFinished(){
     this.axService.postProdOrder(this.prodOrder, this.quantity).subscribe( (response) => {
      if ( response.success ){
        let alert = this.alert.create({title : 'Report finished',  buttons : ['Dismiss']});
        alert.setSubTitle( response.description );
        alert.present();
        this.navCtrl.pop();
      }
      else{
        let alert = this.alert.create({title : 'Report finished',  buttons : ['Dismiss']});
        alert.setSubTitle( response.description );
        alert.present();
      }
    })
  }
}
