import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gaugelinearchart',
  templateUrl: './gaugelinearchart.component.html',
  styleUrls: ['./gaugelinearchart.component.scss']
})
export class GaugelinearchartComponent implements OnInit {
  @Input() value = 50;
  @Input() previousValue = 70;
  @Input() units = 'counts';
  view: any[2] = [150, 150];
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(event: any): void {
    console.log(event);
  }
}
