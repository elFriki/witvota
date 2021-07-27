import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';


// MATERIAL
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// PAGES
import { HomeComponent } from './pages/home/home.component';
import { EventsComponent } from './pages/events/events.component';
import { AboutComponent } from './pages/about/about.component';
import { HelpComponent } from './pages/help/help.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventComponent } from './pages/events/event/event.component';
import { ParticipantesComponent } from './pages/events/participantes/participantes.component';
import { ParticipanteComponent } from './pages/events/participantes/participante/participante.component';
import { WelcomeComponent } from './welcome.component';
import { GaugechartComponent } from './components/gaugechart/gaugechart.component';
import { FillCategoriesComponent } from './components/fill-categories/fill-categories.component';

// Import ngx-awesome-popup
import {
  NgxAwesomePopupModule,
  DialogConfigModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GaugelinearchartComponent } from './components/gaugelinearchart/gaugelinearchart.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { VotaComponent } from './components/vota/vota.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventsComponent,
    AboutComponent,
    HelpComponent,
    DashboardComponent,
    EventComponent,
    ParticipantesComponent,
    ParticipanteComponent,
    WelcomeComponent,
    GaugechartComponent,
    GaugelinearchartComponent,
    FillCategoriesComponent,
    VotaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgxAwesomePopupModule.forRoot(),
    DialogConfigModule.forRoot(),
    ConfirmBoxConfigModule.forRoot(),
    ToastNotificationConfigModule.forRoot(),
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    LayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatStepperModule,
    MatSelectModule,
    NgxChartsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
