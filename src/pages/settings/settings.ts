import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AxServiceProvider } from '../../providers/ax-service/ax-service';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public server: any;
  public port: any;
  public camBarCode:boolean;
  public trackLocation:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, 
      public axService: AxServiceProvider, private backgroundGeolocation: BackgroundGeolocation) {
    this.storage.ready().then( () => {
      this.storage.get('whmsserver').then((val) => {
        this.server = val;
      });
      this.storage.get('whmsport').then((val) => {
        this.port = val;
      })
      this.storage.get('camBarCode').then((val) => {
        this.camBarCode = val;
      })
      this.storage.get('trackLocation').then((val) => {
        this.trackLocation = val;
      })      
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  serverChange(){
    this.storage.ready().then(() => {
      this.storage.set("whmsserver",this.server);
      this.axService.server = this.server;
      this.axService.setURL();
    });    
  }

  portChange(){
    this.storage.ready().then(() => {
      this.storage.set("whmsport",this.port);
      this.axService.port = this.port;
      this.axService.setURL();
    });    
  }

  camBarCodeChange(){
    this.storage.ready().then(()=>{
      this.storage.set("camBarCode", this.camBarCode);
      this.axService.camBarCode = this.camBarCode;
      console.log("Camera:"+this.axService.camBarCode);      
    });
  }
  
  trackLocationChange(){
    this.storage.ready().then(()=>{
      this.storage.set("trackLocation", this.trackLocation);
      if ( this.trackLocation ){
        // start recording location
        this.axService.trackLocation = true;
        this.backgroundGeolocation.start();        
      }else{
      // If you wish to turn OFF background-tracking, call the #stop method.
      this.axService.trackLocation = false;
      this.backgroundGeolocation.stop();          
      }
    });    
  }
}
