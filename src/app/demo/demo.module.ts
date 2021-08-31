import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './demo.component';
import { BankAccountComponent } from './components/bank-account/bank-account.component';
import { TodoComponent } from './components/todo/todo.component';



@NgModule({
  declarations: [
    DemoComponent,
    BankAccountComponent,
    TodoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DemoModule { }
