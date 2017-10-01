import { Component, ElementRef, Directive } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
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

  scanData : {};
  options :BarcodeScannerOptions;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner
    , public axService:AxServiceProvider, public elem: ElementRef, public alert: AlertController
    , public loadingCtrl: LoadingController) {
    this.saleId = navParams.get('saleId');
    this.lineNum = navParams.get('lineNum');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickingPage');
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present(); 
    this.axService.getPickingDetails( this.saleId, this.lineNum).subscribe((response)=>{
      loading.dismiss();
      this.batchList = response; 
    }, (error) => {
      console.log('ERROR'+error);
      loading.dismiss();
      this.alert.create( {title : 'Error', subTitle : 'Please check network connection.', buttons : ['Dismiss']}).present();
    });
  }

  confirmPicking(){    
    var matched;
    matched = true;

    for (var i = 0; i < this.batchList.length; i++){      
      matched = matched && (this.batchList[i].batchScanned == this.batchList[i].batchNumber);    
      matched = matched && (this.batchList[i].qtyScanned == this.batchList[i].qty);      
      }

    this.axService.pickingDone = matched;
    if (matched){
      this.navCtrl.pop();
    }else{
      this.alert.create( {title : 'Confirm', subTitle : 'Invalid pick transactions found.', buttons : ['Dismiss']}).present();      
    }
    
  }

  scanBarcode(rowObject){
    //camera only to be activated if configured for it
    if ( this.axService.camBarCode )
    {
      this.options = {
        prompt : "Scan your barcode "
      }

      this.barcodeScanner.scan(this.options).then((barcodeData) => {      
        this.scanData = barcodeData;
        rowObject.batchScanned = barcodeData.text;
      }, (err) => {
          console.log("Error occured : " + err);
      });
    }
  }

  dataColor(rowObject){
    var matched;
    matched = true;
    matched = matched && (rowObject.batchScanned == rowObject.batchNumber);    
    matched = matched && (rowObject.qtyScanned == rowObject.qty); 

      if(matched) {
      return 'matched';
      } else {
      return 'not-matched';
      }
    }   
}
