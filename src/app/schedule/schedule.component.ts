import { Component, OnInit } from '@angular/core';
// import { DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { AngularFirestore } from '@angular/fire/firestore';
import { MsgService } from 'src/services/msg.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from 'src/models/usuario';


var Default = [
  { hora: '0:00', lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false },
  { hora: '1:00', lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false },
  { hora: '2:00', lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false },
  { hora: '3:00', lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false },
  { hora: '4:00', lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false },
  { hora: '5:00', lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false },
  { hora: '6:00', lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false },
  { hora: '7:00', lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false },
  { hora: '8:00', lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false },
  { hora: '9:00', lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false },
  { hora: '10:00', lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false },
  { hora: '11:00', lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false },
  { hora: '12:00', lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false },
  { hora: '13:00', lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false },
  { hora: '14:00', lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false },
  { hora: '15:00', lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false },
  { hora: '16:00', lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false },
  { hora: '17:00', lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false },
  { hora: '18:00', lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false },
  { hora: '19:00', lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false },
  { hora: '20:00', lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false },
  { hora: '21:00', lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false },
  { hora: '22:00', lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false },
  { hora: '23:00', lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false },
  { hora: '24:00', lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false },
];

@Component({
  // providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  selector: 'app-schedule',
  // template: `<ejs-schedule> </ejs-schedule>`,
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],

})

export class ScheduleComponent implements OnInit {
  displayedColumns: string[] = ['hora', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

  dataSource=Default

  
  constructor(private db: AngularFirestore,private auth: AngularFireAuth) { }

  ngOnInit(): void {
   Default= this.getData()
  }
  changeLunes(valor) {
   
    valor.lunes = !valor.lunes
  }
  changeMartes(valor) {
    
    valor.martes = !valor.martes
  }
  changeMiercoles(valor) {

    valor.miercoles = !valor.miercoles
  }
  changeJueves(valor) {
  
    valor.jueves = !valor.jueves
  }
  changeViernes(valor) {

    valor.viernes = !valor.viernes
  }
  changeSabado(valor) {

    valor.sabado = !valor.sabado
  }
  changeDomingo(valor){

valor.domingo=!valor.domingo
}
save(){
  var user=this.auth.auth.currentUser;
  this.db.collection('usuarios').doc(user.uid).update({
    horario:this.dataSource
})
}
getData():Array<any>{
  var user=this.auth.auth.currentUser;
  
  var hor:any
  this.db.collection('usuarios').get().subscribe((res)=>{
    console.log("entro en data")
    res.docs.forEach((item)=>{
      let u= item.data() as Usuario;
      if(u.uid==user.uid){
        console.log("entro en id")
        u.id=item.id;
        u.ref=item.ref;
        if(u.horario!=undefined){
          hor= u.horario;
          console.log(hor)
          console.log("entro en horario")
        }else{
          hor= Default
          console.log(hor)
        }
      }
      
     
   
    })
  })
  console.log(hor)
  return hor
}
}
