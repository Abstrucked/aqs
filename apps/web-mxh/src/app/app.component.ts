import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
// xplat
import { AppBaseComponent } from '@mxh/web';

@Component({
  selector: 'pkl-root',
  templateUrl: './app.component.html',
})
export class AppComponent extends AppBaseComponent implements OnInit {
  constructor(private firestore: AngularFirestore) {
    super();
  }
  ngOnInit(){ }
}
