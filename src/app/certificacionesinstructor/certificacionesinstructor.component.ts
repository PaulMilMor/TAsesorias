import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { MsgService } from 'src/services/msg.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/models/categoria';
import { Usuario } from 'src/models/usuario';


@Component({
  selector: 'app-certificacionesinstructor',
  templateUrl: './certificacionesinstructor.component.html',
  styleUrls: ['./certificacionesinstructor.component.css']
})
export class CertificacionesinstructorComponent implements OnInit {


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  openDialog(): void {

    const dialogRef = this.dialog.open(dialogNewcertificacion, {
      width: '600px',
      height: '400px',
    });
  }
}
@Component({
  selector: 'dialogNewcertificacion',
  templateUrl: 'dialogNewcertificacion.html',
  styleUrls: ['./dialogNewcertificacion.css'],
})
export class dialogNewcertificacion implements OnInit {
  categoria: Categoria
  categorias: Array<Categoria> = new Array()
  categoriasUsadas: Array<Categoria> = new Array()
  usuario: Usuario
  constructor(public dialogRef: MatDialogRef<dialogNewcertificacion>,
    @Inject(MAT_DIALOG_DATA) public data: any, private db: AngularFirestore, private msg: MsgService, private auth: AngularFireAuth,private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    categoria: ['', Validators.required]
    this.getMyCategories()
    this.getCategories()
    this.getUser()

  }
  
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
   cambiar(){
    var pdrs = document.getElementById('file-upload').localName;
    document.getElementById('info').innerHTML = pdrs;
}
}

