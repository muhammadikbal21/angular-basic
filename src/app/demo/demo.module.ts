import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './demo.component';
import { BankAccountComponent } from './components/bank-account/bank-account.component';
import { TodoComponent } from './components/todo/todo.component';
import { DemoRoutingModule } from './demo-routing.module';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DemoComponent,
    BankAccountComponent,
    TodoComponent,
    TodoListComponent,
    TodoFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DemoRoutingModule
  ]
})
export class DemoModule { }
