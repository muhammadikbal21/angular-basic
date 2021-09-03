import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertMessage } from 'src/app/shared/models/alert-message.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { TodoField } from '../../models/todo-field.enum';
import { Todo } from '../../models/todo.interface';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit, OnChanges {
  @Input() todo!: Todo;
  @Output() todoChange: EventEmitter<Todo> = new EventEmitter();

  form!: FormGroup;
  field: typeof TodoField = TodoField;

  // dependecy injection umumnya diletakkan di parameter contructor
  constructor(
    private readonly session: SessionService,
    private readonly todoService: TodoService
  ) {}

  // ini adalah lifecycle nya angular, ketika ada perubahan dia akan mengupdate nilainya
  ngOnChanges(): void {
    this.setFormValues();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = new FormGroup({
      [TodoField.ID]: new FormControl(null),
      [TodoField.NAME]: new FormControl(null, [Validators.required]),
      [TodoField.IS_DONE]: new FormControl(false),
    });
  }
  
  // ini untuk mengubah value dari formnya agar dapat diubah
  setFormValues(): void {
    if (this.todo) {
      this.form.get(TodoField.ID)?.setValue(this.todo.id);
      this.form.get(TodoField.NAME)?.setValue(this.todo.name);
      this.form.get(TodoField.IS_DONE)?.setValue(this.todo.isDone);
    } else if(this.form) {
      this.form.reset();
    }
  }

  addTodo(): void {
    if (this.form.valid) {
      console.log('value : ', this.form.value);
      const todo: Todo = this.form.value;
      const message: AlertMessage = {
        status: 'success', text: `Todo ${todo.name} saved`
      };

      this.todoService.saveTodo(todo)
        .subscribe(() => {
          this.form.reset();
          this.session.setFlash(JSON.stringify(message));
        },
        (error) => {
          this.session.setFlash(JSON.stringify({
            status: 'danger',
            text: error.message
          }))
        })
    }
  }

  isValid(controlName: TodoField): string {
    // form.get(controlName) : untuk mendapatkan object FormControl dari form (FormGroup) berdasarkan controlName (TodoField)
    const control: AbstractControl | null = this.form.get(controlName);
    let classCss = '';

    // touched : sudah pernah focus atau di klik inputnya
    // dirty : sudah pernah diisi dengan value
    // invalid : status input tersebut invalid atau tidak
    // valid : status input tersebut valid atau tidak
    if (control && control.touched && control.dirty && control.invalid) {
      classCss = 'is-invalid';
    } else if (control && control.touched && control.dirty && control.valid) {
      classCss = 'is-valid';
    }

    return classCss;
  }
}
