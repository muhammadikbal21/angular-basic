import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeComponent } from './resume/resume.component';

const routes: Routes = [
  // di angular secara otomatis dibuatkan tanda slash (/) pada path nya
  {
    path: '',
    pathMatch: 'full', // mirip exact di react js, pathMatch mempunyai 2 value yaitu full(exact true di react js) dan prefix(exact false di react js)
    component: ResumeComponent // ini dinamakan eager load
  },
  {
    path: 'demo',
    loadChildren: () => import('./demo/demo.module')
      .then((module) => module.DemoModule) // ini dinamakan lazy load module
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
