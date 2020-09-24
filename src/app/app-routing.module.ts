import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZoomComponent } from './zoom/zoom.component';


const routes: Routes = [
  {path:'zoom',component:ZoomComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
