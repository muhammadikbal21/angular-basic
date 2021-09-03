import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BsButtonDirective } from './directives/bs-button.directive';
import { BsInputDirective } from './directives/bs-input.directive';
import { TodoPipe } from './pipes/todo.pipe';
import { JoinPipe } from './pipes/join.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BsButtonDirective,
    BsInputDirective,
    TodoPipe,
    JoinPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BsButtonDirective,
    BsInputDirective,
    TodoPipe,
    JoinPipe
  ]
})
export class SharedModule { }
