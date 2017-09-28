import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AxServiceProvider } from '../../providers/ax-service/ax-service';
import { PickingPage } from '../picking/picking';

@Component({
  selector: 'page-so-registration',
  templateUrl: 'so-registration.html'
})

export class SoRegistrationPage {
  public soLineList;
  public saleId;
  private lastItemClicked;

  constructor(public navCtrl: NavController, public navParams: NavParams
      ,public axService:AxServiceProvider, public loadingCtrl: LoadingController, public alert:AlertController) {
    this.saleId = navParams.get('saleId');
    this.soLineList = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SoRegistrationPage');
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();  
    this.axService.getSORegistration( this.saleId ).subscribe((response)=>{
      loading.dismiss();
      this.soLineList = response;   
    }, (error) => {
      console.log('ERROR'+error);
      loading.dismiss();
      this.alert.create( {title : 'Error', subTitle : 'Please check network connection.', buttons : ['Dismiss']}).present();
    })
  }

  ionViewDidEnter(){
    if ( this.lastItemClicked ){
      this.lastItemClicked.picked = this.axService.pickingDone;          
    }
    console.log('ionViewDidEnter SoRegistrationPage');
    console.log( this.lastItemClicked);
    console.log( this.soLineList );
  }

  itemSelected( item :any ) {
    this.axService.pickingDone = false;
    this.lastItemClicked = item;
    this.navCtrl.push(PickingPage, { saleId:this.saleId, lineNum:item.lineNum});    
  }

  printDeliveryNote(){
    //delivery note request for print should only be pushed if all the lines have been scanned. 
    var matched;
    matched = true;
    let loader = this.loadingCtrl.create({
      content: 'Confirming delivery note...',
    });

    loader.present().then(() => {
      for (var i = 0; i < this.soLineList.length; i++){      
        matched = matched && (this.soLineList[i].picked );      
        }

      if ( matched ){
          this.axService.confirmDelivery( this.soLineList ).subscribe( (response) => {
            if ( response.success ){
              let alert = this.alert.create({title : 'Delivery',  buttons : ['Dismiss']});
              alert.setSubTitle( response.description );
              alert.present();
              loader.dismiss(); //Hide it after Something is completed    
              this.navCtrl.pop();  //unload the form on success          
            }
            else{
              let alert = this.alert.create({title : 'Delivery',  buttons : ['Dismiss']});
              alert.setSubTitle( response.description );
              alert.present();
              loader.dismiss();//Hide it after Something is completed

              alert.present();  
              //if there is an error confirm the form unload as unload results in loss of saved data
              alert = this.alert.create({
                title: 'Close order',
                message: 'Do you want to stop this delivery ?',
                buttons: [
                  {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {
                      console.log('Cancel clicked');
                    }
                  },
                  {
                    text: 'Yes',
                    handler: () => {
                      this.navCtrl.pop();
                    }
                  }
                ]
              });
              alert.present();               
            }
          });         
      }
      else{
        let alert = this.alert.create({title : 'Confirm',  buttons : ['Dismiss']});
        alert.setSubTitle( 'All lines should be picked for delivery confirmation.' );
        loader.dismiss();
        alert.present();
      }
    })
   loader.dismissAll();
  }

}
