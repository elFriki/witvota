import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ParticipanteFB } from '../../../../interfaces/participante';
import { ParticipantesService } from '../../../../services/participantes.service';
// Import ngx-awesome-popup
import {
  DialogLayoutDisplay,
  ConfirmBoxInitializer,
  ToastNotificationInitializer
} from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-participante',
  templateUrl: './participante.component.html',
  styleUrls: ['./participante.component.scss']
})
export class ParticipanteComponent {
  participanteFB: ParticipanteFB;
  id: string;
  loadingText = 'un momentito, por favor...';
  nameFormGroup!: FormGroup;
  segundoFormGroup!: FormGroup;
  tercerFormGroup!: FormGroup;
  cuartoFormGroup!: FormGroup;

  constructor(  private fb: FormBuilder,
                private participantesService: ParticipantesService,
                private location: Location,
                private spinner: NgxSpinnerService ) {
    this.spinner.show();
    const path = window.location.pathname.split('/');
    this.id = path[path.length - 1];
    this.participanteFB = { id: this.id, name: '', description: '', imageUrl: '' };
    participantesService.getDBParticipante(this.id).subscribe( resp => {
      // console.log('resp', resp);
      if (resp) {
        this.participanteFB = {id: this.id, name: resp?.name, description: resp?.description, imageUrl: resp?.imageUrl};
      }
      // this.buildForm();
      this.spinner.hide();
    });
  }

  buildForm(): void {
    this.nameFormGroup = this.fb.group({
      name: [this.participanteFB?.name, Validators.required]
    });
    this.segundoFormGroup = this.fb.group({
      segundoCtrl: [this.participanteFB?.description]
    });
    this.tercerFormGroup = this.fb.group({
      tercerCtrl: [this.participanteFB?.imageUrl]
    });
    this.cuartoFormGroup = this.fb.group({
      cuartoCtrl: ['']
    });
  }

  borrar(): void {
    this.loadingText = 'eliminando...';
    this.spinner.show();
    this.participantesService.deleteDBParticipante(this.participanteFB)
    .then( () => this.showOk(`${this.participanteFB.name} eliminado`) )
    .catch ( resp => this.showError(resp) );
  }

  confirmaBorrado(): void {
    const cb = new ConfirmBoxInitializer();
    cb.setTitle('¿SEGURO?');
    cb.setMessage(`Vas a eliminar permanentemente a ${this.participanteFB.name}`);
    cb.setButtonLabels('Quiero eliminarlo', 'Nop');
    cb.setConfig({ LayoutType: DialogLayoutDisplay.WARNING, ButtonPosition: 'right' });
    const suscription = cb.openConfirmBox$().subscribe( (resp) => {
      if ( resp.Success ) {
        this.borrar();
      }
      suscription.unsubscribe();
    });
  }

  back(): void {
    this.location.back();
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
    this.back();
  }
  guardarParticipante(form: NgForm): void {
    this.loadingText = 'guardando';
    if ( form.invalid ) {
      console.log(form.status);
      return;
    }
    this.spinner.show();
    // console.log(form);
    // console.log(this.participanteFB);
    if ( this.participanteFB.id === 'new' ) {
      this.participantesService.setDBParticipante(this.participanteFB)
      .then( () => this.showOk(`${this.participanteFB.name} guardado`) )
      .catch ( resp => this.showError(resp) );
    } else {
      this.participantesService.updateDBParticipante(this.participanteFB)
      .then( () => this.showOk(`${this.participanteFB.name} guardado`) )
      .catch ( resp => this.showError(resp) );
    }
  }
}
