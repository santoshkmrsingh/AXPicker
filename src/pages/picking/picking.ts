import { Component, ElementRef, Directive } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

@Directive({ selector: '[listElement]' })

export class PickingPage {
  public saleId;
  public lineNum;
  public batchList;

  scanData : {};
  options :BarcodeScannerOptions;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner
    , public axService:AxServiceProvider, public elem: ElementRef ) {
    this.saleId = navParams.get('saleId');
    this.lineNum = navParams.get('lineNum');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickingPage');
    this.axService.getPickingDetails( this.saleId, this.lineNum).subscribe((response)=>{
      this.batchList = response; 
    });
  }

  confirmPicking(){    
    var matched;
    matched = true;

    for (var i = 0; i < this.batchList.length; i++){      
      matched = matched && (this.batchList[i].batchScanned == this.batchList[i].batchNumber);      
      }

    this.axService.pickingDone = matched;
    this.navCtrl.pop();
  }

  scanBarcode(rowObject){
    this.options = {
      prompt : "Scan your barcode "
    }

    this.barcodeScanner.scan(this.options).then((barcodeData) => {      
      this.scanData = barcodeData;
      rowObject.batchScanned = barcodeData.text;
    }, (err) => {
        console.log("Error occured : " + err);
    });

    //this.elem.nativeElement.next().focus();
  }

  dataColor(rowObject){
      if(rowObject.batchNumber == rowObject.batchScanned) {
      return 'matched';
      } else {
      return 'not-matched';
      }
    }   
}
