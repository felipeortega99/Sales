import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// Firebase
// import { AngularFireDatabase } from '@angular/fire/database';
// Models
import { ClientModel } from '../../models/client.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { MovementModel } from '../../models/movement.model';

@Injectable()
export class SalesProvider {

  constructor(private afDb: AngularFireDatabase, private af: AngularFireDatabase) {
    
  }

  getClients(uid:string): any[] {
    let clientsList: any[] = null;
    this.afDb.list(`/users/${uid}/clients`, ref => ref.orderByChild("hasDebt").equalTo(true))
    // this.afDb.list(`/users/${uid}/clients`)
    .valueChanges()
    .subscribe(clients => {
       clientsList= clients;
    });
    if(clientsList != null){
      return clientsList;
    }else {
      return;
    }
  }

  addClient(uid:string, client: ClientModel): Promise<any> {
    const clientsRef = this.af.list(`/users/${uid}/clients/`);
    var reference;
    clientsRef.push(client).then(ref => {
      client.key = ref.key;
      reference = this.afDb.object(`users/${uid}/clients/${ref.key}`).set(client);
    });  
    return reference;    
  }

  addMovement(uid:string, clientId: string, movement: MovementModel): Promise<any> {
    const MovementsRef = this.af.list(`/users/${uid}/clients/${clientId}/movements`);
    var reference;
    MovementsRef.push(movement).then(ref => {
      reference = this.afDb.object(`users/${uid}/clients/${clientId}/movements`).set(movement);
    });  
    return reference;    
  }
}