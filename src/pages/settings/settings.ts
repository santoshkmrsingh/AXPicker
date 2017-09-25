import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AxServiceProvider } from '../../providers/ax-service/ax-service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public server: any;
  public port: any;
  public camBarCode:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, 
      public axService: AxServiceProvider) {
    this.storage.ready().then( () => {
      this.storage.get('whmsserver').then((val) => {
        this.server = val;
      });
      this.storage.get('whmsport').then((val) => {
        this.port = val;
      })
      this.storage.get('camBarCode').then((val) => {
        this.port = val;
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
    });    
  }

  portChange(){
    this.storage.ready().then(() => {
      this.storage.set("whmsport",this.port);
      this.axService.port = this.port;
    });    
  }

  camBarCodeChange(){
    this.storage.ready().then(()=>{
      this.storage.set("camBarCode", this.camBarCode);
      this.axService.camBarCode = this.camBarCode;
    });
  }
    
}
