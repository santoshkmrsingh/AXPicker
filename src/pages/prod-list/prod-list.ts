import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AxServiceProvider } from '../../providers/ax-service/ax-service';
import { ProdOrderRafPage } from '../prod-order-raf/prod-order-raf';

/**
 * Generated class for the ProdListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-prod-list',
  templateUrl: 'prod-list.html',
})

export class ProdListPage {

  public prodOrderList;
  public filterList;

  constructor(public navCtrl: NavController, public navParams: NavParams, public axService:AxServiceProvider,
  public alert:AlertController) {
    this.filterList = []; //required for virtual scrolling
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad ProdListPage');    
      this.axService.getProdList( this.axService.parmWorkerID ).subscribe((response)=>{
      this.prodOrderList = response; 
      this.filterList = response;
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
}