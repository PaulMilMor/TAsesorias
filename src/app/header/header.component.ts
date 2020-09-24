import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from 'src/models/usuario';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
usuario:Usuario
  isCollapsed:boolean = false;
  constructor(private auth:AngularFireAuth, private db:AngularFirestore) { }

  ngOnInit(): void {
this.getNombre()
  }
getNombre(){
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
  cerrarSesion(){
 this.auth.auth.signOut();
  }
}
