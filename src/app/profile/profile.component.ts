import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Curso } from 'src/models/curso';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from 'src/models/usuario';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
currentRate=5 
cursos:Array<Curso>=new Array();

usuario:Usuario
  constructor(private ar:ActivatedRoute, private db:AngularFirestore) { }

  ngOnInit(): void {
this.getUser()
this.getCourses()
console.log(this.cursos);

  }
  getUser(){
     this.db.collection('usuarios').doc(this.ar.snapshot.params.idMaestro).get().forEach((res)=>{
      this.usuario=res.data() as Usuario
      console.log(this.usuario)
     })
  }
 getCourses(){
   this.db.collection('cursos').get().subscribe((res)=>{
     res.docs.forEach((item)=>{
       var curso=item.data() as Curso
       if(curso.user.uid==this.ar.snapshot.params.idMaestro){
        curso.id=item.id
        this.db.collection('evaluaciones').get().subscribe((res2)=>{
          var e=new Array<any>();
          var E:any=0
          res2.docs.forEach((item2)=>{

             if(item2.id.split('@')[1]==curso.id){
               e.push(item2.data().calificacion)
               E=E+item2.data().calificacion
             }
          })
          curso.evaluaciones=E/e.length;
          this.cursos.push(curso);
      
        })
       }
     })
   })
 }
}
