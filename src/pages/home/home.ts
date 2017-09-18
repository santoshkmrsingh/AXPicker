import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AxServiceProvider } from '../../providers/ax-service/ax-service';
import { ProdListPage } from '../prod-list/prod-list';
import { StartPage } from '../start/start';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userName : string;
  password : string;

  public loginClick(){
    
    this.axMethods.auth( this.userName, this.password).subscribe((response) => {
      if ( response.Authenticated )   {
        this.axMethods.parmWorkerID = response.Worker.PersonnelNumber;
        this.navCtrl.setRoot(StartPage);        
      }
      else {
        this.alert.create( {title : 'Login', subTitle : 'Invalid username or password', buttons : ['Dismiss']}).present();
      }
      
    });
  }

  constructor(public navCtrl: NavController, public axMethods: AxServiceProvider, public alert:AlertController) {

  }

}
