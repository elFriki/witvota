import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ParticipantesService } from '../../../services/participantes.service';
import { ParticipanteFB } from '../../../interfaces/participante';

@Component({
  selector: 'app-participantes',
  templateUrl: './participantes.component.html',
  styleUrls: ['./participantes.component.scss']
})
export class ParticipantesComponent implements OnInit {
  participantes!: Observable<ParticipanteFB[]>;

  constructor(  private participantesService: ParticipantesService,
                private router: Router,
                private db: AngularFirestore,
                private spinner: NgxSpinnerService ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.participantes = this.participantesService.getDBParticipantesSnap();
    this.participantes.subscribe( () => this.spinner.hide() );
  }

  mod( participante: ParticipanteFB ): void {
    // console.log(`editar ${participante.name}`);
    // console.log(participante);
    const url = `/events/participantes/participante/${participante.id}`;
    // console.log(url);
    this.router.navigateByUrl(url);
  }
}
