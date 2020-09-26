import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { MsgService } from 'src/services/msg.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from 'src/models/usuario';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
formUsuario:FormGroup
urlImg:string
usuario:Usuario
idUsuario:string

  constructor(private db: AngularFirestore, private fb: FormBuilder, private storage: AngularFireStorage, private msg: MsgService, private auth: AngularFireAuth, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.idUsuario = this.activeRoute.snapshot.params.idMaestro;
    this.getUsuario();
    this.formUsuario = this.fb.group({
      correo: ['', Validators.compose([Validators.email, Validators.required])],
      contraseña: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      img: ['']
    })
 
  }
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
  editarUsuario() {
    var user=this.auth.auth.currentUser;
    
user.updateEmail(this.formUsuario.value.correo).then(()=>{
user.updatePassword(this.formUsuario.value.contraseña)
.then(()=>{
  this.msg.msgSuccess('Exito','Datos Guardados Correctamente')
}).catch((err)=>{
  this.msg.msgError('Error',err)
})

}).catch((err)=>{

  this.msg.msgError('Error',err)
})

    //Este sector del codigo es para cambiar los datos aparte de correo y contraseña
// this.db.collection('usuarios').doc().update({

// }).then(()=>{
//  this.msg.msgSuccess('Exito', 'Cambios realizado Correctamente')
// this.db.collection('usuarios').doc(user.uid).update({
//   img:this.usuario.img

//  }).then(()=>{
//    this.msg.msgSuccess('Exito','Datos Guardados Correctamente')
//  }).catch((err)=>{
//    this.msg.msgError('Error',err)
//  })
// })
}
getUsuario(){
 
  this.db.collection('usuario').get().subscribe((res)=>{
    res.docs.forEach((item)=>{
      let u= item.data() as Usuario;
      if(u.id==this.idUsuario){
        u.id=item.id;
        u.ref=item.ref;
        this.usuario=u;
      }
     
     
   
    })
  })

}
probar(){


console.log(this.db.collection('usuario', ref => ref.where('correo', '==', this.usuario.correo)))

}
}