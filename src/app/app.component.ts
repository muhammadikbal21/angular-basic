import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertMessage } from './shared/models/alert-message.model';
import { SessionService } from './shared/services/session.service';

@Component({
  selector: 'app-root', // ini akan menjadi tag selector pada html
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title : string = environment.appName;
  message?: AlertMessage | null;

  constructor(private readonly sessionService: SessionService) {}

  private getFlashMessage(): void {
    const flashMessage: string = this.sessionService.getFlash();

    console.log('message: ', flashMessage);

    if (flashMessage) {
      this.message = JSON.parse(flashMessage);
    } else {
      this.message = null;
    }
    
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getFlashMessage();
    }, 1_000);
  }
}
