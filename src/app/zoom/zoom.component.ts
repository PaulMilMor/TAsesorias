import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { ZoomMtg } from '@zoomus/websdk';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from 'src/models/usuario';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Asesoria } from 'src/models/asesoria';
import { stringify } from 'querystring';
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();
@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css']
})
export class ZoomComponent implements OnInit {
  idMaestro = ''
  idAsesoria = ''
  usuario: Usuario
  isVisible_I: boolean = false;
  isVisible_A: boolean = false
  signatureEndpoint = ''
  apiKey = 'yQ1Gh1u9TyKuOLnEGsAuVA'
  meetingNumber = 0
  role = 0
  leaveUrl = "http://localhost:4200/calificar/" + this.idMaestro + "/" + this.idAsesoria
  userName = ' Felix'
  userEmail = ''
  passWord = '0'
  signature = ''
  apiSecret = 'nuFEHOHIXutpAGbgsJl17IyA3UWvpbRtq3rx'
  formDatos: FormGroup
  constructor(private auth: AngularFireAuth, private db: AngularFirestore, private fb: FormBuilder) {

  }

 ngOnInit() {
    this.getUsuario()
 this.getAsesoriasI();
   this.getAsesoriasA();

 console.log('Leave U'+this.leaveUrl)
    this.formDatos = this.fb.group({
      numero: ['', Validators.compose([Validators.minLength(11), Validators.required])],
      contraseña: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    })
  }

  getSignature () {


    this.meetingNumber = this.formDatos.value.numero
    this.passWord = this.formDatos.value.contraseña
    this.signature = ZoomMtg.generateSignature({
      meetingNumber: this.meetingNumber,
      apiKey: this.apiKey,
      apiSecret: this.apiSecret,
      role: this.role,
      success: (res) => {

        console.log(this.signature)

      }
    })
    this.startMeeting(this.signature)
  }

  startMeeting(signature) {

    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: "http://localhost:4200/calificar/" + this.idMaestro + "/" + this.idAsesoria,
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
  getUsuario() {
    let txt: string = ''
    this.db.collection('usuarios').get().subscribe((res) => {
      res.docs.forEach((item) => {
        let u = item.data() as Usuario
        if (u.uid == this.auth.auth.currentUser.uid) {

          this.usuario = u;
          this.userName = u.nombre;
          console.log(this.usuario)
        }

      })

    })

  }
getAsesoriasA() {
    var ida;
    this.db.collection('asesorias').get().subscribe((res) => {

      res.docs.forEach((item) => {

        var uid = this.auth.auth.currentUser.uid;
        var Auid = item.id.split('@',1)
       ida = item.id
   

        console.log("id asesoria" + item.id)
        if (uid == Auid.toString()) {
          this.idAsesoria=ida
 
          this.db.collection('cursos').doc(item.id.split('@')[1]).get().forEach((item3)=>{
            this.idMaestro=item3.data().user.uid
          })
          item.data().dias.forEach(element => {
            console.log(item.data().dias[0])
            var fecha = new Date(element.fecha.seconds * 1000);
            var fechaactual = new Date();

            if (fecha.getDate() == fechaactual.getDate() && fecha.getMonth() == fechaactual.getMonth() && fechaactual.getHours() == element.hora.split(':', 1).toString()) {
              this.isVisible_A = true;
              console.log('simon')
            }
          });

        }

      })
    })

  }
 getAsesoriasI() {
    this.db.collection('asesorias').get().subscribe((res) => {

      res.docs.forEach((item) => {
        
        var uid = this.auth.auth.currentUser.uid;
        var cid = item.id.split('@')
        var Uid;
    


        this.db.collection('cursos').get().subscribe((res2) => {
          res2.docs.forEach((item2) => {

            if (item2.id == cid[1]) {

              Uid = item2.data().user.uid;
              this.idMaestro = Uid
              this.leaveUrl= item.id+"prueba"+Uid
              if (uid == Uid) {
                console.log("Entra aqui")
                
                item.data().dias.forEach(element => {

                  var fecha = new Date(element.fecha.seconds * 1000);
                  var fechaactual = new Date();

                  if (fecha.getDate() == fechaactual.getDate() && fecha.getMonth() == fechaactual.getMonth() && fechaactual.getHours() == element.hora.split(':', 1).toString()) {
                    this.isVisible_I = true;
                      
           
                  }
                });

              }

            }

          })
        })



      })
    })

  }
  getLeaveUrl(maestro) {

   
  }

}
