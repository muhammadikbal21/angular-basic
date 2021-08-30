import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
    AppRoutingModule,
    PagesModule,
    ResumeModule,
    SharedModule
  ],
  // untuk service yang akan merequest dari backend
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
