import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventoFB } from '../../interfaces/evento';
import { ParticipantesService } from '../../services/participantes.service';
import { EventService } from '../../services/eventos.service';
import { ParticipanteFB } from '../../interfaces/participante';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vota',
  templateUrl: './vota.component.html',
  styleUrls: ['./vota.component.scss']
})
export class VotaComponent implements OnInit {
  eventosFB!: Observable<EventoFB[]>;
  evento!: EventoFB;
  participantes: ParticipanteFB[] = [];
  participantesInShow: ParticipanteFB[] = [];
  data: any[] = [];
  isVoted = false;

  constructor(  private participantesService: ParticipantesService,
                private eventService: EventService,
                private spinner: NgxSpinnerService) {
    this.spinner.show();
    this.eventosFB = this.eventService.getDBFutures();
    this.eventosFB.subscribe( (data) =>  {
      this.evento = data[0];
      this.participantesService.getDBParticipantesSnap().subscribe(resp => {
        this.participantes = resp;
        const idsInShow = this.evento.participantes?.map(a => a.id);
        console.log(idsInShow);
        const tempdata: any[] = [];
        this.participantes.forEach(element => {
          if (idsInShow?.includes(element.id)) {
            this.participantesInShow.push(element);
            tempdata.push({id: element.id, name: element.name, value: this.evento.participantes?.find(e => e.id === element.id)?.votos });
          }
          this.data = tempdata;
        });
        this.spinner.hide();
      });
    });
  }

  ngOnInit(): void {
  }

  getParticipante(id: string): ParticipanteFB | undefined{
    return this.participantes?.find(e => e.id === id);
  }

  vota(participanteID: string): void {
    const votado = this.evento.participantes?.find(e => e.id === participanteID);
    if (votado) {
      votado.votos++;
    }
    this.eventService.updateDBEvento(this.evento);
    this.isVoted = true;
  }

}
