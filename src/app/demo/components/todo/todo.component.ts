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
  todo!: Todo;
  pageTitle: string = 'Todo List Page';
  private readonly storage = sessionStorage;
  
  // todo = {
  //   id: 4,
  //   name: 'Makan',
  //   isDone: false
  // };

  // constructor pertama kali dipanggil
  constructor() { }

  // ini seperti componentDidMount pada reactjs, dipanggil setelah halaman dirender
  ngOnInit(): void {
    const data = this.storage.getItem('todo');

    if (!data) {
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
      ];
      this.storage.setItem('todos', JSON.stringify(this.todos));
    } else {
      this.todos = JSON.parse(data as string); // keyword as berarti type casting
    }
  }

  onSelectedTodo(todo: Todo) : void {
    console.log('todo terpilih : ', todo);
    this.todo = todo;
  }

  deleteTodo(todo: Todo): void {
    this.todos = this.todos.filter((item) => item.id !== todo.id);
    this.storage.setItem('todo', JSON.stringify(this.todos));
  }

  private saveTodo(todo: Todo): void {
    if (todo.id) {
      // logic untuk mengedit data
      this.todos = this.todos.map((item) => { // 1. harus dimapping dulu array nya
        if (item.id === todo.id) { // 2. lalu di cek object dari array tadi dengan object dari parameter method saveTodo (mencocokan dengan id nya), jika kedua objectnya sama
          item = { // 3. Mengupdate objectnya dengan data baru menggunakan spread operator (mengcopy object yang lama)
            ...item,
            ...todo,
          };
        }
        return item
      });
    } else {
      todo.id = this.todos.length + 1;
      this.todos = this.todos.concat([todo]);
    }

    this.storage.setItem('todos', JSON.stringify(this.todos)); // meng-set storage nya agar tetap ada objectnya ketika baru ditambah todolistnya
  }

  // getter property method, dapat diakses layaknya sebuah property class
  // contoh: this.selectedTodo
  get selectedTodo(): Todo {
    return this.todo;
  }

  // setter property method dapat diassign layaknya sebuah variable
  // contoh: this.selectedTodo = new Todo()
  set selectedTodo(todo: Todo) {
    console.log('selected: ', todo);
    this.todo = todo;
  }

  // two way data binding bisa menggunakan getter dan setter property, one way tidak bisa
  get formData(): Todo {
    return this.todo;
  }

  set formData(todo: Todo) {
    this.saveTodo(todo);
  }
}
