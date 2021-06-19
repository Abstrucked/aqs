import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserKeys } from '@mxh/core/models/user.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentSnapshot  } from '@angular/fire/firestore';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  loggedUser = new BehaviorSubject<User>(null);
  collection: AngularFirestoreCollection<UserKeys>;
  document: AngularFirestoreDocument<UserKeys>

  constructor(private fireAuth: AngularFireAuth, private fireStore: AngularFirestore) {
    this.collection = this.fireStore.collection<UserKeys>('userkeys');
  }

  onLogin(email: string, passw: string): Promise<void>{
    let user: User;
    let uC: firebase.default.auth.UserCredential;
   return new Promise<void> (
     (res, rej) => {
      this.fireAuth.signInWithEmailAndPassword(email, passw).then(
        fireUser => {
          this.getKeysOnLogin(fireUser.user.uid).pipe(tap( x => {
            this.loggedUser.next(
              new User( fireUser.user.uid, fireUser.user.email, x.kind, fireUser)
            );


          })).subscribe(
            result => {
              // console.log('here....', result);
              // console.log(this.loggedUser.value);
              res()

            }
          )
        }
      )
     }
   )
  }
  onSignup(email: string, passw: string): Observable<User> {
    this.fireAuth.createUserWithEmailAndPassword(email, passw).then(
      user => {
        // console.log('user ', user.user.uid, 'was created');
        const mxhUser = new User (user.user.uid, user.user.email, 0, user);
        this.addKeysOnSignup(new UserKeys(0), mxhUser);
        this.loggedUser.next(mxhUser);
      }
    )
    return this.loggedUser.asObservable()
  }
  addKeysOnSignup(keys: UserKeys, user:User){
    this.document = this.fireStore.doc<UserKeys>(user.uid+'/keys');
    this.document.set({kind: 0});
  }
  getKeysOnLogin(userID: string): Observable<UserKeys> {
    let uKeys: UserKeys;
    this.document = this.fireStore.doc<UserKeys>(userID+'/keys');
    return this.document.valueChanges()


  }
}
