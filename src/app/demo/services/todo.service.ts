import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
  }
  
  findById(id: number): Observable<Todo> {
    return this.http.get('GET_SINGLE_TODOS', { id });
  }
  
  notify(): Observable<boolean> {
    return this.todoSubject.asObservable();
  }
  
  saveTodo(todo: Todo): Observable<Todo> {
    let request: Observable<Todo>;

    if (todo.id) {
      request = this.http.put('PUT_TODOS', todo, { id: todo.id });
    } else {
      request = this.http.post('POST_TODOS', todo);
    }

    return request.pipe(
      tap((todo: Todo) => {
        this.todoSubject.next((todo !== undefined || todo !== null));
      })
    )
  }
  
  delete(id: number): Observable<void> {
    return this.http.delete('DELETE_TODOS', { id })
      .pipe(
        map((todo: Todo) => {
          this.todoSubject.next((todo !== undefined || todo !== null));
        })
      )

  }
}
