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
  cursosCertificados: Curso[] = new Array<Curso>()
  instructoresValorados: Usuario[] = new Array<Usuario>()
  instructoresSolicitados: Usuario[] = new Array<Usuario>()
  instructoresNuevos: Usuario[] = new Array<Usuario>()
  usuario: Usuario
  isValid: boolean = false

  itemsPerSlide = 3;
  singleSlideOffset = true;
  noWrap = true;

  
  constructor(private db: AngularFirestore, private auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.getUser()
    this.getCourses();
    this.getTeachers();
    this.getNewTeachers();
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
          if (c.evaluaciones >= 4) {
            this.cursosValorados.push(c);
            /*  this.instructoresValorados.push(c);
              for(let iv of this.instructoresValorados){
                console.log("entra al for");
                console.log(iv.user);
                console.log(c.user);
                console.log(iv.categoria);
                console.log(c.categoria);
                if(iv.user.nombre==c.user.nombre && iv.categoria.nombre!=c.categoria.nombre){
                  console.log("entra al if");
                  this.instructoresValorados.pop();
                }
              }*/
          }
        })
        this.db.collection('certificados').get().subscribe((res3) => {
          console.log("Felxi 1");
          res3.docs.forEach((item3) => {
            console.log("Fleix 2");
            if (item3.data().user.uid == c.user.uid && item3.data().categoria.id == c.categoria.id && item3.data().status == "aprobado") {
              console.log("Feixls 3");
              this.cursosCertificados.push(c);
              for (let i in this.cursosCertificados) {
                if (this.cursosCertificados[i] == c && parseInt(i) != this.cursosCertificados.length - 1) {
                  this.cursosCertificados.pop();
                }
              }
            }
          })
        })

        this.cursos.push(c);

        console.log(c);
      })
    })

  }

  getTeachers() {
    this.db.collection('usuarios').get().subscribe((res) => {
      res.docs.forEach((item) => {
        let t = item.data() as Usuario;
        t.id = item.id;
        t.estudiantes = 0;
        console.log("Faro 1");
        if (t.tipoUsuario == "instructor") {
          console.log("Faro 2");

          this.db.collection('evaluaciones').get().subscribe((res2) => {
            var nEval = new Array<any>();
            var total: number = 0;
            console.log("Faro 3");
            res2.docs.forEach((item2) => {
              console.log("faro 4");
              if (item2.data().maestro == t.uid) {
                console.log("garo 5");
                nEval.push(item2.data().calificacion)
                total = total + item2.data().calificacion
              }

            })
            t.evaluaciones = total / nEval.length;
            if (t.evaluaciones >= 4) {
              console.log("faro 6");
              this.instructoresValorados.push(t);
            }
          })

          this.db.collection('asesorias').get().subscribe((res3) => {
            res3.docs.forEach((item3) => {
              console.log("item3")
              console.log(item3.data())
              let idcurso = item3.id.split('@')[1];
              console.log("Poolino 2")
              this.db.collection('cursos').get().subscribe((res4) => {
                res4.docs.forEach((item4) => {
                  console.log("Poolino 3 " + " " + item4.id + " " + idcurso + "  " + item4.data().user.uid + " " + t.uid)
                  if (item4.id == idcurso && item4.data().user.uid == t.uid) {
                    console.log("Poolino 1")
                    t.estudiantes = t.estudiantes + 1;
                    console.log(t.estudiantes + " " + t.uid)
                  }
                })
              })
            })
            console.log("asdad " + t.estudiantes + " " + t.uid)
            if (t.estudiantes > 0) {
              this.instructoresSolicitados.push(t);
            }
          })
        }
      })
    })
  }

  getNewTeachers() {
    this.db.collection('usuarios').get().subscribe((res) => {
      res.docs.forEach((item) => {
        let t = item.data() as Usuario;
        t.id = item.id;
        t.estudiantes = 0;
        t.evaluaciones = 0;
        if (t.tipoUsuario == "instructor") {
          console.log("What ")
          this.instructoresNuevos.push(t);
          let today = new Date();
          let insDate = t.fecha.toDate();
          today.setDate(today.getUTCDate() - 15);
          //let refdateInMS = today.getTime()- 129600000
          console.log("what2 " + today.getUTCDate())
          //console.log("what of what " + t.fecha.getUTCDate())
          //console.log("what 4 " + (t.fecha.getTime() < today.getTime()));
          /*let numDays = Math.abs(today.getTime()-t.fecha.getTime()) / (1000*60*60*24); 
          console.log("what3");*/
          if (insDate.getTime() < today.getTime()) {
            this.instructoresNuevos.pop();
          }
          this.instructoresNuevos.sort((a, b) => (a.fecha < b.fecha) ? 1 : -1)

        }
      })
    })
  }

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
