import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pathToFileURL } from 'url';
import { AddcourseComponent } from './addcourse/addcourse.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { EdituserComponent } from './edituser/edituser.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { StudentregisterComponent } from './studentregister/studentregister.component';
import { ZoomComponent } from './zoom/zoom.component';
import { CalificarComponent } from './calificar/calificar.component';


const routes: Routes = [
  {path:'zoom',component:ZoomComponent},
  {path:'editar/:idUsuario', component:EdituserComponent },
  {path:'agregar-clase', component:AddcourseComponent},
  {path:'horario',component:ScheduleComponent},
  {path:'buscador', component:BuscadorComponent},
  {path:'agendar/:idCurso', component:StudentregisterComponent},
  {path:'calificar/:idMaestro/:idAsesoria', component:CalificarComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
