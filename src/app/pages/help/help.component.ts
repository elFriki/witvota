import { Component, OnInit } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  desc?: string;
  href: string;
}

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  tiles: Tile[] = [
    { cols: 2, rows: 1, color: 'lightsalmon', text: 'Angular', desc: 'Angular doc', href: 'https://angular.io' },
    { cols: 2, rows: 1, color: 'lightsalmon', text: 'Angular Udemy', desc: 'De 0 a experto', href: 'https://indra.udemy.com/course/angular-2-fernando-herrera/learn/lecture/6537420#overview' },
    { cols: 2, rows: 1, color: 'lightsalmon', text: 'Angular Material', desc: 'Todos los componentes de angular con Material', href: 'https://material.angular.io/components/form-field/examples' },
    { cols: 2, rows: 1, color: 'lightsalmon', text: 'Type Script', desc: '', href: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html' },
    { cols: 2, rows: 1, color: 'lightsalmon', text: 'Firebase', desc: '', href: 'https://console.firebase.google.com/u/0/project/wit-wars/authentication/users?hl=es' },
    { cols: 2, rows: 1, color: 'lightsalmon', text: 'NGX-charts', desc: '', href: 'https://swimlane.github.io/ngx-charts/#/ngx-charts/gauge' },
    { cols: 2, rows: 1, color: 'lightsalmon', text: 'Radar chart', desc: '', href: 'https://swimlane.gitbook.io/ngx-charts/examples/polar-radar-chart' },
    { cols: 2, rows: 1, color: 'lightsalmon', text: 'Radar chart demo', desc: '', href: 'https://stackblitz.com/edit/swimlane-polar-chart?embed=1&file=app/app.component.ts' },
    { cols: 2, rows: 1, color: 'lightsalmon', text: 'Material icons', desc: 'All the names and referenced icons', href: 'https://fonts.google.com/icons' },
    { cols: 2, rows: 1, color: 'lightsalmon', text: 'Unsplash', desc: 'Random photos', href: 'https://unsplash.com/developers' },
    { cols: 2, rows: 1, color: 'lightsalmon', text: 'Ngx Awesome Popup', desc: 'The modern tool', href: 'https://costlydeveloper.github.io/ngx-awesome-popup/#/' },
    { cols: 2, rows: 1, color: 'lightsalmon', text: 'Convert firebase timestamps', desc: 'converts each timestamp within a document (object), also inside its maps and array', href: 'https://www.npmjs.com/package/convert-firebase-timestamp' },
    { cols: 2, rows: 1, color: 'lightsalmon', text: 'Ngx spinner', desc: 'Look for working demo', href: 'https://www.npmjs.com/package/ngx-spinner' },
    { cols: 2, rows: 1, color: 'lightsalmon', text: 'FAB style', desc: '', href: 'https://stackblitz.com/edit/fab?file=theme.scss' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
