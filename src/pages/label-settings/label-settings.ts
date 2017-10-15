import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, AlertController } from 'ionic-angular';
import {ElementRef, Directive} from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { AxServiceProvider } from '../../providers/ax-service/ax-service';

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
  public imageURL;
  public strZPL:string;
  public address:string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform:Platform
    ,public element:ElementRef, private camera: Camera, private DomSanitizer: DomSanitizer, public axService:AxServiceProvider
    ,public loadingCtrl: LoadingController, public alert: AlertController) {
    this.strZPL = "^XA^MNN^LL300^XZ^XA^JUS"; //setting the label size LL300
    this.strZPL += "^FO50,50^ADN,36,20^FDSantosh Singh^FS"; //fixed text printing
    this.strZPL += "^FO11,53^BY4^B3N,N,99,N,N"; //barcode type details
    this.strZPL += "^FDsantosh^FS"; //barcode value
    this.strZPL += "^XZ"; //marking the end of the document

    this.strZPL = "^XA^MNN^LL400^XZ^XA^JUS";
    //this.strZPL = "^CFA,30"; //setting the font size
    this.strZPL += "^FO50,300^FDAsset code : AS0001^FS"; //Field origin x,y,z z= alignment 0,1,2
    this.strZPL += "^FO17,42^BY5^B3N,N,114,Y,N";
    this.strZPL += "^FDAS0001^FS";
    this.strZPL += "^XZ";
  
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
  (<any>window).cordova.plugins.zbtprinter.print(this.address, this.strZPL,
  (success) => {
      alert("Zbtprinter print success: " + success);
      }, (fail)=> {
      alert("Zbtprinter print fail:" + fail);        
      }
    );      
  }

  updateWorker(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })    
    loading.present();    
    this.axService.updateUser( this.imageURL ).subscribe((response)=>{
      loading.dismiss();
    }, (error) => {
      console.log('ERROR'+error);
      loading.dismiss();
      this.alert.create( {title : 'Error', subTitle : 'Please check network connection.', buttons : ['Dismiss']}).present();
    })
  }

  cameraTest(){
    var options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth:1000,
      targetHeight:1000,
      correctOrientation:true
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.imageURL = 'data:image/jpeg;base64,' + imageData;
      //this.imageURL = imageData;
     }, (err) => {
      // Handle error
     })    
  }
}
