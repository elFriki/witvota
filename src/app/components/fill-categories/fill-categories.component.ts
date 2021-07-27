import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DialogBelonging } from '@costlydeveloper/ngx-awesome-popup';
import { EventoFB } from '../../interfaces/evento';

@Component({
  selector: 'app-fill-categories',
  templateUrl: './fill-categories.component.html',
  styleUrls: ['./fill-categories.component.scss']
})
export class FillCategoriesComponent implements OnInit, OnDestroy {
  eventoFB: EventoFB;

  private subscriptions: Subscription = new Subscription();

  constructor(private dialogBelonging: DialogBelonging) {
    this.eventoFB = this.dialogBelonging.CustomData;
  }

  ngOnInit(): void {
    // Check received data and other available features.
    // console.log(this.dialogBelonging);
    this.eventoFB = this.dialogBelonging.CustomData;
    if (!this.eventoFB.categories) {
      this.eventoFB.categories = new Array();
    }

    // Subscribe to button listeners.
    this.subscriptions.add(
        // IDialogEventsController
        this.dialogBelonging.EventsController.onButtonClick$.subscribe((Button) => {
            if (Button.ID === 'submit') {
              if ( this.addCategory() ) {
                this.dialogBelonging.EventsController.close();
              }
            }
            else if (Button.ID === 'cancel') {
                // Do some logic and close popup.
                this.dialogBelonging.EventsController.close();
            }
        })
    );
    this.dialogBelonging.EventsController.closeLoader();
  }

  addCategory(): boolean {
    const cat = document.getElementById('myCategory') as HTMLInputElement;
    console.log(`añadir ${cat.value}`);
    if (cat && this.eventoFB.categories) {
      this.eventoFB.categories.push(cat.value);
      return true;
    }
    return false;

  }
  save(index: number): void {

  }
  undo(index: number): void {

  }
  ngOnDestroy(): void {
    // Care about memory and close all subscriptions.
    this.subscriptions.unsubscribe();
  }
}
