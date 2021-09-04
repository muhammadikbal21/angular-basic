import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { delay } from 'rxjs/operators';
import { AlertMessage } from 'src/app/shared/models/alert-message.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { GuestBook } from '../../models/guest-book.interface';
import { GuestBookService } from '../../services/guest-book.service';

@Component({
  selector: 'app-guest-book-list',
  templateUrl: './guest-book-list.component.html',
  styleUrls: ['./guest-book-list.component.scss']
})
export class GuestBookListComponent implements OnInit, OnChanges {
  @Input() guestBook?: GuestBook | undefined;
  @Output() guestBookChange: EventEmitter<GuestBook> = new EventEmitter<GuestBook>();

  title: string = 'Guest Book List';
  list: GuestBook[] = [];
  message?: AlertMessage;

  constructor(
    private readonly guestBookService: GuestBookService,
    private readonly session: SessionService
  ) { }

  ngOnChanges(): void {
    const message: string = this.session.getFlash();

    if (message) {
      this.message = JSON.parse(message); 
    }
  }

  ngOnInit(): void {
    this.guestBookService.notify()
      .subscribe((reload: boolean) => {
        if (reload) {
          this.list = [];
          this.guestBookService.findAll()
          .pipe(delay(3_000))
          .subscribe((guestBooks: GuestBook[]) => {
            this.list = guestBooks;
          },
          (error) => {
            this.message = {
              status: 'danger',
              text: error.message
              }
            })
          }
        })
        
      this.guestBookService.findAll()
      .pipe(delay(3_000))
      .subscribe((guestBooks: GuestBook[]) => {
        this.list = guestBooks;
      },
      (error) => {
        this.message = {
          status: 'danger',
          text: error.message
        }
      })
  }

  selectGuestBook(guestBook: GuestBook): void {
    if (!this.guestBook || (this.guestBook && this.guestBook.id !== guestBook.id)) {
      console.log('selected: ', guestBook);
      this.guestBook = guestBook;
      this.guestBookChange.emit(guestBook);
    } else {
      this.guestBook = undefined;
      this.guestBookChange.emit();
    }
  }

  deleteGuestBook(guestBook: GuestBook): void {
    this.guestBookService.delete(guestBook.id)
    .subscribe(() => {
        this.message = {
          status: 'success',
          text: `Data guest book ${guestBook.name} deleted`
        }
      },
      (error) => {
        this.message = {
          status: 'danger',
          text: error.message
        };
      })
  }

}
