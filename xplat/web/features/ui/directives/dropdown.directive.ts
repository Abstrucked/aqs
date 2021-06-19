import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[dropdown]',
})
export class DropdownDirective {
  constructor(private domEl: ElementRef<HTMLElement>) {
    // console.log('OK!!!');
  }
  isOpen = false;
  @HostListener('click') talkToMe(){
    // console.log('Talking...', this.isOpen);
    this.isOpen = !this.isOpen;
    const dropMenu =this.domEl.nativeElement.querySelector('ul').classList;

    if(dropMenu.contains('show')){
      dropMenu.remove('show');
    }else {
      dropMenu.add('show')
    }
  }
}
