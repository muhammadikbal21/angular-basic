import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankAccountComponent } from './components/bank-account/bank-account.component';
import { TodoComponent } from './components/todo/todo.component';
import { DemoComponent } from './demo.component';

const routes: Routes = [
  {
    path: '',
    component: DemoComponent,
    children: [
        {
            path: 'bank-account',
            component: BankAccountComponent
        },
        {
            path: 'todo',
            component: TodoComponent
        },
        {
            path: 'todo/:id', // route path dengan parameter id (path variable). contoh: todo/1
            component: TodoComponent
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
