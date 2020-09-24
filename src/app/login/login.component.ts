import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFirestore } from '@angular/fire/firestore';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RouterLink, Router } from '@angular/router';
import { MsgService } from 'src/services/msg.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  formLogin:FormGroup

  constructor(private fb:FormBuilder,public auth: AngularFireAuth, private msg:MsgService) { }

  ngOnInit(): void {
        this.formLogin=this.fb.group({
           correo:['', Validators.compose([Validators.required,  Validators.email])],
           contraseña:['', Validators.required]
        })  
  }
   ingresar(){
      this.auth.auth.signInWithEmailAndPassword(this.formLogin.value.correo, this.formLogin.value.contraseña).then((usuario)=>{
            this.msg.msgSuccess('Exito','Bienvenido de nuevo')

      }).catch((error)=>{
             this.msg.msgError('Error',error.message)
      })

   }
}

