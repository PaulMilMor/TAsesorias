// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-dialog-user',
//   templateUrl: './dialog-user.component.html',
//   styleUrls: ['./dialog-user.component.css']
// })
// export class DialogUserComponent implements OnInit {


//   ngOnInit(): void {
//   }
//   formUsuarioNuevo: FormGroup;
//   usuario:Usuario=new Usuario
 

//   constructor(
//     public dialogRef: MatDialogRef<register>,
//     @Inject(MAT_DIALOG_DATA) public data: any, private db: AngularFirestore, private fb: FormBuilder, private auth:AngularFireAuth, private msg:MsgService) { }
//   ngOnInit() {
//     let numericRegex = "[0-9]{0,9}";
  
//     this.formUsuarioNuevo=this.fb.group({
//       nombre: [''],
//       apellido: [''],
//       fechaNacimiento: [''],
//       correo: [''],
//       img: [''],
//       tipoUsuario: [''],
//       uid: ['']
//     })
//   }
//   onNoClick(): void {
//     this.dialogRef.close();

//   }
 
  
//   addUsuario(){

//     this.formUsuarioNuevo.value.id=this.auth.auth.currentUser.uid
//     this.formUsuarioNuevo.value.nombre=this.auth.auth.currentUser.displayName;
//     this.formUsuarioNuevo.value.img=this.auth.auth.currentUser.photoURL;
//     this.formUsuarioNuevo.value.correo=this.auth.auth.currentUser.email;
//     this.db.collection('usuarios').add(this.formUsuarioNuevo.value).then((finish) => {
// this.msg.msgSuccess('Guardado','Elemento Guardado correctamente')
//     }).catch(() => {
//       this.msg.msgError('Error', 'Algo fallo :(')
//     })
//   }
// }
