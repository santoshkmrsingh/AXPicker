import { Component } from '@angular/core';
<<<<<<< Updated upstream
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AxServiceProvider } from '../../providers/ax-service/ax-service';
import { StartPage } from '../start/start';
=======
import { NavController, NavParams } from 'ionic-angular';
import { AxServiceProvider } from '../../providers/ax-service/ax-service';
>>>>>>> Stashed changes

@Component({
  selector: 'page-data-area',
  templateUrl: 'data-area.html',
})
export class DataAreaPage {

  public companies: any;
  public company: any;

<<<<<<< Updated upstream
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public axServiceProvider: AxServiceProvider, public loadingCtrl: LoadingController) {    
=======
  constructor(public navCtrl: NavController, public navParams: NavParams, public axServiceProvider: AxServiceProvider) {    
>>>>>>> Stashed changes
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    console.log('ionViewDidLoad DataAreaPage');
    this.axServiceProvider.getCompanyList().subscribe((data) => {
<<<<<<< Updated upstream
      loading.dismiss();
=======
>>>>>>> Stashed changes
      this.companies = data;
    })
  }

  selectClick(){
    this.axServiceProvider.company = this.company;
    this.navCtrl.push(StartPage);
  }

}
