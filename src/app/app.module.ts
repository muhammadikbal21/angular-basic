import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactMeModule } from './contact-me/contact-me.module';
import { PagesModule } from './pages/pages.module';
import { ResumeModule } from './resume/resume.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  // semua component akan dideklarasikan dibawah ini, agar dapat digunakan tag selectornya di html
  declarations: [
    AppComponent
  ],
  // untuk mengimport package yang dibutuhkan pada component ini
  imports: [
    BrowserModule,
    AppRoutingModule, // setelah membuat route di app-routing, import module app-routing nya disini
    PagesModule,
    ResumeModule,
    SharedModule,
    ContactMeModule
  ],
  // untuk service yang akan merequest dari backend
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
