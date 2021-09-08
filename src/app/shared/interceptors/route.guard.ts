import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertMessage } from '../models/alert-message.model';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate, CanActivateChild {
  constructor(
    private readonly router: Router,
    private readonly sessionService: SessionService
  ) {}

  canActivateChild(): boolean {
    return this.authorize();
  }

  canActivate(): boolean {
    return this.authorize();
  }

  private authorize(): boolean {
    const authorized: boolean = (sessionStorage.getItem('authorized') !== null);

    if (!authorized) {
      const message: AlertMessage = { status: 'warning', text: 'Please login before continuing to that page.'}
      this.sessionService.setFlash(JSON.stringify(message));
      this.router.navigateByUrl('/');
    }

    return authorized;
  }
  
}
