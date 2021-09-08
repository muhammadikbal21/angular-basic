import { Injectable } from '@angular/core';

/**
 * Semua class yang masuk dependency injection harus menggunakan decorator @Injectable()
 * Harus included di NgModule providers
 */
@Injectable()
export class SessionService {
  private readonly storage: Storage = sessionStorage;

  /**
   * Flash Message:
   * - ketika di set, masuk sessionStorage,
   * - ketika di get, valuenya akan hilang dari sessionStorage setelah di return
   */

  public getFlash(): string {
    const message: string = this.storage.getItem('flash') as string;

    this.storage.removeItem('flash');

    return message;
  }

  public setFlash(value: string): void {
    this.storage.setItem('flash', value);
  }

  public setSession(): void {
    this.storage.setItem('authorized', 'true');
  }

  public getSession(): string {
    return this.storage.getItem('authorized') as string;
  }
}
