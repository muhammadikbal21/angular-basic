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
}
