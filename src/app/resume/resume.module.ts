import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './components/content/content.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ResumeComponent } from './resume.component';

@NgModule({
  // component hanya bisa dideklarasi di 1 module saja, jika kita membutuhkan componentnya dan akan digunakan ditempat lain, maka component tersebut harus di exports
  declarations: [
    ResumeComponent,
    ContentComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule
  ],
  // component ResumeComponent di export agar dapat digunakan ditempat lain dengan memanggil module nya sendiri (disini yang akan dipanggil yaitu ResumeModule)
  exports: [
    ResumeComponent
  ]
})
export class ResumeModule { }
