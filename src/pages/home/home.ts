import { Component, EventEmitter } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AddSalePage } from "./../index.pages";
// Providers
import { AuthenticationProvider, SalesProvider } from '../../providers/index.providers';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  theresSale : boolean = false;
  sales: any[] = [];
  groupedContacts = [];
  constructor( private modalCtrl:ModalController, public authProvider: AuthenticationProvider,
    public salesProvider: SalesProvider, private afDb: AngularFireDatabase ) {    
    this.afDb.list(`/users/${this.authProvider.currentUser.uid}/clients`, ref => ref.orderByChild("hasDebt").equalTo(true))
    .valueChanges()
    .subscribe(clients => {
       this.sales = clients;
       if(this.sales!= null && this.sales.length > 0){
        this.theresSale = true;
        this.groupContacts(this.sales);
        // TODO: delete console log        
        console.log(this.groupedContacts)
      }else {
        this.theresSale = false;
      }
    });
  }

  openModal() {
    let modal = this.modalCtrl.create(AddSalePage);
    modal.present();
  }

  // Sort contacts alphabetically with sort method 
  // and create groups according with its first letter 
  groupContacts(contacts: any){
    let sortedContacts = contacts.sort(function(a, b){
      if(a.firstName < b.firstName) return -1;
      if(a.firstName > b.firstName) return 1;
      return 0;
    });
    let isCurrentLetter = false;
    let currentLetter = null;
    let newGroup = null;    
      
    for (let index = 0; index < sortedContacts.length; index++) {
      if(currentLetter == sortedContacts[index].firstName.charAt(0)) {
        isCurrentLetter =  true;
      }else if(currentLetter != null) {
        this.groupedContacts.push(newGroup);
        newGroup = null;
        isCurrentLetter =  false;
      }

      if(!isCurrentLetter){
        currentLetter = sortedContacts[index].firstName.charAt(0);
        newGroup = {
          letter : currentLetter,
          contacts: []
        }
      }
      newGroup.contacts.push(sortedContacts[index]);
    }
     this.groupedContacts.push(newGroup);
  }

}
