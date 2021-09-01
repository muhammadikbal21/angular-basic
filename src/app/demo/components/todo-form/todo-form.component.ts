import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
      [TodoField.NAME]: new FormControl(null),
      [TodoField.IS_DONE]: new FormControl(false),
    });
  }

  addTodo(): void {
    console.log('value : ', this.form.value);
  }
}
