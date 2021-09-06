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
  // date!: Date;

  constructor() { }

  ngOnInit(): void {
    const data = this.storage.getItem('guestBook');
    // this.date = new Date()
    // const dateTime = this.date.toISOString();

    if (!data) {
      this.guestBooks = [
        {
          id: 1,
          name: 'Ikbal',
          phone: '081370609353',
          email: 'muhammadikbal21@gmail.com',
          note: 'Amazing!',
          // date: dateTime
        },
        {
          id: 2,
          name: 'Muhammad Ikbal',
          phone: '081370607060',
          email: 'ikbalbale21@gmail.com',
          note: 'WOW!',
          // date: dateTime
        },
        {
          id: 3,
          name: 'Muhammad Ikbal',
          phone: '081370607060',
          email: 'ikbalbale21@gmail.com',
          note: 'WOW!',
          // date: dateTime
        },
        {
          id: 4,
          name: 'Muhammad Ikbal',
          phone: '081370607060',
          email: 'ikbalbale21@gmail.com',
          note: 'WOW!',
          // date: dateTime
        },
        {
          id: 5,
          name: 'Muhammad Ikbal',
          phone: '081370607060',
          email: 'ikbalbale21@gmail.com',
          note: 'WOW!',
          // date: dateTime
        },
      ];
      
      this.storage.setItem('guestBook', JSON.stringify(this.guestBooks));
    } else {
      this.guestBooks = JSON.parse(data as string)
    }
  }

  private saveGuestBook(guestBook: GuestBook): void {
    if (guestBook.id) {
      // logic untuk mengedit data
      this.guestBooks = this.guestBooks.map((item) => { // 1. harus dimapping dulu array nya
        if (item.id === guestBook.id) { // 2. lalu di cek object dari array tadi dengan object dari parameter method saveTodo (mencocokan dengan id nya), jika kedua objectnya sama
          item = { // 3. Mengupdate objectnya dengan data baru menggunakan spread operator (mengcopy object yang lama)
            ...item,
            ...guestBook,
          };
        }
        return item
      });
    } else {
      guestBook.id = this.guestBooks.length + 1;
      this.guestBooks = this.guestBooks.concat([guestBook]);
    }

    this.storage.setItem('guestBook', JSON.stringify(this.guestBooks)); // meng-set storage nya agar tetap ada objectnya ketika baru ditambah todolistnya
  }

  get selectedGuestBook(): GuestBook {
    return this.guestBook;
  }

  set selectedGuestBook(guestBook: GuestBook) {
    this.guestBook = guestBook;
  }

  get formData(): GuestBook {
    return this.guestBook;
  }

  set formData(guestBook: GuestBook) {
    this.saveGuestBook(guestBook);
  }

}
