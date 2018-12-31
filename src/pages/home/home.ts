import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { AddSalePage } from "./../index.pages";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor( private modalCtrl:ModalController ) {

  }

  openModal() {
    let modal = this.modalCtrl.create( AddSalePage );
    modal.present();
  }
}
