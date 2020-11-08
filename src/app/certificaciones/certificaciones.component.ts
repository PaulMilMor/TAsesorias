import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Certificacion } from 'src/models/certificacion';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from 'src/models/usuario';

@Component({
  selector: 'app-certificaciones',
  templateUrl: './certificaciones.component.html',
  styleUrls: ['./certificaciones.component.css']
})
export class CertificacionesComponent implements OnInit {
 // certificaciones: Array<Certificacion> = new Array();
  certificaciones:Certificacion[]=new Array<Certificacion>()
  usuarios: Usuario[] = new Array<Usuario>()

  usuario:Usuario
  isValid: boolean = false
  isCollapsed: boolean = false;
  constructor(private db: AngularFirestore,private fb: FormBuilder,private auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.certificaciones.length=0;
    this.getUser;
    this.getCertificaciones();
  }
  getUser() {
    this.db.collection('usuarios').get().subscribe((res) => {
      res.docs.forEach((item) => {
        let u = item.data() as Usuario
        //let c= item.data() as Certificacion;
        if (u.uid == this.auth.auth.currentUser.uid) {
          this.usuario = u;
          this.isValid = true
          this.usuarios.push(u)
          console.log(this.isValid)
          
        } else {
          console.log("no existe");
        }
        /*u.nombre=item.id
        this.usuarios.push(u)*/
        console.log(u)
      })
    })
  }
 
  getCertificaciones(){
  
    this.db.collection('certificados').get().subscribe((res)=>{
      res.docs.forEach((item)=>{
        let c= item.data() as Certificacion;
        //let u = item.data() as Usuario;
        //u.id = item.id
        c.id=item.id
        if (c.status=="pendiente"){
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
  updateStatus(id,s){
    console.log(id);
    
  this.db.collection('certificados').doc(id).update({
    status:s
  }).then(()=>{
    window.location.reload();
  })
  // window.location.reload();
  }
  /*
  getCertificaciones(){
  
    this.db.collection('certificados').get().subscribe((res)=>{
      res.docs.forEach((item)=>{
        this.db.collection('usuarios').get().subscribe((res) => {
          res.docs.forEach((item) => {
            let u = item.data() as Usuario
            if (u.uid == c.userid) {
              this.usuario = u;
              this.isValid = true
              console.log(this.isValid)
            } else {
              console.log("no existe");
            }
          })
        })
        let c= item.data() as Certificacion;
        c.id=item.id
        
          this.certificaciones.push(c)
          console.log(c)
      })
    })
  }
  */
}
