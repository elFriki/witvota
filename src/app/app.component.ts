import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { environment } from './../environments/environment';

import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

export interface NavEnlace {
  routerLink: string;
  icon: string;
  span: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  modeOver: boolean;
  isOpen: boolean;
  appTitle: string;
  enlacesTop: NavEnlace[] = [];
  enlacesBottom: NavEnlace[] = [];

  constructor(private observer: BreakpointObserver) {
    this.appTitle = environment.appTitle;
    this.modeOver = false;
    this.isOpen = false;
    this.enlacesTop = [
      { routerLink: 'home', icon: 'home', span: 'Home' },
      { routerLink: 'events', icon: 'events', span: 'Shows' },
      { routerLink: 'events/participantes', icon: 'people', span: 'Participantes' },
      { routerLink: 'about', icon: 'info', span: 'Info' }
    ];
    this.enlacesBottom = [
      { routerLink: 'help', icon: 'help', span: 'Ayuda' }
    ];
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.mySideNavBehaivour();
    }, 100);
  }

  mySideNavBehaivour(): void {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches && this.sidenav) {
        this.sidenav.mode = 'over';
        this.modeOver = true;
        this.isOpen = false;
        this.sidenav.close();
      } else if (this.sidenav) {
        this.sidenav.mode = 'side';
        this.modeOver = false;
        this.isOpen = true;
        this.sidenav.open();
      }
    });
  }
  toggleNav(): void {
    if (this.modeOver) {
      this.isOpen = !this.isOpen;
      this.sidenav.toggle();
    }
  }
}
