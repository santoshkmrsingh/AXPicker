import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AxServiceProvider } from '../../providers/ax-service/ax-service';

@Component({
  selector: 'page-data-area',
  templateUrl: 'data-area.html',
})
export class DataAreaPage {

  public companies: any;
  public company: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public axServiceProvider: AxServiceProvider) {    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DataAreaPage');
    this.axServiceProvider.getCompanyList().subscribe((data) => {
      this.companies = data;
    })
  }

  selectClick(){
    this.axServiceProvider.company = this.company;
    this.navCtrl.push(StartPage);
  }

}
