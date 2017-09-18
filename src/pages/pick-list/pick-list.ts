import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AxServiceProvider } from '../../providers/ax-service/ax-service';
import { SoRegistrationPage } from '../so-registration/so-registration';

/**
 * Generated class for the PickListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pick-list',
  templateUrl: 'pick-list.html'  
})

export class PickListPage {
  public salesOrderList;
  public filterList;

  constructor(public navCtrl: NavController, public navParams: NavParams, public axService:AxServiceProvider) {
    this.filterList=[]; //required when workig with virtual scroll
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad PickListPage');
      this.axService.getSalesOrderList( this.axService.parmWorkerID ).subscribe((response)=>{
      this.salesOrderList = response; 
      this.filterList = response;    
    })
  }

  itemSelected( item :any ) {
    console.log('Item clicked');
    this.navCtrl.push(SoRegistrationPage, {saleId:item.salesId});    
  }

  onSearchInput(event:any){
    let val = event.target.value;
    
    if (val && val.trim() != '') {
      this.filterList = this.salesOrderList.filter( (saleOrder) => {
        return ( saleOrder.salesId.toLowerCase().indexOf( val.toLowerCase() ) > -1 ||
        saleOrder.custName.toLowerCase().indexOf( val.toLowerCase() ) > -1 );   
      } );
    }
  }
    

  onSearchCancel(event:any){
    console.log('Cancel called');
    //event.target.value = '';
    this.filterList = this.salesOrderList;
  }  

  onSearchClear(event:any){
    console.log('Clear called');
    //event.target.value = '';
    this.filterList = this.salesOrderList;
  }  
}
