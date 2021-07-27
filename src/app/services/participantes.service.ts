import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { ParticipanteModel } from '../models/participante.model';
import { environment } from '../../environments/environment';
import { Participante, ParticipanteFB } from '../interfaces/participante';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParticipantesService {

  localStorage: Storage;
  key: string;
  changes$ = new Subject();

  constructor(  private http: HttpClient,
                private db: AngularFirestore ) {
    this.key = 'participantes';
    this.localStorage   = window.localStorage;
  }

  getDBParticipantesSnap(): Observable<ParticipanteFB[]> {
    const collectionRef = this.db.collection<ParticipanteFB>(this.key);
    return collectionRef.snapshotChanges().pipe(
      map(actions => {
      return actions.map(a => {
          const data = a.payload.doc.data() as Participante;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getDBParticipantes(): Observable<Participante[]> {
    return this.http.get<Participante[]>(`${environment.urlAPI}/api/${this.key}`);
  }

  getDBParticipante(id: string): Observable<ParticipanteFB | undefined> {
    const participante: AngularFirestoreDocument<ParticipanteFB> = this.db.doc<ParticipanteFB>(`${this.key}/${id}`);
    // console.log('getDBParticipante', participante);
    return participante.valueChanges();
  }

  setDBParticipante(participanteFB: ParticipanteFB): Promise<DocumentReference<unknown>> {
    console.log('setDBParticipante', participanteFB);
    const collectionRef = this.db.collection(this.key);
    return collectionRef.add({
      name: participanteFB.name,
      description: participanteFB.description,
      imageUrl: participanteFB.imageUrl
    });
  }

  updateDBParticipante(participanteFB: ParticipanteFB): Promise<void> {
    console.log('updateDBParticipante', participanteFB);
    const collectionRef = this.db.collection(this.key);
    const docRef = collectionRef.doc(participanteFB.id);
    // console.log('setDBParticipante', docRef);
    return docRef.update({
      name: participanteFB.name,
      description: participanteFB.description,
      imageUrl: participanteFB.imageUrl
    });
  }

  deleteDBParticipante(participanteFB: ParticipanteFB): Promise<void> {
    // console.log('deleteDBParticipante', participanteFB);
    const collectionRef = this.db.collection(this.key);
    const docRef = collectionRef.doc(participanteFB.id);
    return docRef.delete();
  }

  getItem(id: string): ParticipanteModel {
    if (this.isLocalStorageSupported) {
      const item = this.localStorage.getItem(this.key) || '';
      const items: ParticipanteModel[] = item ? JSON.parse(item) : [];
      if (id === 'new') {
        return new ParticipanteModel();
      } else {
        return items.filter(e => e.id.toString() === id)[0];
      }
    }
    return new ParticipanteModel();
  }

  get(): ParticipanteModel[] {
    if (this.isLocalStorageSupported) {
      const item = this.localStorage.getItem(this.key) || '';
      return item ? JSON.parse(item) : [];
    }
    return [];
  }

  set(value: ParticipanteModel[]): boolean {
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

  setItem(participante: ParticipanteModel): boolean {
    const participantesRef = this.db.collection('participantes');
    participantesRef.add({...participante});
    if (this.isLocalStorageSupported) {
      const item = this.localStorage.getItem(this.key) || '';
      const items: ParticipanteModel[] = item ? JSON.parse(item) : [];
      for (let index = 0; index < items.length; index++) {
        const element = items[index];
        if ( element.id === participante.id ) {
          items.splice(index, 1);
          items.push(participante);
          this.set(items);
          return true;
        }
      }
      items.push(participante);
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
