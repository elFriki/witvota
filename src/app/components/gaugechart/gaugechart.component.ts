import { HostListener } from '@angular/core';
import { Component, Input } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-gaugechart',
  templateUrl: './gaugechart.component.html',
  styleUrls: ['./gaugechart.component.scss']
})

export class GaugechartComponent {
  @Input() data: any[] = [];
  @Input() units = '';
  @Input() showText = false;
  @Input() max = 100;
  view: any[2] = [window.screen.availWidth / 3, window.screen.availHeight / 2];
  legend = true;
  legendPosition: LegendPosition;
  legendTitle = '';

  colorScheme = {
      domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {
    // this.view = [500, 400];
    this.legendPosition = LegendPosition.Below;
    const newResults = [...this.data];
  }

  onSelect(data: string): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: string): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: string): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): any {
    // console.log(event.target.innerWidth, event.target.innerHeight);
    this.view = [event.target.innerWidth / 3, event.target.innerHeight / 2];
  }
}
