import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventsComponent } from './pages/events/events.component';
import { AboutComponent } from './pages/about/about.component';
import { HelpComponent } from './pages/help/help.component';
import { WelcomeComponent } from './welcome.component';
import { ParticipantesComponent } from './pages/events/participantes/participantes.component';
import { EventComponent } from './pages/events/event/event.component';
import { ParticipanteComponent } from './pages/events/participantes/participante/participante.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'events', component: EventsComponent },
  { path: 'events/event/:id', component: EventComponent },
  { path: 'events/participantes', component: ParticipantesComponent },
  { path: 'events/participantes/participante/:id', component: ParticipanteComponent },
  { path: 'about', component: AboutComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/welcome' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
