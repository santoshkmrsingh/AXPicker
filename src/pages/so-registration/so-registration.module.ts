import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SoRegistrationPage } from './so-registration';

@NgModule({
  declarations: [
    SoRegistrationPage,
  ],
  imports: [
    IonicPageModule.forChild(SoRegistrationPage),
  ],
})
export class SoRegistrationPageModule {}
