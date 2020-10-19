import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Curso } from 'src/models/curso';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dataBinding } from '@syncfusion/ej2-angular-schedule';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { MsgService } from 'src/services/msg.service';
import { forEachLeadingCommentRange } from 'typescript';

@Component({
  selector: 'app-studentregister',
  templateUrl: './studentregister.component.html',
  styleUrls: ['./studentregister.component.css']
})
export class StudentregisterComponent implements OnInit {
  currentRate = 5;
  cursos: Curso[] = new Array<Curso>()
  curso: Curso;
  breakpoint;


  formSesiones: FormGroup
  constructor(private db: AngularFirestore, private activeRoute: ActivatedRoute, public dialog: MatDialog, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.getCurso();

    this.formSesiones = this.fb.group({
      sesiones: ['0']
    })

    this.breakpoint = (window.innerWidth <= 900) ? 1 : 2;
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

 /* getSesionesDisponibles() {
    let sum = 0;
    console.log("entro al método");
    this.db.collection('horario').get().subscribe((res) => {
      res.docs.forEach((item) => {
        let h = item.data();
        
        h.id = item.id
        if (h.id == this.data.curso.user.uid) {

         sum=sum+h.lunes.length;
         sum=sum+h.martes.length;
         sum=sum+h.miercoles.length;
         sum=sum+h.jueves.length;
         sum=sum+h.viernes.length;
         sum=sum+h.sabado.length;
         sum=sum+h.domingo.length;
      
        }
      })
    })
    console.log('sum' + sum);
    return sum;
  }*/
 


  openDialog(): void {

    const dialogRef = this.dialog.open(dialogStudent, {
      width: '1000px',
      height: '500px',
      data: { curso: this.curso, sesiones: this.formSesiones.value.sesiones }
    });
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 900) ? 1 : 2;
  }
  pagar() {
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

  tlunes:Array<any>= new Array();
  tmartes:Array<any>= new Array();
  tmiercoles:Array<any>= new Array();
  tjueves:Array<any>= new Array();
  tviernes:Array<any>= new Array();
  tsabado:Array<any>= new Array();
  tdomingo:Array<any>= new Array();
  toggle=true;
  constructor(
    public dialogRef: MatDialogRef<dialogStudent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private db: AngularFirestore,private auth: AngularFireAuth, private msg:MsgService, private router:Router) { }
  ngOnInit(): void {
    this.getHorario()
    this.setToggle();
  }
  
  enableDisableRule(dia,index) {
    //this.toggle = !this.toggle;
    switch(dia){
      case 'lunes': {
        this.tlunes[index] = !this.tlunes[index]; 
        break;
      }
      case 'martes': {
        this.tmartes[index] = !this.tmartes[index]; 
        break;
      }
      case 'miercoles':{
        this.tmiercoles[index] = !this.tmiercoles[index]; 
        break;
      }
      case 'jueves':{
        this.tjueves[index] = !this.tjueves[index];
        break;
      }
      case 'viernes':{
        this.tviernes[index] = !this.tviernes[index];
        break;
      }
      case 'sabado':{
        this.tsabado[index] = !this.tsabado[index];
        break;
      }
      case 'domingo':{
        this.tdomingo[index] = !this.tdomingo[index];
        break;
      }
      
   }
    
  }

  setToggle(){
    for(let item of this.clunes){
      this.tlunes.push(true);
    }
    for(let item of this.cmartes){
      this.tmartes.push(true);
    }
    for(let item of this.cmiercoles){
      this.tmiercoles.push(true);
    }
    for(let item of this.cjueves){
      this.tjueves.push(true);
    }
    for(let item of this.cviernes){
      this.tviernes.push(true);
    }
    for(let item of this.csabado){
      this.tsabado.push(true);
    }
    for(let item of this.cdomingo){
      this.tdomingo.push(true);
    }
  }

  horaClick(hora,dia,nombre,index){
    switch(nombre){
      case 'lunes':{
        if(!this.tlunes[index]){
          if(this.data.sesiones<=0){
            this.msg.msgError('Error','Ya te has inscrito a todas tus sesiones seleccionadas');
          }
          else{
            this.prueba(hora,dia);
            this.enableDisableRule(nombre,index);
          }
        }
        else{
          this.data.sesiones++;
          this.enableDisableRule(nombre,index);
          const listindex = this.asesorias.indexOf({dia,hora});
          if(listindex !==-1 ){
            this.asesorias.splice(listindex,1);
          }
        }
        break;
      }
      case 'martes':{
        if(!this.tmartes[index]){
          if(this.data.sesiones<=0){
            this.msg.msgError('Error','Ya te has inscrito a todas tus sesiones seleccionadas');
          }
          else{
            this.prueba(hora,dia);
            this.enableDisableRule(nombre,index);
          }
        }
        else{
          this.data.sesiones++;
          this.enableDisableRule(nombre,index);
          const listindex = this.asesorias.indexOf({dia,hora});
          if(listindex !==-1 ){
            this.asesorias.splice(listindex,1);
          }
        }
        break;
      }
      case 'miercoles':{
        if(!this.tmiercoles[index]){
          if(this.data.sesiones<=0){
            this.msg.msgError('Error','Ya te has inscrito a todas tus sesiones seleccionadas');
          }
          else{
            this.prueba(hora,dia);
            this.enableDisableRule(nombre,index);
          }
        }
        else{
          this.data.sesiones++;
          this.enableDisableRule(nombre,index);
          const listindex = this.asesorias.indexOf({dia,hora});
          if(listindex !==-1 ){
            this.asesorias.splice(listindex,1);
          }
        }
        break;
      }
      case 'jueves':{
        if(!this.tjueves[index]){
          if(this.data.sesiones<=0){
            this.msg.msgError('Error','Ya te has inscrito a todas tus sesiones seleccionadas');
          }
          else{
            this.prueba(hora,dia);
            this.enableDisableRule(nombre,index);
          }
        }
        else{
          this.data.sesiones++;
          this.enableDisableRule(nombre,index);
          const listindex = this.asesorias.indexOf({dia,hora});
          if(listindex !==-1 ){
            this.asesorias.splice(listindex,1);
          }
        }
        break;
      }
      case 'viernes':{
        if(!this.tviernes[index]){
          if(this.data.sesiones<=0){
            this.msg.msgError('Error','Ya te has inscrito a todas tus sesiones seleccionadas');
          }
          else{
            this.prueba(hora,dia);
            this.enableDisableRule(nombre,index);
          }
        }
        else{
          this.data.sesiones++;
          this.enableDisableRule(nombre,index);
          const listindex = this.asesorias.indexOf({dia,hora});
          if(listindex !==-1 ){
            this.asesorias.splice(listindex,1);
          }
        }
        break;
      }
      case 'sabado':{
        if(!this.tsabado[index]){
          if(this.data.sesiones<=0){
            this.msg.msgError('Error','Ya te has inscrito a todas tus sesiones seleccionadas');
          }
          else{
            this.prueba(hora,dia);
            this.enableDisableRule(nombre,index);
          }
        }
        else{
          this.data.sesiones++;
          this.enableDisableRule(nombre,index);
          const listindex = this.asesorias.indexOf({dia,hora});
          if(listindex !==-1 ){
            this.asesorias.splice(listindex,1);
          }
        }
        break;
      }
      case 'domingo':{
        if(!this.tdomingo[index]){
          if(this.data.sesiones<=0){
            this.msg.msgError('Error','Ya te has inscrito a todas tus sesiones seleccionadas');
          }
          else{
            this.prueba(hora,dia);
            this.enableDisableRule(nombre,index);
          }
        }
        else{
          this.data.sesiones++;
          this.enableDisableRule(nombre,index);
          var date=new Date();
          var d = new Date().getDay();
          date.setDate(date.getDate()+(dia-d));
          //date getdate y getmonth
          const listindex = this.asesorias.indexOf({fecha:date,hora:hora});
          console.log('index' + listindex);
          if(listindex !==-1 ){
            this.asesorias.splice(listindex,1);
          }
        }
        break;
      }
    }
    for(let item of this.asesorias){
      console.log('item' + item.fecha + item.hora);
      //for y q se detenga cuando sean iguales
      console.log(this.asesorias.indexOf({fecha:item.fecha,hora:item.hora}));
    }
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

          this.clunes = h.lunes;
          this.cmartes = h.martes;
          this.cmiercoles = h.miercoles;
          this.cjueves = h.jueves;
          this.cviernes = h.viernes;
          this.csabado = h.sabado;
          this.cdomingo = h.domingo;

        }
      })
    })
  }

  prueba(hour, dia) {
    var fecha = new Date();
    var d = new Date().getDay();
    if (this.data.sesiones > 0) {

      if (d < dia) {
        fecha.setDate(fecha.getDate() + (dia - d))

        this.asesorias.push({
          fecha: fecha,
          hora: hour
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
   this.db.collection('asesorias').doc(user.uid +'@'+this.data.curso.id).set({

     dias:this.asesorias
   }).finally(()=>{
     console.log("Guardado exitoso");
     this.msg.msgSuccess('Registrado', 'Asesorías registradas exitosamente');
     
   }).catch((err)=>{
     console.log(err);
     this.msg.msgError('Error',err);
     
   })
  
}else{
  //Aqui se puede poner una alerta 
  console.log("No se han selecionado todas las clases")
 
}
    
  }

 

}
