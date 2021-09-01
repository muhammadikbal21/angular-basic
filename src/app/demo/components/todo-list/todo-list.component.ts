import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../../models/todo.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  // One Way Data Binding
  // ini arahnya dari luar component ke dalam
  @Input() list: Todo[] = [];
  @Input() title!: string; // tanda seru bersifat not null

  // ini arahnya dari dalam component ke luar
  @Output() selectedTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  // // // // // // // // // // // // // // //

  // Two Way Data Binding
  // mempunyai dua arah yaitu input dan output
  // harus ada sepasang input dan output decorator
  // output decorator property harus ada suffix change, contoh : toggleDoneChange
  // @Input() toggleDone! : Todo; // tanda seru bersifat not null
  // @Output() toggleDoneChange : EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit(): void {
  }

  // ini yang akan dipanggil di html
  selectTodo(todo: Todo) : void {
    this.selectedTodo.emit(todo); // emit berfungsi agar method ini dapat digunakan ke luar
    // if (todo.id === this.toggleDone.id) {
    //   this.applyToggleDone();
    // }
  }

  // applyToggleDone() : void {
  //   this.toggleDone.isDone = !this.toggleDone.isDone;
  //   this.toggleDoneChange.emit(this.toggleDone);
  //   console.log('isDone: ', this.toggleDone.isDone);
    
  // }

}
