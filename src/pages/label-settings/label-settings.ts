import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the LabelSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-label-settings',
  templateUrl: 'label-settings.html',
})
export class LabelSettingsPage {

  public strZPL:string;
  public  address:string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LabelSettingsPage');
  }
  findPrinter(){
    if (this.platform.ready()){
      (<any> window).cordova.plugins.zbtprinter.find(
          (result) => {
              if(typeof result == 'string') {
                  this.address = result;
              } else {
                  this.address = result.address;
              }
              alert('Zbtprinter: connect success: ' + this.address);
          }, (error) => {
              alert('Zbtprinter: connect fail: ' + error);
          }
      );                    
    }
}

printZPL(){
  this.strZPL = "^XA^MNN^LL300^XZ^XA^JUS"; //setting the label size LL300
  this.strZPL += "^FO50,50^ADN,36,20^FDSantosh Singh^FS"; //fixed text printing
  this.strZPL += "^FO11,53^BY4^B3N,N,99,N,N"; //barcode type details
  this.strZPL += "^FDsantosh^FS"; //barcode value
  this.strZPL += "^XZ"; //marking the end of the document

  (<any>window).cordova.plugins.zbtprinter.print(this.address, this.strZPL,
  (success) => {
      alert("Zbtprinter print success: " + success);
      }, (fail)=> {
      alert("Zbtprinter print fail:" + fail);        
      }
    );      
  }
}
