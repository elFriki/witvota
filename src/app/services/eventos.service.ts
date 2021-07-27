import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { convertTimestamp, convertTimestamps } from 'convert-firebase-timestamp';
import { Observable, Subject } from 'rxjs';
import { EventoModel } from '../models/evento.model';
import { Evento, EventoFB } from '../interfaces/evento';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  localStorage: Storage;
  key: string;
  changes$ = new Subject();

  constructor( private db: AngularFirestore ) {
    this.key = 'eventos';
    this.localStorage   = window.localStorage;
  }

  getDBFutures(): Observable<EventoFB[]> {
    const start = new Date();
    const collectionRef = this.db.collection<EventoFB>(this.key, ref => ref
      .where('endDateTime', '>=', start)
      .orderBy('endDateTime', 'desc')
    );
    return collectionRef.snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
          const data = a.payload.doc.data() as Evento;
          convertTimestamps(a.payload.doc.data());
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getDBNextFuture(): Observable<EventoFB[]> {
    const collectionRef = this.db.collection<EventoFB>(this.key);
    return collectionRef.snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
          const data = a.payload.doc.data() as Evento;
          convertTimestamps(a.payload.doc.data());
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getDBEventosSnap(): Observable<EventoFB[]> {
    const collectionRef = this.db.collection<EventoFB>(this.key);
    return collectionRef.snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
          const data = a.payload.doc.data() as Evento;
          convertTimestamp(a.payload.doc.data());
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getDBEvento(id: string): Observable<EventoFB | undefined> {
    const evento: AngularFirestoreDocument<EventoFB> = this.db.doc<EventoFB>(`${this.key}/${id}`);
    // console.log('getDBEvento', evento);
    return evento.valueChanges().pipe(
      map(doc => {
        if (doc){
          doc.iniDateTime = convertTimestamp(doc.iniDateTime);
          doc.endDateTime = convertTimestamp(doc.endDateTime);
          doc.id = id;
        }
        return doc;
      })
    );
  }

  setDBEvento(eventoFB: EventoFB): Promise<DocumentReference<unknown>> {
    console.log('setDBEvento', eventoFB);
    const collectionRef = this.db.collection(this.key);
    return collectionRef.add({
      name: eventoFB.name,
      description: eventoFB.description,
      place: eventoFB.place,
      iniDateTime: eventoFB.iniDateTime,
      endDateTime: eventoFB.endDateTime,
      price: eventoFB.price,
      rating: eventoFB.rating,
      participantes: eventoFB.participantes,
      categories: eventoFB.categories,
      imageUrl: eventoFB.imageUrl
    });
  }

  updateDBEvento(eventoFB: EventoFB): Promise<void> {
    console.log('updateDBEvento', eventoFB);
    const collectionRef = this.db.collection(this.key);
    const docRef = collectionRef.doc(eventoFB.id);
    // console.log('updateDBEvento', docRef);
    return docRef.update({
      name: eventoFB.name,
      description: eventoFB.description,
      place: eventoFB.place,
      iniDateTime: eventoFB.iniDateTime,
      endDateTime: eventoFB.endDateTime,
      price: eventoFB.price,
      rating: eventoFB.rating,
      participantes: eventoFB.participantes,
      categories: eventoFB.categories,
      imageUrl: eventoFB.imageUrl
    });
  }

  deleteDBEvento(eventoFB: EventoFB): Promise<void> {
    // console.log('deleteDBEvento', eventoFB);
    const collectionRef = this.db.collection(this.key);
    const docRef = collectionRef.doc(eventoFB.id);
    return docRef.delete();
  }


  getItem(id: string): EventoModel {
    if (this.isLocalStorageSupported) {
      const item = this.localStorage.getItem(this.key) || '';
      const items: EventoModel[] = item ? JSON.parse(item) : [];
      if (id === 'new') {
        return new EventoModel();
      } else {
        return items.filter(e => e.id.toString() === id)[0];
      }
    }
    return new EventoModel();
  }
  

  get(): EventoModel[] {
    if (this.isLocalStorageSupported) {
      const item = this.localStorage.getItem(this.key) || '';
      return item ? JSON.parse(item) : [];
    }
    return [];
  }

  getFutures(): EventoModel[] | null {
    if (this.isLocalStorageSupported) {
      const now = new Date();
      const item = this.localStorage.getItem(this.key) || '';
      const items: EventoModel[] = item ? JSON.parse(item) : null;
      if (items) {
        return items.filter(element => 
          element.iniDateTime && (new Date(element.endDateTime).getTime() > now.getTime())
        );
      }
    }
    return null;
  }

  getNextFuture(): EventoModel | null {
    if (this.isLocalStorageSupported) {
      const now = new Date();
      const items = this.getFutures();
      console.log(items);
      if (items) {
        return items.sort((a: EventoModel, b: EventoModel) => 
                  new Date(a.endDateTime).getTime() - new Date(b.endDateTime).getTime())[0];
      }
    }
    return null;
  }

  set(value: EventoModel[]): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(this.key, JSON.stringify(value));
      this.changes$.next({
        type: 'set',
        key: this.key,
        value
      });
      return true;
    }
    return false;
  }

  setItem(evento: EventoModel): boolean {
    if (this.isLocalStorageSupported) {
      const item = this.localStorage.getItem(this.key) || '';
      const items: EventoModel[] = item ? JSON.parse(item) : [];
      for (let index = 0; index < items.length; index++) {
        const element = items[index];
        if ( element.id === evento.id ) {
          items.splice(index, 1);
          items.push(evento);
          this.set(items);
          return true;
        }
      }
      items.push(evento);
      this.set(items);
      return true;
    }
    return false;
  }

  remove(): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(this.key);
      this.changes$.next({
        type: 'remove',
        key: this.key
      });
      return true;
    }
    return false;
  }
  get isLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }
}
