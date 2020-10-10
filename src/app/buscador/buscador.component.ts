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

  constructor(private db: AngularFirestore, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cursos.length=0;
    this.getCursos()
  }
  getCursos(){
    this.db.collection('cursos').get().subscribe((res)=>{
      res.docs.forEach((item)=>{
        let c= item.data() as Curso;
        c.id=item.id
        this.cursos.push(c);
         console.log(c.user.nombre)
       
      })
    })
  }
}
