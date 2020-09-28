import { Component,OnInit } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth'
import { User } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from 'src/models/usuario';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TusAsesorias';
  alumno='alumno';
  instructor='instructor'
  user:User
  usuario:Usuario
constructor(private auth:AngularFireAuth, private db:AngularFirestore){
  this.auth.user.subscribe((user)=>{
    this.user=user;
  })
}
ngOnInit(): void {

    }

}
