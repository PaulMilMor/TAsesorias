import { Component } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth'
import { User } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TusAsesorias';
  alumno='alumno';
  instructor='instructor'
  user:User
constructor(private auth:AngularFireAuth){
  this.auth.user.subscribe((user)=>{
    this.user=user;
  })
}
}
