import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AxServiceProvider } from '../../providers/ax-service/ax-service';

@Component({
  selector: 'page-prod-order-raf',
  templateUrl: 'prod-order-raf.html',
})


export class ProdOrderRafPage {
  public  prodOrder:string;
  public  quantity:number;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public alert:AlertController
    , public axService:AxServiceProvider, public loadingCtrl: LoadingController) {
    this.prodOrder = navParams.get('ProdOrder');
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdOrderRafPage');
  }

 
reportAsFinished(){
    let loader = this.loadingCtrl.create({
      content: 'Posting output...',
    });
     
    loader.present().then(() => {
     this.axService.postProdOrder(this.prodOrder, this.quantity).subscribe( (response) => {
      if ( response.success ){
        let alert = this.alert.create({title : 'Report finished',  buttons : ['Dismiss']});
        alert.setSubTitle( response.description );
        alert.present();
        loader.dismiss();//Hide it after Something is completed
        this.navCtrl.pop();
      }
      else{
        let alert = this.alert.create({title : 'Report finished',  buttons : ['Dismiss']});
        alert.setSubTitle( response.description );
        alert.present();
        loader.dismiss();//Hide it after Something is completed
      }
    });
    
  });
 
}

} //class brace
