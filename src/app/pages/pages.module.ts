import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ResourcesComponent } from './resources/resources.component';
import { NextStepsComponent } from './next-steps/next-steps.component';
import { FooterComponent } from './footer/footer.component';

const components = [
  ToolbarComponent,
  ResourcesComponent,
  NextStepsComponent,
  FooterComponent
]

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule
  ],
  // harus diexport agar tag selector dapat digunakan
  exports: [...components]
})
export class PagesModule { }
