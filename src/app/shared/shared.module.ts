import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BsButtonDirective } from './directives/bs-button.directive';
import { BsInputDirective } from './directives/bs-input.directive';
import { TodoPipe } from './pipes/todo.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { SessionService } from './services/session.service';
import { HttpClientService } from './services/http-client.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const components = [
  HeaderComponent,
  FooterComponent,
];

const directives = [
  BsButtonDirective,
  BsInputDirective,
];

const pipes = [
  TodoPipe,
  JoinPipe
];

const services = [
  SessionService,
  HttpClientService
]

@NgModule({
  declarations: [
    ...components,
    ...directives,
    ...pipes
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ...components,
    ...directives,
    ...pipes
  ],
  providers: [
    ...services
  ]
})
export class SharedModule { }
