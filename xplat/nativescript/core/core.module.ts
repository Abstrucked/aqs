import { NgModule, Optional, SkipSelf } from '@angular/core';

// nativescript
import { NativeScriptModule, NativeScriptHttpClientModule } from '@nativescript/angular';
import { Device } from '@nativescript/core';
import { TNSFontIconModule, USE_STORE } from 'nativescript-ngx-fonticon';
import { fontAwesomeIcons } from '../utils';

// libs
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CoreModule, PlatformLanguageToken, PlatformWindowToken } from '@mxh/core';
import { throwIfAlreadyLoaded } from '@mxh/utils';

// app
import { TNSWindowService } from './services/tns-window.service';
import { TNSTranslateLoader } from './services/tns-translate.loader';

// factories
export function platformLangFactory() {
  return Device.language;
}

export function createTranslateLoader() {
  return new TNSTranslateLoader('/assets/i18n/');
}

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptHttpClientModule,
    TNSFontIconModule.forRoot({}),
    CoreModule.forRoot([
      {
        provide: PlatformLanguageToken,
        useFactory: platformLangFactory
      },
      {
        provide: PlatformWindowToken,
        useClass: TNSWindowService
      }
    ]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader
      }
    }),
  ],
  providers: [
    {
      // inline icons to avoid extra file handling on app boot
      provide: USE_STORE,
      useValue: {
        fa: fontAwesomeIcons
      },
    },
  ]
})
export class PklCoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: PklCoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'PklCoreModule');
  }
}
