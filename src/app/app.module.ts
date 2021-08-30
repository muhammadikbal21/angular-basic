import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonalResumeModule } from './personal-resume/personal-resume.module';

@NgModule({
  // semua component akan dideklarasikan dibawah ini, agar dapat digunakan tag selectornya di html
  declarations: [
    AppComponent
  ],
  // untuk mengimport package yang dibutuhkan pada component ini
  imports: [
    BrowserModule,
    AppRoutingModule,
    PersonalResumeModule
  ],
  // untuk service yang akan merequest dari backend
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
