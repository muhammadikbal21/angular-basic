import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {
  private balance: number | null = null;
  private balanceSubject: Subject<number> = new Subject<number>();

  open(): Observable<void> {
    // membuka rekening
    return new Observable<void>((observer: Observer<void>) => {
      this.balance = 0;
      this.balanceSubject.next(this.balance)
      observer.next();
    })
  }

  close(): Observable<void> {
    // tutup rekening
    return new Observable<void>((observer: Observer<void>) => {
      if (this.balance === null) observer.error(new Error('Your Account is not yet opened.'))
      else {
        this.balance = null;
        observer.next();
      }
    })
  }

  withdraw(amount: number): Observable<number> {
    // penarikan tunai dari rekening
    return new Observable<number>((observer: Observer<number>) => {
      if (this.balance === null) observer.error(new Error('Your Account is not yet opened.'))
      else if (amount <= 0) observer.error(new Error('Amount must be higher than 0.'))
      else if (this.balance && this.balance < amount) observer.error(new Error('Withdraw amount cannot exceed your balance'));
      else {
        this.balance = (this.balance || 0) - amount;
        this.balanceSubject.next(this.balance);
        observer.next(amount);
      }
    })
  }

  deposit(amount: number): Observable<void> {
    // setor tunai
    return new Observable<void>((observer: Observer<void>) => {
      if (this.balance === null) observer.error(new Error('Your Account is not yet opened.'))
      else if (amount <= 0) observer.error(new Error('Amount must be higher than 0.'))
      else {
        this.balance = (this.balance || 0) + amount;
        this.balanceSubject.next(this.balance);
        observer.next();
      }
    })
  }
  
  checkBalance(): Observable<number> {
    // cek saldo
    if (this.balance === null) throw new Error('Your Account is not yet opened.')

    return this.balanceSubject.asObservable();
  }
}
