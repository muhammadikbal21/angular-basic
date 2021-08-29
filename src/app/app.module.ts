import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './pages/toolbar/toolbar.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import { NextStepsComponent } from './pages/next-steps/next-steps.component';
import { FooterComponent } from './pages/footer/footer.component';

@NgModule({
  // semua component akan dideklarasikan dibawah ini, agar dapat digunakan tag selectornya di html
  declarations: [
    AppComponent,
    ToolbarComponent,
    ResourcesComponent,
    NextStepsComponent,
    FooterComponent
  ],
  // untuk mengimport package yang dibutuhkan pada component ini
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  // untuk service yang akan merequest dari backend
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
