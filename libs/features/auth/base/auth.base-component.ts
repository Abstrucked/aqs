import { Directive } from '@angular/core';
import { BaseComponent } from '@mxh/core';
import { AuthService } from '@mxh/nativescript/features/auth/services';

export enum loginMode {
  'login',
  'signup'
}

@Directive()
export abstract class AuthBaseComponent extends BaseComponent {
  public text: string = 'Auth';
  public mode: loginMode = 0;
  constructor(authService: AuthService) {
    super();
  }
  public switchMode(): void {
    if(this.mode === loginMode.login){
      this.mode = loginMode.signup
    }else{
      this.mode = loginMode.login
    }
  }
}
