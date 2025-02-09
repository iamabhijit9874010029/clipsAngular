import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, QuerySnapshot } from '@angular/fire/compat/firestore';
import IClip from '../models/clip.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  public clipsCollection: AngularFirestoreCollection<IClip>

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    this.clipsCollection = db.collection('clips');
  }

  createClip(data: IClip): Promise<DocumentReference<IClip>> {
    return this.clipsCollection.add(data);
  }

  // getUserClips(){
  //   return this.auth.user.pipe(
  //     switchMap(user=>{
  //       if(!user){
  //         return of([]);
  //       }

  //       const query = this.clipsCollection.ref.where('uid', '==', user.uid);

  //       return query.get();
  //     })
  //   )
  // }


  // getUserClips(): Observable<QuerySnapshot<IClip> | IClip[]> {
  getUserClips() {
    return this.auth.user.pipe(
      switchMap(user => {
        if (!user) {
          return of([]);
        }

        const query = this.clipsCollection.ref.where('uid', '==', user.uid);

        return query.get();
      }),
      map(snapshot => (snapshot as QuerySnapshot<IClip>).docs)
    )
  }


  // async updateClip(id: string, title: string) {
  updateClip(id: string, title: string) {
    this.clipsCollection.doc(id).update({
      title
    })

    // to check whether 'Please wait! Updating clip.' is actually poping up very fast
    // await new Promise<void>((resolve) => {
    //   setTimeout(() => {
    //     this.clipsCollection.doc(id).update({ title });
    //     resolve();
    //   }, 5000);
    // });
  }

}
