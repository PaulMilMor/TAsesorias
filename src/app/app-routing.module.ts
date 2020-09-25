import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EdituserComponent } from './edituser/edituser.component';
import { ZoomComponent } from './zoom/zoom.component';


const routes: Routes = [
  {path:'zoom',component:ZoomComponent},
  {path:'editar/:idUsuario', component:EdituserComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
