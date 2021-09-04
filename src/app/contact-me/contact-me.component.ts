import { Component, OnInit } from '@angular/core';
import { GuestBook } from './models/guest-book.interface';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit {
  guestBooks: GuestBook[] = [];
  guestBook!: GuestBook;
  private readonly storage = sessionStorage;

  constructor() { }

  ngOnInit(): void {
    const data = this.storage.getItem('guestBook');

    if (!data) {
      this.guestBooks = [
        {
          id: 1,
          name: 'Ikbal',
          phone: '081370609353',
          email: 'muhammadikbal21@gmail.com',
          note: 'Amazing!',
          // date: new Date()
        },
        {
          id: 2,
          name: 'Muhammad Ikbal',
          phone: '081370607060',
          email: 'ikbalbale21@gmail.com',
          note: 'WOW!',
          // date: new Date()
        },
        {
          id: 3,
          name: 'Muhammad Ikbal',
          phone: '081370607060',
          email: 'ikbalbale21@gmail.com',
          note: 'WOW!',
          // date: new Date()
        },
        {
          id: 4,
          name: 'Muhammad Ikbal',
          phone: '081370607060',
          email: 'ikbalbale21@gmail.com',
          note: 'WOW!',
          // date: new Date()
        },
        {
          id: 5,
          name: 'Muhammad Ikbal',
          phone: '081370607060',
          email: 'ikbalbale21@gmail.com',
          note: 'WOW!',
          // date: new Date()
        },
      ];
      
      this.storage.setItem('guestBook', JSON.stringify(this.guestBooks));
    } else {
      this.guestBooks = JSON.parse(data as string)
    }
  }

  get selectedGuestBook(): GuestBook {
    return this.guestBook;
  }

  set selectedGuestBook(guestBook: GuestBook) {
    this.guestBook = guestBook;
  }

}
