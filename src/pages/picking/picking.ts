import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AxServiceProvider } from '../../providers/ax-service/ax-service';

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
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, public axService:AxServiceProvider ) {
    this.saleId = navParams.get('saleId');
    this.lineNum = navParams.get('lineNum');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickingPage');
    this.axService.getPickingDetails( this.saleId, this.lineNum).subscribe((response)=>{
      this.batchList = response; 
    });
  }

}
