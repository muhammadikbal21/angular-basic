import { Directive, HostBinding, Input } from '@angular/core';

enum ButtonColor {
  primary = 'btn-primary',
  success = 'btn-success',
  warning = 'btn-warning',
  danger = 'btn-danger',
}

enum ButtonSize {
  lg = 'btn-lg',
  md = '',
  sm = 'btn-sm'
}

@Directive({
  selector: '[appBsButton]'
})
export class BsButtonDirective {

  @Input() color: 'primary' | 'success' | 'warning' | 'danger' = 'primary'; // 'primary' | 'success' | 'warning' | 'danger' adalah data type dari color
  @Input() size: 'lg' | 'md' | 'sm' = 'md';
  @Input() disabled?: any;

  @HostBinding('class') // berfungsi untuk membinding property yang ada di html (contoh: property class yang akan digunakan)
  get applyStyles(): string {
    const buttonColor: ButtonColor = ButtonColor[this.color];
    const buttonSize: ButtonSize = ButtonSize[this.size];
    const disabled: string = !(this.disabled === false) ? 'disabled' : '';

    return `btn mx-1 ${buttonColor} ${buttonSize} ${disabled}`;
  }

}
