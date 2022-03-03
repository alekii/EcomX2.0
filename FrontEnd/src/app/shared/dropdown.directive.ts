import {Directive, HostBinding, HostListener} from '@angular/core'

@Directive({
    selector : '[appDropDown]'
})

export class DropdownDirective {
  @HostBinding('class.open') isOpen = true;

  @HostListener('click') toggle(){
       this.isOpen = !this.isOpen;
  }

}

