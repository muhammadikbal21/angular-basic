import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todo'
})
export class TodoPipe implements PipeTransform {

  // parameter pertama adalah value yang menggunakan pipenya
  transform(value: string, text: string = 'TODO'): string {
    console.log('value: ', value);
    return `${text} ${value}`;
  }

}
