import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ClientModel } from '../../models/client.model';

@IonicPage()
@Component({
  selector: 'page-movements',
  templateUrl: 'movements.html',
})
export class MovementsPage {
client: ClientModel;
movement: string = 'todos';
movementsLength: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.client = this.navParams.get('client');
    this.movementsLength = this.client.movements.length;
  }

  ionViewDidLoad() {
    
  }

  closeModal() {
    this.viewCtrl.dismiss();    
  }
}
