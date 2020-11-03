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

  usuario: Usuario
  constructor(private ar: ActivatedRoute, public dialog: MatDialog, private msg: MsgService, private db: AngularFirestore, private auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.getUser()
    this.getCourses()
    console.log(this.cursos);

  }
  getUser() {
    this.db.collection('usuarios').doc(this.ar.snapshot.params.idMaestro).get().forEach((res) => {
      this.usuario = res.data() as Usuario
      console.log(this.usuario)
    })
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(reportProfile, {
      width: '500px',
      height: '250px',
      //Para en enviar informacion a un dialogo se usa la variable data (teniendo en cuenta que existe una llamada asi tambien en el dialogo)
      data: { maestro: this.ar.snapshot.params.idMaestro,
      alumno:this.auth.auth.currentUser.uid }
    });

  }
exitsReport(){
 var reports:Array<any>=new Array()
  this.db.collection('reportes').get().subscribe((res)=>{
    
  res.docs.forEach((item)=>{
    
    if(item.data().maestro==this.ar.snapshot.params.idMaestro && item.data().alumno==this.auth.auth.currentUser.uid){
     reports.push(item.data())
     console.log('eee')
     console.log(reports.length);
      

if(reports.length>0){

  this.msg.msgWarning('Reporte','Ya has reportado a este maestro')
 
}else{
  console.log("aqui");
  this.openDialog()
}
    }
  })

}) 
console.log(reports.length);

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
  formReporte: FormGroup


  constructor(
    public dialogRef: MatDialogRef<reportProfile>,
    @Inject(MAT_DIALOG_DATA) public data: any, private db: AngularFirestore, private msg: MsgService, private router: Router, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.formReporte = this.fb.group({
      maestro: [''],
      alumno: [''],
      reporte: ['', Validators.required]

    })


  }


  saveReport() {
    this.formReporte.value.maestro=this.data.maestro
    this.formReporte.value.alumno=this.data.alumno
    this.db.collection('reportes').add(this.formReporte.value).finally(() => {
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



}
