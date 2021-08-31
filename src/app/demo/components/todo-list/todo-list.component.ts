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
  @Input() title: string = 'Todo List';

  // ini arahnya dari dalam component ke luar
  @Output() selectedTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit(): void {
  }

  // ini yang akan dipanggil di html
  selectTodo(todo: Todo) : void {
    this.selectedTodo.emit(todo); // emit berfungsi agar method ini dapat digunakan ke luar
  }

}
