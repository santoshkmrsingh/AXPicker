import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LabelSettingsPage } from './label-settings';

@NgModule({
  declarations: [
    LabelSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(LabelSettingsPage),
  ],
})
export class LabelSettingsPageModule {}
