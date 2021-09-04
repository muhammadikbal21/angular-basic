import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { GuestBook } from '../models/guest-book.interface';

const GUEST_BOOK: string = 'guestBook';

@Injectable()
export class GuestBookService {
  private readonly storage: Storage = sessionStorage;
  private readonly guestBookSubject: Subject<boolean> = new Subject<boolean>();
  
  notify(): Observable<boolean> {
    return this.guestBookSubject.asObservable();
  }

  findAll(): Observable<GuestBook[]> {
    return new Observable<GuestBook[]>((observer: Observer<GuestBook[]>) => {
      const guestBookValue: string = this.storage.getItem(GUEST_BOOK) as string;

      try {
        const guestBooks: GuestBook[] = guestBookValue ? JSON.parse(guestBookValue) : [];
        observer.next(guestBooks);
      } catch(error) {
        observer.error(new Error('Unable to parse guest books list data.'));
      }
    })
  }

  delete(id: number): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      const guestBookValue: string = this.storage.getItem(GUEST_BOOK) as string;
  
      try {
        let guestBooks: GuestBook[] = guestBookValue ? JSON.parse(guestBookValue) : [];

        guestBooks = guestBooks.filter((guestBook) => guestBook.id !== id);
  
        this.storage.setItem(GUEST_BOOK, JSON.stringify(guestBooks));

        observer.next();
        this.guestBookSubject.next(true);
      } catch(error: any) {
        observer.error(new Error(`Unable to delete guest book., ${error.message}`));
      }
    })

  }
}
