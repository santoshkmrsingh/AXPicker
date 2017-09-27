import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AxServiceProvider } from '../../providers/ax-service/ax-service';
import { ProdOrderRafPage } from '../prod-order-raf/prod-order-raf';

@Component({
  selector: 'page-prod-list',
  templateUrl: 'prod-list.html',
})

export class ProdListPage {

  public prodOrderList;
  public filterList;

  constructor(public navCtrl: NavController, public navParams: NavParams, public axService:AxServiceProvider,
  public alert:AlertController, public loadingCtrl: LoadingController) {
    this.filterList = []; //required for virtual scrolling
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad ProdListPage');  
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();  
      this.axService.getProdList( this.axService.parmWorkerID ).subscribe((response)=>{
        loading.dismiss();
        this.prodOrderList = response; 
        this.filterList = response;
    }, (error) => {
      console.log('ERROR'+error);
      loading.dismiss();
      this.alert.create( {title : 'Error', subTitle : 'Please check network connection.', buttons : ['Dismiss']}).present();
    });
  }

  itemSelected( item :any ) {
    this.navCtrl.push(ProdOrderRafPage, {ProdOrder:item.ProdId});
  }


  onSearchInput(event:any){
    let val = event.target.value;
    
    if (val && val.trim() != '') {
      this.filterList = this.prodOrderList.filter( (prodOrder) => {
        return ( prodOrder.ProdId.toLowerCase().indexOf( val.toLowerCase() ) > -1 ||
        prodOrder.Name.toLowerCase().indexOf( val.toLowerCase() ) > -1 );   
      } );
    }
  }    

  onSearchCancel(event:any){
    console.log('Cancel called');
    //event.target.value = '';
    this.filterList = this.prodOrderList;
  }

  doRefresh(refresher){
    this.axService.getProdList( this.axService.parmWorkerID ).subscribe((response)=>{
      this.prodOrderList = response; 
      this.filterList = response;
      refresher.complete();
    });
  }

  //function to change the production order status
  changeStatus( item, status){
    switch (status){
      case 'start':
        window.alert('Status changes to started ' + item.ProdId);
        break;
      case 'complete':
        window.alert( 'Status changed to completed');
        break;
    }
  }  
}