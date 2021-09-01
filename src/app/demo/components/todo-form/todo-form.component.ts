import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TodoField } from '../../models/todo-field.enum';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  form!: FormGroup;
  field: typeof TodoField = TodoField;

  constructor() {}

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

  addTodo(): void {
    if (this.form.valid) {
      console.log('value : ', this.form.value);
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
