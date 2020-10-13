import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Curso } from 'src/models/curso';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dataBinding } from '@syncfusion/ej2-angular-schedule';
@Component({
  selector: 'app-studentregister',
  templateUrl: './studentregister.component.html',
  styleUrls: ['./studentregister.component.css']
})
export class StudentregisterComponent implements OnInit {
  currentRate = 5;
  cursos: Curso[] = new Array<Curso>()
  curso: Curso;
  cantidadCursos:number
  constructor(private db: AngularFirestore, private activeRoute: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCurso();
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
    console.log(this.cantidadCursos)
    const dialogRef = this.dialog.open(dialogStudent, {
      width: '1000px',
      height:'500px',
      data: { curso: this.curso,cc:this.cantidadCursos }
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
  alunes:Array<any>=new Array();
  amartes:Array<any>=new Array();
  amiercoles:Array<any>=new Array();
  ajueves:Array<any>=new Array();
  aviernes:Array<any>=new Array();
  asabado:Array<any>=new Array();
  adomingo:Array<any>=new Array();
  asesorias:Array<any>=new Array();
  constructor(
    public dialogRef: MatDialogRef<dialogStudent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private db: AngularFirestore) { }
  ngOnInit(): void {
    this.getHorario()
    console.log(this.data.cc)
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
  prueba(hour){
  this.asesorias.push({
    fecha:'fecha',
    hora:hour
  })

  }
  save(){
    console.log(this.asesorias)
  }
  
}
