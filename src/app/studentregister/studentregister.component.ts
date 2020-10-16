import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Curso } from 'src/models/curso';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dataBinding } from '@syncfusion/ej2-angular-schedule';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Component({
  selector: 'app-studentregister',
  templateUrl: './studentregister.component.html',
  styleUrls: ['./studentregister.component.css']
})
export class StudentregisterComponent implements OnInit {
  currentRate = 5;
  cursos: Curso[] = new Array<Curso>()
  curso: Curso;

 
  formSesiones:FormGroup
  constructor(private db: AngularFirestore, private activeRoute: ActivatedRoute, public dialog: MatDialog, private fb:FormBuilder, private http:HttpClient) { }

  ngOnInit(): void {
    this.getCurso();
    
    this.formSesiones=this.fb.group({
      sesiones:['0']
    })

  }
  getCurso() {
    var id = this.activeRoute.snapshot.params.idCurso;
    this.db.collection('cursos').get().subscribe((res) => {
      res.docs.forEach((item) => {
        let c = item.data() as Curso;
        c.id = item.id
        if (c.id == id) {
          this.curso = c;
          console.log("si lo es")
        }

      })
    })
  }

 
 
  openDialog(): void {

    const dialogRef = this.dialog.open(dialogStudent, {
      width: '1000px',
      height:'500px',
      data: { curso: this.curso,sesiones:this.formSesiones.value.sesiones}
    });
  }
  
}
@Component({
  selector: 'dialogStudent',
  templateUrl: 'dialogStudent.html',
  styleUrls: ['./dialogStudent.css'],
})
export class dialogStudent implements OnInit {
  clunes:Array<any>=new Array();
  cmartes:Array<any>=new Array();
  cmiercoles:Array<any>=new Array();
  cjueves:Array<any>=new Array();
  cviernes:Array<any>=new Array();
  csabado:Array<any>=new Array();
  cdomingo:Array<any>=new Array();

  asesorias:Array<any>=new Array();
  constructor(
    public dialogRef: MatDialogRef<dialogStudent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private db: AngularFirestore,private auth: AngularFireAuth) { }
  ngOnInit(): void {
    this.getHorario()
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getHorario() {
    this.db.collection('horario').get().subscribe((res) => {
      res.docs.forEach((item) => {
        let h = item.data();
 
        h.id = item.id
        if (h.id == this.data.curso.user.uid) {

         this.clunes=h.lunes;
         this.cmartes=h.martes;
         this.cmiercoles=h.miercoles;
         this.cjueves=h.jueves;
         this.cviernes=h.viernes;
         this.csabado=h.sabado;
         this.cdomingo=h.domingo;
      
        }
      })
    })
  }

  prueba(hour,dia){
    var fecha=new Date();
    var d=new Date().getDay();
    if(this.data.sesiones>0){

      if(d<dia){
        fecha.setDate(fecha.getDate()+(dia-d))
        
        this.asesorias.push({
          fecha:fecha,
          hora:hour
        })

      }
      this.data.sesiones--;
   
    }
   
    
  }

  save(){
if (this.data.sesiones==0){
  var user=this.auth.auth.currentUser;
  console.log(this.asesorias)
  //para identificar la asesoria se le suma el id del usuario con la id  del curso
   this.db.collection('asesorias').doc(user.uid+this.data.curso.id).set({

     dias:this.asesorias
   }).finally(()=>{
     console.log("Guardado exitoso");
     
   }).catch((err)=>{
     console.log(err);
     
   })
  
}else{
  //Aqui se puede poner una alerta 
  console.log("No se a selecionado todas las clases")
 
}
    
  }
  pay(){
  
  }
}
