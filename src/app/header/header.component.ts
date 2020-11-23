import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from 'src/models/usuario';
import { AuthService } from 'src/services/auth.service';
import { MsgService } from 'src/services/msg.service';
import { FormGroup, FormBuilder, } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Certificacion } from 'src/models/certificacion';
import { Curso } from 'src/models/curso';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  instructor = 'instructor'
  alumno = 'alumno'
  administrador = 'administrador'
  cursos: Array<Curso> = new Array();
  //cursosChecked:Curso[]=new Array<Curso>()
  usuario: Usuario
  isValid: boolean = false
  isCollapsed: boolean = false;
  certificaciones: Certificacion[] = new Array<Certificacion>()
  constructor(public auth: AngularFireAuth, private db: AngularFirestore, private authService: AuthService, private msg: MsgService, public dialog: MatDialog, private router: Router) { }

  //Abre el dialogo para designar si eres alumno o instructor
  openDialog(): void {
    const dialogRef = this.dialog.open(register, {
      //desde aqui se pueden poner caractericas varias del dialogo como altura y ancho 
      width: '250px',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
  ngOnInit(): void {
    this.cursos.length = 0;
    this.getCourses()
    this.getUser()

    this.getCertificaciones()

    this.isBanned()



  }
  getCertificaciones() {

    this.db.collection('certificados').get().subscribe((res) => {
      res.docs.forEach((item) => {
        let c = item.data() as Certificacion;
        //let u = item.data() as Usuario;
        //u.id = item.id
        c.id = item.id
        if (c.status == "pendiente") {
          this.certificaciones.push(c)
          console.log(c)

        }

        /*if(c.userid==this.usuario.uid){
          this.usuario.nombre
          //this.certificaciones.push(u.nombre);
          console.log(this.usuario.nombre)
          this.certificaciones.push(c)
          console.log(c)
        }*/
      })
    })

  }
  logOut() {

    this.auth.auth.signOut();

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
      if (!this.isValid) {
        this.openDialog()
      }
    })
  }
  isBanned() {
    this.db.collection('baneados').get().subscribe((res) => {
      res.docs.forEach(item => {
        if (item.id == this.auth.auth.currentUser.uid)
          this.msg.msgWarning('Suspendido', 'Estas suspendido ')
      })

    })
  }
  getCourses() {

    this.db.collection('cursos').get().subscribe((res) => {
      res.docs.forEach((item) => {
        let c = item.data() as Curso;
        c.id = item.id
        this.db.collection('evaluaciones').get().subscribe((res2) => {
          var e = new Array<any>();
          var E: any = 0
          res2.docs.forEach((item2) => {

            if (item2.id.split('@')[1] == c.id) {
              e.push(item2.data().calificacion)
              E = E + item2.data().calificacion
            }
          })
          c.evaluaciones = E / e.length;
          if (c.ban != true) {
            this.cursos.push(c);
            //this.cursosChecked.push(c)

          }

        })
      })
    })

  }
}


@Component({
  selector: 'register',
  templateUrl: 'register.html',
})
export class register {
  formUsuarioNuevo: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<register>,
    @Inject(MAT_DIALOG_DATA) public data: any, private db: AngularFirestore, private fb: FormBuilder, private auth: AngularFireAuth, private msg: MsgService, private router: Router) { }

  onNoClick(): void {
    this.dialogRef.close();

  }
  //Se crea un usuario con los datos almacenados del gmail
  addUsuario(value) {
    this.formUsuarioNuevo = this.fb.group({
      nombre: [''],
      apellido: [''],
      fechaNacimiento: [''],
      correo: [''],
      img: [''],
      tipoUsuario: [''],
      uid: [''],

    })
    this.formUsuarioNuevo.value.uid = this.auth.auth.currentUser.uid;
    this.formUsuarioNuevo.value.tipoUsuario = value
    this.formUsuarioNuevo.value.nombre = this.auth.auth.currentUser.displayName;
    this.formUsuarioNuevo.value.img = this.auth.auth.currentUser.photoURL;
    this.formUsuarioNuevo.value.correo = this.auth.auth.currentUser.email;
    console.log(this.formUsuarioNuevo.value)
    this.db.collection('usuarios').add(this.formUsuarioNuevo.value).then((finish) => {
      this.msg.msgSuccess('Guardado', 'Elemento Guardado correctamente')
      this.router.navigate(['/'])
      this.dialogRef.close()


    }).catch(() => {
      this.msg.msgError('Error', 'Algo fallo :(')
    })
  }

}