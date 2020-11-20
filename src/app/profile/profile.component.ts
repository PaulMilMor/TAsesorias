import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/models/curso';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from 'src/models/usuario';
import { MsgService } from 'src/services/msg.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Certificacion } from 'src/models/certificacion';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentRate = 5
  cursos: Array<Curso> = new Array();
  certificados: Array<Certificacion> = new Array()
  instructor = 'instructor'
  alumno = 'alumno'
  administrador = 'administrador'
  usuario: Usuario
  usuarios: Usuario
  isValid: boolean = false
  isCollapsed: boolean = false;
  constructor(private ar: ActivatedRoute, public dialog: MatDialog, private msg: MsgService, private db: AngularFirestore, private auth: AngularFireAuth, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.getUser()
    this.getUsers()
    this.getCourses()
    this.getCertificados();
    console.log(this.cursos);
    //this.getUsers()
  }
  getUser() {
    this.db.collection('usuarios').doc(this.ar.snapshot.params.idMaestro).get().forEach((res) => {
      this.usuario = res.data() as Usuario
      console.log(this.usuario)
    })
  }
  getUsers() {
    this.db.collection('usuarios').get().subscribe((res) => {
      res.docs.forEach((item) => {
        let u = item.data() as Usuario
        if (u.uid == this.auth.auth.currentUser.uid) {
          this.usuarios = u;
          this.isValid = true
          console.log(this.isValid)
        } else {
          console.log("no existe");
        }
      })
    })
  }
  openDialog(): void {
    /*const dialogRef = this.dialog.open(reportProfile, {
      width: '500px',
      height: '250px',
      //Para en enviar informacion a un dialogo se usa la variable data (teniendo en cuenta que existe una llamada asi tambien en el dialogo)
      data: {
        maestro: this.ar.snapshot.params.idMaestro,
        alumno: this.auth.auth.currentUser.uid
      }
    });*/
    const dialogRef2 = this.dialog.open(editProfile, {
      width: '500px',
      height: '500px',
      //Para en enviar informacion a un dialogo se usa la variable data (teniendo en cuenta que existe una llamada asi tambien en el dialogo)
      /*data: {
        maestro: this.ar.snapshot.params.idMaestro,
        alumno: this.auth.auth.currentUser.uid
      }*/
    });

  }

  getCertificados() {
    this.db.collection('certificados').get().subscribe((res) => {
      res.docs.forEach((item) => {
        var certificado = item.data() as Certificacion
        console.log(certificado);
        if (certificado.user.uid == this.ar.snapshot.params.idMaestro && certificado.status == "aprobado") {
          certificado.id = item.id
          this.certificados.push(certificado);
        }
      })
    })
  }

  getCourses() {
    this.db.collection('cursos').get().subscribe((res) => {
      res.docs.forEach((item) => {
        var curso = item.data() as Curso
        if (curso.user.uid == this.ar.snapshot.params.idMaestro) {
          curso.id = item.id
          this.db.collection('evaluaciones').get().subscribe((res2) => {
            var e = new Array<any>();
            var E: any = 0
            res2.docs.forEach((item2) => {

              if (item2.id.split('@')[1] == curso.id) {
                e.push(item2.data().calificacion)
                E = E + item2.data().calificacion
              }
            })
            curso.evaluaciones = E / e.length;
            this.cursos.push(curso);

          })
        }
      })
    })
  }
  validateCurso(c: Curso) {
    for (let certificado of this.certificados) {
      if (c.categoria.nombre == certificado.categoria.nombre) {
        return true;
      }
    }
    return false;
  }

}
@Component({
  selector: 'reportProfile',
  templateUrl: 'reportProfile.html',

})
export class reportProfile implements OnInit {
  formReporte: FormGroup;
  formReportes: FormGroup
  allreports: Array<any> = new Array();

  constructor(
    public dialogRef: MatDialogRef<reportProfile>,
    @Inject(MAT_DIALOG_DATA) public data: any, private db: AngularFirestore, private msg: MsgService, private router: Router, private fb: FormBuilder, private ar: ActivatedRoute, private auth: AngularFireAuth) { }
  ngOnInit(): void {
    this.exitsReport()
    this.formReporte = this.fb.group({
      maestro: [''],
      alumno: [''],
      reporte: ['', Validators.required]

    })



  }


