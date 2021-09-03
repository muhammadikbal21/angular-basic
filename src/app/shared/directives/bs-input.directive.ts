import { Directive, HostBinding, Input } from '@angular/core';

enum InputSize {
  lg = 'form-control-lg',
  md = '',
  sm = 'form-control-sm'
}

@Directive({
  selector: '[appBsInput]'
})
export class BsInputDirective {
  @Input() size: 'lg' | 'md' | 'sm' = "md";
  @Input() plainText?: any;

  @HostBinding('class')
  get applyStyles(): string {
    const size: InputSize = InputSize[this.size];
    const plaintext: string = !(this.plainText === false) ? 'form-control-plaintext' : 'form-control';
    
    return `${size} ${plaintext}`;
  }

}
