import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TodoField } from '../../models/todo-field.enum';
import { Todo } from '../../models/todo.interface';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit, OnChanges {
  @Input() edit?: Todo;
  @Output() todo: EventEmitter<Todo> = new EventEmitter();

  form!: FormGroup;
  field: typeof TodoField = TodoField;

  constructor() {}

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
    if (this.edit) {
      this.form.get(TodoField.ID)?.setValue(this.edit.id);
      this.form.get(TodoField.NAME)?.setValue(this.edit.name);
      this.form.get(TodoField.IS_DONE)?.setValue(this.edit.isDone);
    }
  }

  addTodo(): void {
    if (this.form.valid) {
      console.log('value : ', this.form.value);
      this.todo.emit(this.form.value);
      this.form.reset(); // berfungsi untuk mereset formnya ketika sudah meng-save datanya
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
