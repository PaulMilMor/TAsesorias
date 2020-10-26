import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { MsgService } from 'src/services/msg.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from 'src/models/usuario';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from 'src/models/categoria';
@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddcourseComponent implements OnInit {
  categoria: Categoria
  categorias: Array<Categoria> = new Array()
  categoriasUsadas: Array<Categoria> = new Array()
  formCursos: FormGroup
  usuario: Usuario
  constructor(private db: AngularFirestore, private fb: FormBuilder, private storage: AngularFireStorage, private msg: MsgService, private auth: AngularFireAuth, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.formCursos = this.fb.group({
      tarifa: ['', Validators.required],
      categoria: ['', Validators.required],

    })
    this.getMyCategories()
    this.getCategories()
    this.getUser()
  }

  //Obtiene el usuario 
  getUser() {
    this.db.collection('usuarios').get().subscribe((res) => {
      res.docs.forEach((item) => {
        let u = item.data() as Usuario
        if (u.uid == this.auth.auth.currentUser.uid) {
          this.usuario = u;
        }
      })
    })
  }

//Obtiene el total de categorias suprimiendo las que ya tiene curso
  getCategories() {
    this.db.collection('categorias').get().subscribe((res) => {
      res.docs.forEach((item) => {
        let c = item.data() as Categoria
        c.id = item.id;
        this.categorias.push(c)
        for (let iten of this.categoriasUsadas) {
          if (c.nombre == iten.nombre) {
            this.categorias.pop();
          }
        }
      })

    })
  }
  //Agrega el curso en la base de datos
 setCourse() {
    this.formCursos.value.user = this.usuario;
    if (this.formCursos.value.tarifa <= 2000) {
      this.db.collection('cursos').add(this.formCursos.value).then(() => {
        this.msg.msgSuccess('Guardado', 'Curso guardado completo')
      })
    } else {
      this.msg.msgError('Error', 'la tarifa maxima es 2000')

    }
  }
//Obtiene las categorias en las que el Intructor tiene curso
  getMyCategories() {
    this.db.collection('cursos').get().subscribe((res) => {
      res.docs.forEach((item) => {
        let h = item.data();
        if (h.user.uid == this.usuario.uid) {
          this.categoriasUsadas.push(h.categoria);
          console.log("cat usada " + h.categoria.nombre);
        }
      })
    })
  }


}
