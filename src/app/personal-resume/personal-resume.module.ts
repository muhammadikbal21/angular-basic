import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalResumeComponent } from './personal-resume.component';
import { TitleComponent } from './components/title/title.component';
import { IdentityComponent } from './components/identity/identity.component';
import { BackgroundModule } from './components/background/background.module';

@NgModule({
  declarations: [
    PersonalResumeComponent,
    TitleComponent,
    IdentityComponent,
  ],
  imports: [
    CommonModule,
    BackgroundModule
  ],
  exports: [
    PersonalResumeComponent
  ]
})
export class PersonalResumeModule { }
