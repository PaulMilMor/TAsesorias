import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { ZoomMtg } from '@zoomus/websdk';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from 'src/models/usuario';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();
@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css']
})
export class ZoomComponent implements OnInit {
  usuario:Usuario
  instructor="instructor"
  alumno="alumno"
  signatureEndpoint = ''
  apiKey = 'yQ1Gh1u9TyKuOLnEGsAuVA'
  meetingNumber =0
  role = 0
  leaveUrl = 'http://localhost:4200'
  userName = 'Angular'
  userEmail = ''
  passWord = '0'
signature=''
apiSecret='nuFEHOHIXutpAGbgsJl17IyA3UWvpbRtq3rx'
formDatos:FormGroup
  constructor(private auth:AngularFireAuth, private db:AngularFirestore, private fb:FormBuilder) {

  }

  ngOnInit() {
    this.getUsuario()
    this.formDatos=this.fb.group({
      numero:['', Validators.compose([Validators.minLength(11), Validators.required])],
      contraseña:['', Validators.compose([Validators.minLength(6), Validators.required])]
    })
  }

  getSignature() {
   

this.meetingNumber=this.formDatos.value.numero
    this.passWord=this.formDatos.value.contraseña
    this.signature=ZoomMtg.generateSignature({
      meetingNumber:this.meetingNumber,
      apiKey:this.apiKey,
      apiSecret:this.apiSecret,
      role:this.role,
      success:(res)=>{
        console.log(this.signature)
        
      }
    })
    this.startMeeting(this.signature)
  }

  startMeeting(signature) {

    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          meetingNumber: this.meetingNumber,
          userName: this.usuario.nombre,
          apiKey: this.apiKey,
          userEmail: this.userEmail,
          passWord: this.passWord,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  getUsuario(){
    let txt:string=''
   this.db.collection('usuarios').get().subscribe((res)=>{
  res.docs.forEach((item)=>{
      let u=item.data() as Usuario
      if(u.id==this.auth.auth.currentUser.uid){
         
      this.usuario=u;
      console.log(this.usuario)
        }
  
  })
  
   })
  
  }
}
