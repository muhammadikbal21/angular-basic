import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../../services/session.service';

enum LoginFormField {
  USERNAME = 'username',
  PASSWORD = 'password'
}

@Component({
  selector: 'app-shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  form: FormGroup = new FormGroup({
    [LoginFormField.USERNAME]: new FormControl(null, [ Validators.required ]),
    [LoginFormField.PASSWORD]: new FormControl(null, [ Validators.required ])
  });
  formField: typeof LoginFormField = LoginFormField;
  authorized: boolean = false;

  constructor(
    private readonly sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.authorized = (this.sessionService.getSession() !== null);
  }

  login(): void {
    const formData = this.form.value;

    if (
      this.form.valid && 
      formData[LoginFormField.USERNAME] === 'demo' &&
      formData[LoginFormField.PASSWORD] === 'demo') {
      this.sessionService.setSession();
      window.location.reload();
    }
  }

}
