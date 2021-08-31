import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  // todos: any[] = []; // penggunaan tipe any kurang direkomendasikan, usahakan menggunakan interface atau class model yang mewakili, dan tidak bisa mencari suggest nya ketika menggunakan objectnya
  todos: Todo[] = []; // ini kita menggunakan interface agar dapat dicari property dari objectnya (suggest)

  pageTitle: string = 'Todo List Page';
  
  todo = {
    id: 1,
    name: 'Makan'
  };

  // constructor pertama kali dipanggil
  constructor() { }

  // ini seperti componentDidMount pada reactjs, dipanggil setelah halaman dirender
  ngOnInit(): void {
    this.todos = [
      {
        id: 1,
        name: 'Makan',
        isDone: false
      },
      {
        id: 2,
        name: 'Minum',
        isDone: true
      },
      {
        id: 3,
        name: 'Tidur',
        isDone: false
      },
      {
        id: 4,
        name: 'Mandi',
        isDone: true
      },
    ]
  }

  onSelectedTodo(value: Todo) : void {
    console.log('todo terpilih : ', value);
  }

}
