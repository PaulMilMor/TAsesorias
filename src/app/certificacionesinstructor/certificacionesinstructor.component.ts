import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { MsgService } from 'src/services/msg.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Certificacion } from 'src/models/certificacion';
@Component({
  selector: 'app-certificacionesinstructor',
  templateUrl: './certificacionesinstructor.component.html',
  styleUrls: ['./certificacionesinstructor.component.css']
})
export class CertificacionesinstructorComponent implements OnInit {
  breakpoint
  certificaciones: Array<Certificacion> = new Array();
  constructor(public dialog: MatDialog, private db: AngularFirestore, private auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.getCertificados()
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
  }
  openDialog(): void {

    const dialogRef = this.dialog.open(dialogNewcertificacion, {
      width: '800px',
      height: '300px',
    });
  }
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
  }
  getCertificados() {
    this.db.collection('certificados').get().subscribe((res) => {
      res.docs.forEach((item) => {
        let c = item.data() as Certificacion;
        c.id = item.id
        if (c.userid == this.auth.auth.currentUser.uid) {
          this.certificaciones.push(c)
          
        }
      })
    })
  }
}
@Component({
  selector: 'dialogNewcertificacion',
  templateUrl: 'dialogNewcertificacion.html',
  styleUrls: ['./dialogNewcertificacion.css'],
})
export class dialogNewcertificacion implements OnInit {
  formCertificacion: FormGroup
  constructor(public dialogRef: MatDialogRef<dialogNewcertificacion>,
    @Inject(MAT_DIALOG_DATA) public data: any, private db: AngularFirestore, private fb: FormBuilder, private storage: AngularFireStorage, private msg: MsgService, private auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.formCertificacion = this.fb.group({
      descripcion: [''],
      categoria: [''],
      docref: ['', Validators.required],
      userid: [''],
      status: ['']
    })
  }
  addDoc(event) {
    if (event.target.files.length > 0) {
      let name = new Date().getTime().toString()
      let file = event.target.files[0]
      let type = file.name.toString().substring(file.name.toString().lastIndexOf('.'))
      let imgpath = 'certificaciones/' + name + type;
      const ref = this.storage.ref(imgpath);
      const task = ref.put(file)
      task.then((obj) => {
        ref.getDownloadURL().subscribe((url) => {
          this.formCertificacion.value.docref = url;
        })
      })
    }
  }
  save() {
    this.formCertificacion.value.status = "pendiente"
    this.formCertificacion.value.userid = this.auth.auth.currentUser.uid
    this.db.collection('certificados').add(this.formCertificacion.value).finally(() => {
      this.msg.msgSuccess('Exito', 'Certificado agregado correctamente')
    }).catch((err) => {

      console.log(err);

    })
  }
}