  saveReport() {

    this.formReporte.value.maestro = this.data.maestro
    this.formReporte.value.alumno = this.data.alumno



    this.db.collection('reportes').add(this.formReporte.value).finally(() => {
      console.log('entra aqui');

      if (this.allreports.length >= 4) {
        console.log("entro al ban");

        this.db.collection('usuarios').doc(this.data.maestro).update({
          ban: true

        }).then(() => {
          console.log("baneado 1");

        })
        this.db.collection('cursos').get().subscribe((res) => {
          console.log(2);

          res.forEach((item) => {
            let c = item.data() as Curso
            c.id = item.id
            if (c.user.uid == this.data.maestro) {
              console.log("deberia");

              this.db.collection('cursos').doc(c.id).update({
                ban: true
              }).then(() => {
                console.log("baneado 2");

              })
            }
          })
        })
      }
      this.msg.msgSuccess('Exito', 'Reporte creado correctamente')

      this.dialogRef.close();
    }).catch((err) => {
      console.log(err)
      this.msg.msgError('Error', 'Algo salio mal')
    })

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  exitsReport() {
    var reports: Array<any> = new Array()
    this.db.collection('reportes').get().subscribe((res) => {


      res.docs.forEach((item) => {
        if (item.data().maestro == this.data.maestro) {
          this.allreports.push(item);

        }
        if (item.data().maestro == this.data.maestro && item.data().alumno == this.data.alumno) {
          reports.push(item.data())
          console.log('eee')
          console.log(reports.length);


          if (reports.length > 0) {
            this.msg.msgError('Reporte', 'Ya has reportado a este maestro')
            this.dialogRef.close();
            console.log('exite');

          } else {

          }
        }
      })

    })
    console.log(reports.length);

  }
}
@Component({
  selector: 'editProfile',
  templateUrl: 'editProfile.html',
  styleUrls: ['editProfile.css']

})
export class editProfile implements OnInit {
  formUsuario: FormGroup
  instructor = 'instructor'
  alumno = 'alumno'
  administrador = 'administrador'
  urlImg: string
  usuario: Usuario
  usuarios: Usuario
  idUsuario: string
  editCorreo: boolean = false
  editContra: boolean = false
  editImg: boolean = false
  editProfile: boolean = false
  editBiog: boolean = true
  isValid: boolean = false
  normal: 'normal'
  tipoCorreo: string
  constructor(private db: AngularFirestore, private fb: FormBuilder, private storage: AngularFireStorage, private msg: MsgService, private auth: AngularFireAuth, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.idUsuario = this.auth.auth.currentUser.uid
    this.getUser();
    this.getUsers();
    this.formUsuario = this.fb.group({
      correo: ['', Validators.email],
      contraseña: ['', Validators.minLength(8)],
      img: [''],
      bio: ['']
    })

  }
  //Añade Imagen a Firestore
  addImg(event) {
    if (event.target.files.length > 0) {
      let name = new Date().getTime().toString()
      let file = event.target.files[0]
      let type = file.name.toString().substring(file.name.toString().lastIndexOf('.'))
      let imgpath = 'usuarios/' + name + type;
      const ref = this.storage.ref(imgpath);
      const task = ref.put(file)
      task.then((obj) => {
        ref.getDownloadURL().subscribe((url) => {
          this.usuario.img = url;
        })
      })
    }
  }
  //Actualiza el email tanto de Autenticacioon como de la base de datos
  editEmail() {
    var user = this.auth.auth.currentUser;

    user.updateEmail(this.formUsuario.value.correo).then(() => {
      this.db.collection('usuarios').doc(user.uid).update({
        correo: this.formUsuario.value.correo
      })
    }).then(() => {
      this.msg.msgSuccess('Correo', 'Correo editado Satisfactoriamente')
    }).catch((err) => {

      this.msg.msgError('Error', err)
    })
  }
  //Actualiza la contraseeña tanto de Autenticacioon como de la base de datos
  editPass() {
    var user = this.auth.auth.currentUser;

    user.updatePassword(this.formUsuario.value.contraseña).then(() => {
      this.db.collection('usuarios').doc(user.uid).update({
        contraseña: this.formUsuario.value.contraseña
      })
    }).then(() => {
      this.msg.msgSuccess('Contraseña', 'Contraseña cambiada Satisfactoriamente')
    }).catch((err) => {

      this.msg.msgError('Error', err)
    })
  }
  //Actualiza la imagen  de la base de datos
  editImgs() {
    var user = this.auth.auth.currentUser;

    this.db.collection('usuarios').doc(user.uid).update({
      img: this.usuario.img

    }).then(() => {
      this.msg.msgSuccess('Imagen', 'Imagen cambiada Satisfactoriamente')
    }).catch((err) => {

      this.msg.msgError('Error', err)
    })
  }
  //Actualiza Bio
  editBio() {
    var user = this.auth.auth.currentUser.uid
    this.db.collection('usuarios').doc(user).update({
      bio: this.formUsuario.value.bio
    }
    ).then(() => {
      this.msg.msgSuccess('Exito', 'Biografia actualizada correctamente')
    }).catch((err) => {
      console.log(err);


    })

  }
  //Se encarga de ver que cambio se van a realizar y llama a los metodos correspondientes
  editUser() {
    if (this.editImg) {
      this.editImgs()
    }
    if (this.editCorreo) {

      this.editEmail()
    }
    if (this.editContra) {

      this.editPass()
    }
    if (this.editBiog) {
      this.editBio()
    }
  }
  
  //Obtiene el usuario
  getUser() {
    this.db.collection('usuarios').get().subscribe((res) => {
      res.docs.forEach((item) => {
        let u = item.data() as Usuario;
        if (u.uid == this.idUsuario) {
          u.uid = item.id;
          u.ref = item.ref;
          this.usuario = u;
          console.log(this.usuario.img)
          this.tipoCorreo = u.correo.split('@')[1]
          console.log(this.tipoCorreo);

          this.formUsuario.get('bio').setValue(this.usuario.bio)
        }
      })
    })

  }
  /*getUser() {
    this.db.collection('usuarios').doc(this.ar.snapshot.params.idMaestro).get().forEach((res) => {
      this.usuario = res.data() as Usuario
      console.log(this.usuario)
    })
  }*/
  getUsers() {
    this.db.collection('usuarios').get().subscribe((res) => {
      res.docs.forEach((item) => {
        let u = item.data() as Usuario
        if (u.uid == this.auth.auth.currentUser.uid) {
          this.usuarios = u;
          this.isValid = true
          console.log(this.isValid)
        } else {
          console.log("no existe");
        }
      })
    })
  }

}