import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { EventService } from '../../services/eventos.service';
import { EventoFB } from '../../interfaces/evento';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  eventos!: Observable<EventoFB[]>;

  constructor(  private eventosService: EventService,
                private router: Router,
                private spinner: NgxSpinnerService ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.eventos = this.eventosService.getDBEventosSnap();
    this.eventos.subscribe( () =>  {
      this.spinner.hide();
      console.log(this.eventos);
    });
  }

  mod(show: EventoFB): void {
    // console.log(show);
    const url = `/events/event/${show.id}`;
    this.router.navigateByUrl(url);
  }
}
