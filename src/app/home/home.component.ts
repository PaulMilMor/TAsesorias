import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/models/curso';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from 'src/models/usuario';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cursos: Curso[] = new Array<Curso>()
  cursosValorados: Curso[] = new Array<Curso>()
  instructoresValorados: Curso[] = new Array<Curso>()
  usuario: Usuario
  isValid: boolean = false
  constructor(private db: AngularFirestore,private auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.getUser()
    this.getCourses();
    console.log("lenght " + this.cursos.length);
  }
//Función para obtener todos los cursos
  getCourses() {

    this.db.collection('cursos').get().subscribe((res) => {
      res.docs.forEach((item) => {
        let c = item.data() as Curso;
        c.id = item.id
        this.db.collection('evaluaciones').get().subscribe((res2) => {
          var e = new Array<any>();
          var E: number = 0
          res2.docs.forEach((item2) => {

            if (item2.id.split('@')[1] == c.id) {
              e.push(item2.data().calificacion)
              E = E + item2.data().calificacion
            }
          })
          c.evaluaciones = E / e.length;
          //Este if es para obtener los cursos mejor valorados. Existe la posibilidad de que esté mal posicionado
          if(c.evaluaciones>=4){
            this.cursosValorados.push(c);
            this.instructoresValorados.push(c);
            for(let iv of this.instructoresValorados){
              if(iv.user==c.user && iv.categoria!=c.categoria){
                this.instructoresValorados.pop();
              }
            }
          }
        })
        this.cursos.push(c);
        
        console.log(c);
      })
    })

  }

 /* getValuedTeachers(){
    this.instructoresValorados=this.cursosValorados
    for(let c of this.instructoresValorados){
      for(let c2 of this.instructoresValorados){
        if(c.user=c2.user){
          
        }
      }
    }
  }*/

  getUser() {
    this.db.collection('usuarios').get().subscribe((res) => {
      res.docs.forEach((item) => {
        let u = item.data() as Usuario
        if (u.uid == this.auth.auth.currentUser.uid) {
          this.usuario = u;
          this.isValid = true
          console.log(this.isValid)
        } else {
          console.log("no existe");
        }
      })
    })
  }

}
