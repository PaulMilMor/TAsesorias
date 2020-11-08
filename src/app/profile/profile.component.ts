import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/models/curso';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from 'src/models/usuario';
import { MsgService } from 'src/services/msg.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { report } from 'process';
import { newArray } from '@angular/compiler/src/util';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentRate = 5
  cursos: Array<Curso> = new Array();
  
  instructor = 'instructor'
  alumno = 'alumno'
  administrador = 'administrador'
  usuario: Usuario
  usuarios: Usuario
  isValid: boolean = false
  isCollapsed: boolean = false;
  constructor(private ar: ActivatedRoute, public dialog: MatDialog, private msg: MsgService, private db: AngularFirestore, private auth: AngularFireAuth,private fb: FormBuilder) { }

  ngOnInit(): void {
    
    this.getUser()
    this.getUsers()
    this.getCourses()
    console.log(this.cursos);
    //this.getUsers()
  }
  getUser() {
    this.db.collection('usuarios').doc(this.ar.snapshot.params.idMaestro).get().forEach((res) => {
      this.usuario = res.data() as Usuario
      console.log(this.usuario)
    })
  }
  getUsers() {
    this.db.collection('usuarios').get().subscribe((res) => {
      res.docs.forEach((item) => {
        let u = item.data() as Usuario
        if (u.uid == this.auth.auth.currentUser.uid) {
          this.usuarios = u;
          this.isValid = true
          console.log(this.isValid)
        } else {
          console.log("no existe");
        }
      })
    })
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(reportProfile, {
      width: '500px',
      height: '250px',
      //Para en enviar informacion a un dialogo se usa la variable data (teniendo en cuenta que existe una llamada asi tambien en el dialogo)
      data: {
        maestro: this.ar.snapshot.params.idMaestro,
        alumno: this.auth.auth.currentUser.uid
      }
    });

  }

  getCourses() {
    this.db.collection('cursos').get().subscribe((res) => {
      res.docs.forEach((item) => {
        var curso = item.data() as Curso
        if (curso.user.uid == this.ar.snapshot.params.idMaestro) {
          curso.id = item.id
          this.db.collection('evaluaciones').get().subscribe((res2) => {
            var e = new Array<any>();
            var E: any = 0
            res2.docs.forEach((item2) => {

              if (item2.id.split('@')[1] == curso.id) {
                e.push(item2.data().calificacion)
                E = E + item2.data().calificacion
              }
            })
            curso.evaluaciones = E / e.length;
            this.cursos.push(curso);

          })
        }
      })
    })
  }

}
@Component({
  selector: 'reportProfile',
  templateUrl: 'reportProfile.html',

})
export class reportProfile implements OnInit {
  formReporte: FormGroup;
  allreports:Array<any>=new Array();

  constructor(
    public dialogRef: MatDialogRef<reportProfile>,
    @Inject(MAT_DIALOG_DATA) public data: any, private db: AngularFirestore, private msg: MsgService, private router: Router, private fb: FormBuilder, private ar: ActivatedRoute, private auth: AngularFireAuth) { }
  ngOnInit(): void {
    this.formReporte = this.fb.group({
      maestro: [''],
      alumno: [''],
      reporte: ['', Validators.required]

    })

    this.exitsReport()


  }


  saveReport() {

    this.formReporte.value.maestro = this.data.maestro
    this.formReporte.value.alumno = this.data.alumno


    this.db.collection('reportes').add(this.formReporte.value).finally(() => {
      console.log('entra aqui');
      
if(this.allreports.length==4){
  this.db.collection('usuarios').doc(this.data.maestro).update({
    ban:true
  })

}
      this.msg.msgSuccess('Exito', 'Reporte creado correctamente')
   
      this.dialogRef.close();
    }).catch((err) => {
      console.log(err)
      this.msg.msgError('Error', 'Algo salio mal')
    })

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  exitsReport() {
    var reports: Array<any> = new Array()
    this.db.collection('reportes').get().subscribe((res) => {
  

      res.docs.forEach((item) => {
        if(item.data().maestro == this.data.maestro) return this.allreports.push(item);
        if (item.data().maestro == this.data.maestro && item.data().alumno == this.data.alumno) {
          reports.push(item.data())
          console.log('eee')
          console.log(reports.length);


          if (reports.length > 0) {
            this.msg.msgError('Reporte', 'Ya has reportado a este maestro')
            this.dialogRef.close();
            console.log('exite');

          } else {

          }
        }
      })

    })
    console.log(reports.length);

  }
}
