import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Usuario } from 'src/models/usuario';
import { AngularFirestore } from '@angular/fire/firestore';
import { Curso } from 'src/models/curso';
@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  formBusqueda:FormGroup;
  filter:''
  selected = 'maestro';
  maestro='maestro';
  categoria='categoria';
  cursos:Curso[]=new Array<Curso>()
  currentRate = 5;

  constructor(private db: AngularFirestore, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cursos.length=0;
    this.getCourses()
  }
  ///Obtiene todos los cursos con su promedio de evaluacion
  getCourses(){
  
    this.db.collection('cursos').get().subscribe((res)=>{
      res.docs.forEach((item)=>{
        let c= item.data() as Curso;
        c.id=item.id
        this.db.collection('evaluaciones').get().subscribe((res2)=>{
          var e=new Array<any>();
          var E:any=0
          res2.docs.forEach((item2)=>{

             if(item2.id.split('@')[1]==c.id){
               e.push(item2.data().calificacion)
               E=E+item2.data().calificacion
             }
          })
          c.evaluaciones=E/e.length;
          this.cursos.push(c);
      
        })
      })
    })
  }
}
