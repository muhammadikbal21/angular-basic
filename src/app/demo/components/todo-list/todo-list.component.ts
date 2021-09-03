import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AlertMessage } from 'src/app/shared/models/alert-message.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { Todo } from '../../models/todo.interface';

enum TodoListCss {
  DEFAULT = 'list-group-item list-group-item-action',
  DYNAMIC = 'active bg-warning border-warning text-dark',
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnChanges {

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
  
  @Input() todo: Todo | undefined; // tanda seru bersifat not null
  @Output() todoChange : EventEmitter<Todo> = new EventEmitter<Todo>();

  @Output() deletedTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  // class='list-group-item list-group-item-action{{ toggleActive(item.id) }}'
  klass: typeof TodoListCss = TodoListCss;

  asyncData!: Promise<string[]>;

  message?: AlertMessage;

  // dependecy injection umumnya diletakkan di parameter contructor
  constructor(
    private readonly session: SessionService
  ) { }

  // parameter changes adalah parameter default dari ngOnChanges, jika tidak diperlukan dapat dihapus
  // ketika ada perubahan di todolist maka akan mentriger onChanges nya
  ngOnChanges(changes: SimpleChanges): void {
    const message: string = this.session.getFlash();

    if (message) {
      this.message = JSON.parse(message);
    }
  }

  ngOnInit(): void {
    // setelah 3 detik, asyncData akan diisi element array seperti dibawah ini
    setTimeout(() => {
      this.asyncData = Promise.resolve(['sample', 'data', 'array']);
    }, 3_000);
  }

  // ini yang akan dipanggil di html
  selectTodo(todo: Todo) : void {
    if (!this.todo || (this.todo && this.todo.id !== todo.id)) {
      console.log('selected : ', todo);
      this.todo = todo;
      this.todoChange.emit(todo); // emit berfungsi agar method ini dapat digunakan ke luar
    } else {
      this.todo = undefined;
      this.todoChange.emit();
    }
  }

  /**
   * ['nama-class-1', 'nama-class-2']
   * {
   *  'nama-class-1 nama-class-2': true (class-nya ditampilkan),
   *  'nama-class-3 nama-class-4': false (class-nya tidak ditampilkan),
   * }
   */
  cssClass(id: number): any {
    return {
      [TodoListCss.DEFAULT]: true,
      [TodoListCss.DYNAMIC]: this.todo?.id === id
    }
  }

  toggleActive(todoId: number): string {
    // this.todo?.id maksudnya ketika objectnya ada maka lanjut ke spesifik id nya,
    // jika objectnya tidak ada maka dia adalah undefined (false)
    return this.todo?.id === todoId ? ' active bg-warning border-warning text-dark' : ' ';
  }

  toggleDone(todo: Todo): void {
    todo.isDone = !todo.isDone;
  }

  toggleStrike(isDone: boolean): string {
    return isDone ? ' text-decoration-line-through' : '';
  }

  deleteTodo(todo: Todo): void {
    this.deletedTodo.emit(todo);
  }

  // applyToggleDone() : void {
  //   this.toggleDone.isDone = !this.toggleDone.isDone;
  //   this.toggleDoneChange.emit(this.toggleDone);
  //   console.log('isDone: ', this.toggleDone.isDone);
    
  // }

}
