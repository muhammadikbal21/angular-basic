import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundComponent } from './background.component';
import { EducationalComponent } from './educational/educational.component';
import { SkillComponent } from './skill/skill.component';



@NgModule({
  declarations: [
    BackgroundComponent,
    EducationalComponent,
    SkillComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BackgroundComponent
  ]
})
export class BackgroundModule { }
