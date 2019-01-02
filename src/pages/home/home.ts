import { Component, EventEmitter } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AddSalePage } from "./../index.pages";
// Fireabase
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  theresSale : boolean = false;
  sales: any[];

  constructor( private modalCtrl:ModalController, private afDb: AngularFireDatabase ) {
    this.afDb
      .list("/products", ref => ref.orderByChild("available").equalTo(true))
      .valueChanges()
      .subscribe(products => {
        this.products = products;
      });

  }

  getItems() {

  }

  openModal() {
    let modal = this.modalCtrl.create( AddSalePage );
    modal.present();
  }
}
