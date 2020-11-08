import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Certificacion } from 'src/models/certificacion';
//import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-certificaciones',
  templateUrl: './certificaciones.component.html',
  styleUrls: ['./certificaciones.component.css']
})
export class CertificacionesComponent implements OnInit {
 // certificaciones: Array<Certificacion> = new Array();
  certificaciones:Certificacion[]=new Array<Certificacion>()

  constructor(private db: AngularFirestore,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.certificaciones.length=0;
    this.getCertificaciones();
  }
  
  getCertificaciones(){
  
    this.db.collection('certificados').get().subscribe((res)=>{
      res.docs.forEach((item)=>{
        let c= item.data() as Certificacion;
        c.id=item.id
        
          this.certificaciones.push(c)
          console.log(c)
      })
    })
  }
}
