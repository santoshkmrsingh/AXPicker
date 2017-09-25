import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AxServiceProvider } from '../../providers/ax-service/ax-service';
import { StartPage } from '../start/start';

@Component({
  selector: 'page-data-area',
  templateUrl: 'data-area.html',
})
export class DataAreaPage {

  public companies: any;
  public company: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public axServiceProvider: AxServiceProvider, public loadingCtrl: LoadingController) {    
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    console.log('ionViewDidLoad DataAreaPage');
    this.axServiceProvider.getCompanyList().subscribe((data) => {
      loading.dismiss();
      this.companies = data;
    })
  }

  selectClick(){
    this.axServiceProvider.company = this.company;
    this.navCtrl.setRoot(StartPage);
  }

}
