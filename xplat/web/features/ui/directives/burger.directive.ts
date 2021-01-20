import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[burger]',
})
export class BurgerDirective {
  constructor(private domEl: ElementRef<HTMLElement>) {
    console.log('Burger OK!!!');

  }
  isOpen = false;
  @HostListener('click') talk(){
    console.log('Talking...', this.isOpen);
    this.isOpen = !this.isOpen;
    const menu = this.domEl.nativeElement.parentElement;
    const burgerMenu = menu.querySelector('#navbarSupportedContent').classList

    if(burgerMenu.contains('collapse')){
      burgerMenu.remove('collapse');
    }else {
      burgerMenu.add('collapse')
    }
  }}
