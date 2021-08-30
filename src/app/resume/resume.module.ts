import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './components/content/content.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ResumeComponent } from './resume.component';

@NgModule({
  declarations: [
    ResumeComponent,
    ContentComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ResumeComponent
  ]
})
export class ResumeModule { }
