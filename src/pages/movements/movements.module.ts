import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MovementsPage } from './movements';

@NgModule({
  declarations: [
    MovementsPage,
  ],
  imports: [
    IonicPageModule.forChild(MovementsPage),
  ],
})
export class MovementsPageModule {}
