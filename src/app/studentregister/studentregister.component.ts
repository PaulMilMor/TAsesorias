import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Curso } from 'src/models/curso';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-studentregister',
  templateUrl: './studentregister.component.html',
  styleUrls: ['./studentregister.component.css']
})
export class StudentregisterComponent implements OnInit {
  currentRate = 3.5;
  cursos:Curso[]=new Array<Curso>()
curso:Curso;
  constructor(private db: AngularFirestore,private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCurso();
  }
  getCurso(){
    var id= this.activeRoute.snapshot.params.idCurso;
    this.db.collection('cursos').get().subscribe((res)=>{
      res.docs.forEach((item)=>{
        let c= item.data() as Curso;
        c.id=item.id
       if(c.id==id){
              this.curso=c;
              console.log("si lo es")
       }
       
      })
    })
  }
}
