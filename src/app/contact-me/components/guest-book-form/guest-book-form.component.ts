import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertMessage } from 'src/app/shared/models/alert-message.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { GuestBookField } from '../../models/guest-book.enum';
import { GuestBook } from '../../models/guest-book.interface';
import { GuestBookService } from '../../services/guest-book.service';

@Component({
  selector: 'app-guest-book-form',
  templateUrl: './guest-book-form.component.html',
  styleUrls: ['./guest-book-form.component.scss']
})
export class GuestBookFormComponent implements OnInit, OnChanges {
  @Input() guestBook!: GuestBook;
  @Output() guestBookChange: EventEmitter<GuestBook> = new EventEmitter();

  title: string = 'Guest Book Form';
  form!: FormGroup;
  field: typeof GuestBookField = GuestBookField;

  constructor(
    private readonly guestBookService: GuestBookService,
    private readonly session: SessionService
  ) { }

  ngOnChanges(): void {
    this.setFormValues();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = new FormGroup({
      [GuestBookField.ID]: new FormControl(null),
      [GuestBookField.NAME]: new FormControl(null, [Validators.required]),
      [GuestBookField.PHONE]: new FormControl(null, [Validators.required]),
      [GuestBookField.EMAIL]: new FormControl(null, [Validators.required]),
      [GuestBookField.NOTE]: new FormControl(null, [Validators.required]),
    });
  }

  setFormValues(): void {
    if (this.guestBook) {
      this.form.get(GuestBookField.ID)?.setValue(this.guestBook.id);
      this.form.get(GuestBookField.NAME)?.setValue(this.guestBook.name);
      this.form.get(GuestBookField.PHONE)?.setValue(this.guestBook.phone);
      this.form.get(GuestBookField.EMAIL)?.setValue(this.guestBook.email);
      this.form.get(GuestBookField.NOTE)?.setValue(this.guestBook.note);
    } else if(this.form) {
      this.form.reset();
    }
  }

  isValid(controlName: GuestBookField): string {
    const control: AbstractControl | null = this.form.get(controlName);
    let classCss = '';

    if (control && control.touched && control.dirty && control.invalid) {
      classCss = 'is-invalid';
    } else if (control && control.touched && control.dirty && control.valid) {
      classCss = 'is-valid';
    }

    return classCss;
  }

  addGuestBook(): void {
    if (this.form.valid) {
      console.log('value : ', this.form.value);
      const guestBook: GuestBook = this.form.value;
      const message: AlertMessage = {
        status: 'success', text: `Guest book ${guestBook.name} saved`
      };
      
      this.guestBookService.save(guestBook)
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
}
