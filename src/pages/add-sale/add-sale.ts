import { Component } from '@angular/core';
import { IonicPage,  ViewController, ToastController, LoadingController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { ClientModel } from "../../models/client.model";
import { MovementModel } from '../../models/movement.model';

@IonicPage()
@Component({
  selector: 'page-add-sale',
  templateUrl: 'add-sale.html',
})
export class AddSalePage {

addSaleForm: FormGroup;
firstName: AbstractControl;
lastName: AbstractControl;
total: AbstractControl;
client = {} as ClientModel;
movement = {} as MovementModel;
date = new Date();

  constructor(private viewCtrl: ViewController, 
    public formbuilder: FormBuilder, 
    public toastCtrl: ToastController, 
    public loadingCtrl: LoadingController) {
      this.addSaleForm = formbuilder.group({
        firstName:['', Validators.pattern('[a-zA-Z ]*'), Validators.required],
        lastName: ['', Validators.pattern('[a-zA-Z ]*'), Validators.required],
        total: ['', Validators.required]
      });
      this.firstName = this.addSaleForm.controls['firstName'];
      this.lastName = this.addSaleForm.controls['lastName'];
      this.total = this.addSaleForm.controls['total'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSalePage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  addSale() {
    // Movement
    this.movement.title = "Venta";
    this.movement.date =  this.displayDateFormat();
    this.movement.total = this.addSaleForm.get('total').value;
    // Client 
    this.client.firstName = this.addSaleForm.get('firstName').value;
    this.client.lastName = this.addSaleForm.get('lastName').value;
    this.client.debt = this.addSaleForm.get('total').value;
    this.client.movements.push(this.movement);

    let loading = this.loadingCtrl.create({
      content: 'Agregando venta...'
    });
    loading.present();
    // databse set
    loading.dismiss();
    this.showToast("Venta agregada con éxito.");
  }

  displayDateFormat(): string {
    //2018-01-01T08:00:00Z
    let year = this.date.getFullYear().toString();

    //Month
    let month: string;
    switch (this.date.getMonth()) {
      case 0:
        month = 'enero';
        break;
      case 1:
        month = 'febrero';
        break;
      case 2:
        month = 'marzo';
        break;
      case 3:
        month = 'abril';
        break;
      case 4:
        month = 'mayo';
        break;
      case 5:
        month = 'junio';
        break;
      case 6:
        month = 'julio';
        break;
      case 7:
        month = 'agosto';
        break;
      case 8:
        month = 'septiembre';
        break;
      case 9:
        month = 'octubre';
        break;
      case 10:
        month = 'noviembre';
        break;
      case 11:
        month = 'diciembre';
        break;
      default:
        break;
    }

    //Day
    let day = this.date.getDate().toString();

    //Day name
    let dayName: string;
    switch (this.date.getDay()) {
      case 0:
        dayName = 'Domingo';
        break;
      case 1:
      dayName = 'Lunes';
        break;
      case 2:
      dayName = 'Martes';
        break;
      case 3:
      dayName = 'Miércoles';
        break;
      case 4:
      dayName = 'Jueves';
        break;
      case 5:
      dayName = 'Viernes';
        break;
      case 6:
      dayName = 'Sábado';
        break;
      default:
        break;
    }

    return  dayName + ', ' + day + ' de ' + month + ' del ' + year;
  }

  private showToast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2500,
      position: 'top'
      // cssClass: string
    }).present();
  }
}
