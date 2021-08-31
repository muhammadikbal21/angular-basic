import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeComponent } from './resume/resume.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full', // mirip exact di react js, pathMatch mempunyai 2 value yaitu full(exact true di react js) dan prefix(exact false di react js)
    component: ResumeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
