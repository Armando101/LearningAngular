import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

	public listas: Lista[];

  constructor(
  	private deseosService: DeseosService,
  	private router: Router,
  	private alertCtrl: AlertController
  ) {
  	this.listas = this.deseosService.getListas();
  }

  async agregarLista() {
  	// this.router.navigateByUrl('/tabs/tab1/agregar');

  	const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Nueva lista',
      inputs: [
      	{
      		name: 'titulo',
      		type: 'text',
      		placeholder: 'Nombre de la lista'
      	}
      ],
      buttons: [
      	{
      		text: 'Cancelar',
      		role: 'cancel',
      		handler: () => {
      			console.log('Cancelar');
      		}
      	},
      	{
      		text: 'Crear',
      		handler: (data) => {
      			if (data.titulo.length === 0) {
      				return;
      			}
      			const listaId = this.deseosService.crearLista(data.titulo);
      			this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
      			// console.log(data);
      		}
      	}
      ]
    });
  	await alert.present();
  }

  listaSeleccionada(lista: Lista) {
  	this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
  	// console.log(lista);
  }

}
