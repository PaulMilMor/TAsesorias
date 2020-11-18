import { Component, OnInit } from '@angular/core';
import { MsgService } from 'src/services/msg.service';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-banlist',
  templateUrl: './banlist.component.html',
  styleUrls: ['./banlist.component.css']
})
export class BanlistComponent implements OnInit {
baneados:Array<any>=new Array()
  constructor(private db:AngularFirestore) { }

  ngOnInit(): void {
    this.getBaneados()
  }
getBaneados(){

  this.db.collection('baneados').get().subscribe(res=>{
    res.docs.forEach((item)=>{
      let b=item.data()
      b.id=item.id
      b.fechaInicio=new Date((item.data().fechaInicio)*1000)
      console.log(b);
      this.baneados.push(b)
      
    })
  })
}
unBan(id){
this.db.collection('baneados').doc(id).delete().finally(()=>{
  window.location.reload()
});

}
}
