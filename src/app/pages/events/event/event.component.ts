import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { EventoFB, ParticipanteReferenceFB } from '../../../interfaces/evento';
import { EventService } from '../../../services/eventos.service';
import { ParticipanteFB } from '../../../interfaces/participante';
import { ParticipantesService } from '../../../services/participantes.service';
// Import ngx-awesome-popup
import {
  DialogLayoutDisplay,
  ToastNotificationInitializer
} from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class EventComponent {
  eventoFB: EventoFB;
  id: string;
  loadingText = 'un momentito, por favor...';
  participantes: ParticipanteFB[] = [];
  category: string;

  constructor(private eventosService: EventService,
              private participantesService: ParticipantesService,
              private location: Location,
              private spinner: NgxSpinnerService ) {
    this.spinner.show();
    this.category = '';
    const path = window.location.pathname.split('/');
    this.id = path[path.length - 1];
    // console.log(`EVENTO ${this.id}`);

    participantesService.getDBParticipantesSnap().subscribe(resp => {
      this.participantes = resp;
    });

    const today = new Date();
    this.eventoFB = {
      id: this.id,
      name: '',
      description: '',
      place: '',
      iniDateTime: today,
      endDateTime: today,
      price: 0,
      rating: [],
      participantes: [],
      categories: [],
      imageUrl: ''
    };
    eventosService.getDBEvento(this.id).subscribe( resp => {
      // console.log('respEVENTO', resp);
      if (resp && resp.name) {
        this.eventoFB = {
          id: this.id,
          name: resp?.name,
          description: resp?.description,
          place: resp?.place,
          iniDateTime: resp?.iniDateTime,
          endDateTime: resp?.endDateTime,
          price: resp?.price,
          rating: resp?.rating,
          participantes: resp?.participantes,
          categories: resp?.categories,
          imageUrl: resp?.imageUrl
        };
      }

      this.spinner.hide();
    });
  }

  back(): void {
    this.location.back();
  }

  addCategory(): void {
    // console.log('add', this.category);
    if (!this.category || this.category.length === 0 ) {
      return;
    }
    if (this.eventoFB.categories) {
      this.eventoFB.categories.push(this.category);
    } else {
      this.eventoFB.categories = [];
      this.eventoFB.categories.push(this.category);
    }
    this.category = '';
  }
  removeCategory(index: number, array: string[] | undefined): void {
    // console.log('remove 1', index,  array);
    this.eventoFB.categories?.splice(index, 1);
  }
  addRemove(participante: ParticipanteFB): void {
    if (this.isInShow(participante)) {
      this.remove(participante);
    } else {
      this.add(participante);
    }
  }
  private add(participante: ParticipanteFB): void {
    this.eventoFB.participantes?.push({ id: participante.id, votos: 0, path: `/participantes/${participante.id}` });
  }
  private remove(participante: ParticipanteFB): void {
    const realIndex = this.eventoFB.participantes?.findIndex(el => el.id === participante.id);
    console.log('remove 1', realIndex);
    if (realIndex !== undefined && (realIndex >= 0)) {
      this.eventoFB.participantes?.splice(realIndex, 1);
      console.log('remove 2', realIndex);
    }
  }
  isInShow(participante: ParticipanteFB): boolean {
    const realIndex = this.eventoFB.participantes?.findIndex(el => el.id === participante.id);
    // const index = this.participantesCargados?.findIndex(el => el.id === participante.id);
    return realIndex !== undefined && (realIndex >= 0) ? true : false;
    /*
    for (const iterator of this.participantesCargados) {
      if (iterator.id === participante.id) {
        return true;
      }
    }
    return false;
    */
  }
  dateChanged(eventDate: string): Date {
    return !!eventDate ? new Date(eventDate) : new Date();
  }

  guardarEvento(form: NgForm): void {
    this.loadingText = 'guardando';
    if ( form.invalid ) {
      console.log(form.status);
      return;
    }
    this.spinner.show();
    // this.eventoFB.participantes = this.participantesCargados;
    if ( this.eventoFB.id === 'new' ) {
      this.eventosService.setDBEvento(this.eventoFB)
      .then( () => { this.showOk(`${this.eventoFB.name} guardado`); this.back(); })
      .catch ( resp => this.showError(resp) );
    } else {
      this.eventosService.updateDBEvento(this.eventoFB)
      .then( () => { this.showOk(`${this.eventoFB.name} guardado`); this.back(); })
      .catch ( resp => this.showError(resp) );
    }

  }
  private showError(text: any): void {
    console.log( text );
    const toast = new ToastNotificationInitializer();
    toast.setTitle('Uuuuups...');
    toast.setMessage(`-> ${text}`);
    toast.setConfig({
      LayoutType: DialogLayoutDisplay.WARNING
    });
    this.loadingText = '';
    this.spinner.hide();
    toast.openToastNotification$();
  }
  private showOk(text: any): void {
    console.log( text );
    const toast = new ToastNotificationInitializer();
    toast.setTitle('¡Oooook!');
    toast.setMessage(`-> ${text}`);
    toast.setConfig({ LayoutType: DialogLayoutDisplay.SUCCESS });
    toast.openToastNotification$();
    this.loadingText = '';
    this.spinner.hide();
  }
}
