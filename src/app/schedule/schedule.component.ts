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
  visible = false;
  clunes: any[] = new Array();
  cmartes: any[] = new Array();
  cmiercoles: any[] = new Array();
  cjueves: any[] = new Array();
  cviernes: any[] = new Array();
  csabado: any[] = new Array();
  cdomingo: any[] = new Array();


  dataSource = Default

  constructor(private db: AngularFirestore, private msg: MsgService, private auth: AngularFireAuth) { }

  ngOnInit(): void {
    Default = this.getData()
  }
  //todos los change son para designar si el instructor va a dar en a esa hora
  changeLunes(valor) {
    if (!valor.lunes) {
      this.clunes.push(valor.hora)

    } else {
      this.clunes.splice(this.clunes.indexOf(valor.hora), 1)
    }
    valor.lunes = !valor.lunes
  }
  changeMartes(valor) {
    if (!valor.martes) {
      this.cmartes.push(valor.hora)

    } else {
      this.cmartes.splice(this.cmartes.indexOf(valor.hora), 1)
    }
    valor.martes = !valor.martes
  }
  changeMiercoles(valor) {

    if (!valor.miercoles) {
      this.cmiercoles.push(valor.hora)

    } else {
      this.cmiercoles.splice(this.cmiercoles.indexOf(valor.hora), 1)
    }
    valor.miercoles = !valor.miercoles
  }
  changeJueves(valor) {

    if (!valor.jueves) {
      this.cjueves.push(valor.hora)

    } else {
      this.cjueves.splice(this.cjueves.indexOf(valor.hora), 1)
    }
    valor.jueves = !valor.jueves
  }
  changeViernes(valor) {
    if (!valor.viernes) {
      this.cviernes.push(valor.hora)

    } else {
      this.cviernes.splice(this.cviernes.indexOf(valor.hora), 1)
    }
    valor.viernes = !valor.viernes
  }
  changeSabado(valor) {
    if (!valor.sabado) {
      this.csabado.push(valor.hora)

    } else {
      this.csabado.splice(this.csabado.indexOf(valor.hora), 1)
    }
    valor.sabado = !valor.sabado
  }
  changeDomingo(valor) {
    if (!valor.domingo) {
      this.cdomingo.push(valor.hora)

    } else {
      this.cdomingo.splice(this.cdomingo.indexOf(valor.hora), 1)
    }
    valor.domingo = !valor.domingo
  }
  save() {
    var u = this.auth.auth.currentUser;

    this.db.collection('horario').doc(u.uid).set({

      lunes: this.clunes,
      martes: this.cmartes,
      miercoles: this.cmiercoles,
      jueves: this.cjueves,
      viernes: this.cviernes,
      sabado: this.csabado,
      domingo: this.cdomingo
    }).then(() => {
      //horario:this.dataSource
      this.msg.msgSuccess('Registrado', 'Horario registrado exitosamente');


    }).catch((error) => {
      console.log(error)
      this.msg.msgError('Error', error);
    })
  }
  //a reparar esto, deberia traer la informacion de las asesorias pero llegan en desorden
  getData(): Array<any> {
    var user = this.auth.auth.currentUser;

    var hor: any
    var data: any;
    this.db.collection('usuarios').get().subscribe((res) => {
      console.log("entro en data")
      res.docs.forEach((item) => {
        let u = item.data() as Usuario;
        if (u.uid == user.uid) {
          console.log("entro en id")
          u.id = item.id;
          u.ref = item.ref;
          if (u.horario != undefined) {
            hor = u.horario;
            console.log("entro en horario")
            hor.forEach((element) => {
              var dato = { hora: element.hora, lunes: element.lunes, martes: element.martes, miercoles: element.miercoles, jueves: element.jueves, viernes: element.viernes, sabado: element.sabado, domingo: element.domingo }
              console.log(dato)

            });

            console.log(data)
          } else {
            data = Default

          }
        }



      })
    })

    return data
  }
  
}
