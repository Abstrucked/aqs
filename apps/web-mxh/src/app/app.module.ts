import { NgModule } from '@angular/core';

// libs
import { environment } from '@mxh/core';

// app
import { CoreModule } from './core/core.module';
import { SharedModule } from './features/shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
// firebase
import {AngularFireModule} from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {
  AngularFireStorageModule} from '@angular/fire/storage';
// FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { faCoffee, faFilm } from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    // AngularFontAwesomeModule,
    FontAwesomeModule
  ],
  declarations: [AppComponent, FooterComponent],
  bootstrap: [AppComponent],
})
export class AppModule {

  constructor() {
    // library.add(faFilm, faCoffee);
    library.add(fas, far);

  }
}
