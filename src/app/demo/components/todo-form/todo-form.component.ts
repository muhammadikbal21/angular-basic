import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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
    private readonly todoService: TodoService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  // ini adalah lifecycle nya angular, ketika ada perubahan dia akan mengupdate nilainya
  ngOnChanges(): void {
    this.setFormValues();
  }

  ngOnInit(): void {
    this.buildForm();

    // query params berbentuk string
    // keyword as untuk casting hanya diperlukan ketika kita sudah yakin dengan tipe datanya, namun tidak perlu konversi tipe pada datanya
    // penggunaan casting yang sebenarnya diperlukan ketika kalian menemukan data yang tipe nya any
    // casting yang sebenarnya apa?
    // - penggunaan keyword + (konversi ke number)
    // - penggunaan backtick ` (konversi ke string)

    // gunakan queryParams pada saat url hanya mengandung query string
    // this.activatedRoute.queryParams.subscribe((params: Params) => {
    //   console.log('activatedRoute.queryParams', params); // contoh: todo?isdone=true
    //   if (params.id) {
    //     this.todoService.findById(+params.id).subscribe((todo: Todo) => { // tanda + mengubah (parsing) params.id menjadi number
    //       console.log('todo', todo);
    //       this.todo = todo;
    //       this.setFormValues();
    //     }, (error) => {
    //       console.error(error);
    //     })
    //   }
    // })

    this.activatedRoute.queryParams.pipe(
      // mengubah route params menjadi number
      map((params: Params) => {
        return params.id ? +params.id : 0
      }),
      // setelah itu ditangkap route params number tadi kesini
      switchMap((id: number) => {
        return this.todoService.findById(id)
      })
    ).subscribe((todo: Todo) => {
      this.todo = todo;
      this.setFormValues();
    }, (error) => {
      console.error(error);
    })

    // gunakan queryParams pada saat url hanya mengandung path variable yang sudah didefinisikan di route module
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log('activatedRoute.params', params); // contoh: todo/1
    })

    // gunakan combineLatest pada saat url mengandung query string dan path variable, dan keduanya sama-sama digunakan code
    // menggabungkan activatedRoute, baik params maupun queryParams
    combineLatest([
      this.activatedRoute.params,
      this.activatedRoute.queryParams
    ])
    .pipe(
      map(([ params, queryParams ]) => {
        return {
          ...params,
          ...queryParams
        }
      })
    )
    .subscribe((params) => {
      console.log('all params', params);
    })
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
