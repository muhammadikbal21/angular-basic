import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactMeComponent } from './contact-me.component';
import { GuestBookFormComponent } from './components/guest-book-form/guest-book-form.component';
import { GuestBookListComponent } from './components/guest-book-list/guest-book-list.component';
import { GuestBookService } from './services/guest-book.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ContactMeComponent,
    GuestBookFormComponent,
    GuestBookListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ContactMeComponent
  ],
  providers: [
    GuestBookService
  ]
})
export class ContactMeModule { }
