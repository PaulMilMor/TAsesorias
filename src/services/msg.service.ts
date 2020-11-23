import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class MsgService {

  constructor() { }
  msgSuccess(title:string, text:string){
 Swal.fire({
   title:title,
   text:text,
   icon:"success"
 })
 
  }
  msgWarning(title:string, text:string){
    Swal.fire({
      title:title,
      text:text,
      icon:"warning"
    })
  }
  msgError(title:string, text:string){
    Swal.fire({
      title:title,
      text:text,
      icon:"error"
    })
  }
  msgAlerta(title:string, text: string,showCancelButton:boolean){
  Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: showCancelButton,//true
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Asesoria eliminada',
        'Your file has been deleted.',
        'success'
      )
    }
  })
  
}
}
