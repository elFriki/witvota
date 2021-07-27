import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from './services/eventos.service';
import { convertTimestamp } from 'convert-firebase-timestamp';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventoFB } from './interfaces/evento';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent implements OnInit, OnDestroy {
  noHayEventos = true;
  estamosEnDirecto = false;
  intervalo: any;
  data: any[] = [
    {
      name: 'Días',
      value: 0
    },
    {
      name: 'Horas',
      value: 0
    },
    {
      name: 'Minutos',
      value: 0
    },
    {
      name: 'Segundos',
      value: 0
    }
  ];

  eventosFB!: Observable<EventoFB[]>;
  eventoFB!: EventoFB;

  constructor(  private es: EventService,
                private spinner: NgxSpinnerService ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.eventosFB = this.es.getDBFutures();
    this.eventosFB.subscribe( (data) =>  {
      this.eventoFB = data[0];
      // console.log(this.eventoFB);
      this.noHayEventos = this.eventoFB ? false : true;
      this.startClock();
      this.spinner.hide();
    });
  }

  startClock(): void {
    const from = convertTimestamp(this.eventoFB.iniDateTime);
    const to = convertTimestamp(this.eventoFB.endDateTime);
    // console.log(from, to);
    this.intervalo = setInterval( () => {
      this.spinner.hide();
      const today = new Date().getTime();
      this.estamosEnDirecto = (today <= to.getTime() && today >= from.getTime()) ? true : false;
      if (this.estamosEnDirecto) {
        clearInterval(this.intervalo);
        return;
      }
      const diff = from.getTime() - today;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      this.data = [];
      if (days) {
        this.data.push({
          name: 'Días',
          value: days
        });
      }
      if (hours) {
        this.data.push({
          name: 'Horas',
          value: hours
        });
      }
      if (minutes) {
        this.data.push({
          name: 'Minutos',
          value: minutes
        });
      }
      if (seconds) {
        this.data.push({
          name: 'Segundos',
          value: seconds
        });
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }
}
