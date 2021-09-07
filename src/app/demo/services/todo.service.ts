import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { HttpClientService } from '../../shared/services/http-client.service';
import { Todo } from '../models/todo.interface';

const TODO_LIST: string = 'todos';

@Injectable()
export class TodoService {
  private readonly storage: Storage = sessionStorage;
  private readonly todoSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly http: HttpClientService) {}

  findAll(): Observable<Todo[]> {
    return this.http.get('GET_ALL_TODOS');

    // return new Observable<Todo[]>((observer: Observer<Todo[]>) => {
    //   const todoValue: string = this.storage.getItem(TODO_LIST) as string;

    //   try {
    //     const todos: Todo[] = todoValue ? JSON.parse(todoValue) : [];
    //     observer.next(todos);
    //   } catch(error) {
    //     observer.error(new Error('Unable to parse todo list data.'));
    //   }
    // })
  }
  
  findById(id: number): Observable<Todo> {
    return new Observable<Todo>((observer: Observer<Todo>) => {
      const todoValue: string = this.storage.getItem(TODO_LIST) as string;
  
      try {
        const todos: Todo[] = todoValue ? JSON.parse(todoValue) : [];
        const todo: Todo = todos.find((todo) => todo.id === id) as Todo;
        observer.next(todo);
      } catch(error) {
        observer.error(new Error('Unable to parse todo list data.'));
      }
    })
  }
  
  notify(): Observable<boolean> {
    return this.todoSubject.asObservable();
  }
  
  saveTodo(todo: Todo): Observable<Todo> {
    return new Observable<Todo>((observer: Observer<Todo>) => {
      const todoValue: string = this.storage.getItem(TODO_LIST) as string;
  
      try {
        let todos: Todo[] = todoValue ? JSON.parse(todoValue) : [];

        if(todo.id) {
          // UPDATE TODO
          todos = todos.map((item) => {
            if (item.id === todo.id) {
              item = {
                ...item,
                ...todo
              };
            }
            return item;
          });
        } else {
          // ADD TODO
          todo.id = todos.length + 1;
          todos = todos.concat([todo]);
        }

        this.storage.setItem(TODO_LIST, JSON.stringify(todos));

        observer.next(todo);
        this.todoSubject.next(true);
      } catch(error: any) {
        observer.error(new Error(`Unable to save todo., ${error.message}`));
      }
    })
  }
  
  delete(id: number): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      const todoValue: string = this.storage.getItem(TODO_LIST) as string;
  
      try {
        let todos: Todo[] = todoValue ? JSON.parse(todoValue) : [];

        todos = todos.filter((todo) => todo.id !== id);
  
        this.storage.setItem(TODO_LIST, JSON.stringify(todos));

        observer.next();
        this.todoSubject.next(true);
      } catch(error: any) {
        observer.error(new Error(`Unable to delete todo., ${error.message}`));
      }
    })

  }
}
