import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './demo.component';
import { BankAccountComponent } from './components/bank-account/bank-account.component';
import { TodoComponent } from './components/todo/todo.component';
import { DemoRoutingModule } from './demo-routing.module';
import { TodoListComponent } from './components/todo-list/todo-list.component';



@NgModule({
  declarations: [
    DemoComponent,
    BankAccountComponent,
    TodoComponent,
    TodoListComponent
  ],
  imports: [
    CommonModule,
    DemoRoutingModule
  ]
})
export class DemoModule { }
