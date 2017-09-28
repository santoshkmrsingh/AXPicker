import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { AxServiceProvider } from '../../providers/ax-service/ax-service';
import { DataAreaPage } from '../data-area/data-area';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userName : string;
  password : string;

  public loginClick(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.axMethods.auth( this.userName, this.password).subscribe((response) => {
      loading.dismiss();
      if ( response.Authenticated )   {
        this.axMethods.parmWorkerID = response.Worker.PersonnelNumber;
        this.axMethods.userImage = response.Worker.ImageStr;  
        this.axMethods.axUser =  response.Worker.AxUser;
        this.axMethods.axWorkerId = response.Worker.PersonnelNumber;      
        this.navCtrl.push(DataAreaPage);        
      }
      else {
        this.alert.create( {title : 'Login', subTitle : 'Invalid username or password.', buttons : ['Dismiss']}).present();
      }      
    }, (error) => {
      console.log('ERROR'+error);
      loading.dismiss();
      this.alert.create( {title : 'Error', subTitle : 'Please check network connection.', buttons : ['Dismiss']}).present();
    });
  }

  constructor(public navCtrl: NavController, public axMethods: AxServiceProvider, public alert:AlertController,
    public loadingCtrl: LoadingController) {
      //the paramteres have to be intilized so that in case of log off the saved values are reset
      this.axMethods.parmWorkerID = '';
      this.axMethods.userImage ='';  
      this.axMethods.axUser = '';
      this.axMethods.axWorkerId = '';      
  }

}
