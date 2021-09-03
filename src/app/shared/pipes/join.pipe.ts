import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {

  // parameter pertama adalah value yang menggunakan pipenya
  transform(value: string[] | null, delimiter: string = ', '): string {
    return Array.isArray(value) ? value.join(delimiter) : ''; // disini akan dicek apakah value adalah array, kalau true akan di join
    // value.join berfungsi untuk menggabungkan element-element array
    // join memiliki parameter yang berfungsi sebagai pemisah element-element yang akan dijoin atau digabungkan
  }

}
