import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from 'src/models/usuario';
import { AuthService } from 'src/services/auth.service';
import { MsgService } from 'src/services/msg.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  usuario: Usuario
  instructor = 'instructor'
  alumno = 'alumno'
  administrador = 'administrador'
  isValid: boolean = false
  isCollapsed: boolean = false;
  constructor(private auth: AngularFireAuth, private db: AngularFirestore, private authService: AuthService, private msg: MsgService, public dialog: MatDialog) { }
  openDialog(): void {
    const dialogRef = this.dialog.open(register, {
      width: '250px',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
  ngOnInit(): void {

    this.validUser()
  }
  validUser() {
    this.getUsuario()
    console.log("Esto" + this.isValid)


  }
  cerrarSesion() {
    this.auth.auth.signOut();
  }
  getUsuario() {
    let txt: string = ''

    this.db.collection('usuarios').get().subscribe((res) => {
      console.log(1);

      res.docs.forEach((item) => {
        console.log(2);

        let u = item.data() as Usuario
        if (u.uid == this.auth.auth.currentUser.uid) {
          console.log(3);
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
}


@Component({
  selector: 'register',
  templateUrl: 'register.html',
})
export class register {
  formUsuarioNuevo: FormGroup;
  usuario: Usuario = new Usuario
  alumno: string = "alumno"
  instructor: string = "instructor"
  txt: string = "alumno"
  constructor(
    public dialogRef: MatDialogRef<register>,
    @Inject(MAT_DIALOG_DATA) public data: any, private db: AngularFirestore, private fb: FormBuilder, private auth: AngularFireAuth, private msg: MsgService, private router: Router) { }
  ngOnInit() {



  }
  onNoClick(): void {
    this.dialogRef.close();

  }


  addUsuario() {

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
    this.formUsuarioNuevo.value.tipoUsuario = "alumno"

    this.formUsuarioNuevo.value.nombre = this.auth.auth.currentUser.displayName;
    this.formUsuarioNuevo.value.img = this.auth.auth.currentUser.photoURL;
    this.formUsuarioNuevo.value.correo = this.auth.auth.currentUser.email;
    console.log(this.formUsuarioNuevo.value)
    this.db.collection('usuarios').add(this.formUsuarioNuevo.value).then((finish) => {
      this.msg.msgSuccess('Guardado', 'Elemento Guardado correctamente')
      this.dialogRef.close()
      this.router.navigate(['/zoom']);
    }).catch(() => {
      this.msg.msgError('Error', 'Algo fallo :(')
    })
  }
  addUsuarioI() {

    this.formUsuarioNuevo = this.fb.group({
      nombre: [''],
      apellido: [''],
      fechaNacimiento: [''],
      correo: [''],
      img: [''],
      tipoUsuario: [''],
      uid: ['']
    })
    this.formUsuarioNuevo.value.uid = this.auth.auth.currentUser.uid;
    this.formUsuarioNuevo.value.tipoUsuario = "instructor"
    this.formUsuarioNuevo.value.nombre = this.auth.auth.currentUser.displayName;
    this.formUsuarioNuevo.value.img = this.auth.auth.currentUser.photoURL;
    this.formUsuarioNuevo.value.correo = this.auth.auth.currentUser.email;
    console.log(this.formUsuarioNuevo.value)

    this.db.collection('usuarios').doc(this.auth.auth.currentUser.uid).set(this.formUsuarioNuevo.value).then((finish) => {
      this.msg.msgSuccess('Guardado', 'Elemento Guardado correctamente')
      this.dialogRef.close()



    }).catch(() => {
      this.msg.msgError('Error', 'Algo fallo :(')
    })

  }
}