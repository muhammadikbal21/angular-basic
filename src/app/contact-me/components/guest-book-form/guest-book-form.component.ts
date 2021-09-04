import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guest-book-form',
  templateUrl: './guest-book-form.component.html',
  styleUrls: ['./guest-book-form.component.scss']
})
export class GuestBookFormComponent implements OnInit {
  title: string = 'Guest Book Form';

  constructor() { }

  ngOnInit(): void {
  }

}
