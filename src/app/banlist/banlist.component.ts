import { Component, OnInit } from '@angular/core';
import { MsgService } from 'src/services/msg.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Reporte } from 'src/models/reportes';
import {Sort} from '@angular/material/sort';
@Component({
  selector: 'app-banlist',
  templateUrl: './banlist.component.html',
  styleUrls: ['./banlist.component.css']
})
export class BanlistComponent implements OnInit {
baneados:Array<any>=new Array()
sortedData: any[];
  constructor(private db:AngularFirestore) { 
    this.sortedData = this.baneados.slice();
  }

  ngOnInit(): void {
    this.getBaneados()
    

  }
getBaneados(){

  this.db.collection('baneados').get().subscribe(res=>{
    res.docs.forEach((item)=>{
      let fecha=new Date();
      let b=item.data()
      b.id=item.id
      b.fechaInicio=new Date((item.data().fechaInicio.seconds)*1000)
  
   if(b.fechaFinal!='Indefinidamente'){
    b.fechaFinal=new Date((item.data().fechaFinal.seconds)*1000)

    var diff = Math.floor(b.fechaFinal.getTime() - fecha.getTime());
    var day = 1000 * 60 * 60 * 24;

    var days = Math.floor(diff/day);
    console.log(days);
    b.dias=days+" Dias"
   }else{

     
     b.dias=b.fechaFinal
   }
     
    
      this.baneados.push(b)
      
    })
  })
this.sortedData=this.baneados
}
unBan(id){
this.db.collection('baneados').doc(id).delete().finally(()=>{
  this.db.collection('reportes').get().subscribe(res=>{
    res.forEach(item=>{
      let r=item.data() as Reporte
       r.id=item.id
      if(r.maestro.uid==id){
        this.db.collection('reportes').doc(r.id).delete()
      }
    })
    window.location.reload()
  })
  
});

}
sortData(sort: Sort) {
  console.log(sort);
  
  const data = this.baneados.slice();
  if (!sort.active || sort.direction === '') {
    this.sortedData = data;
    return;
  }

  this.sortedData = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'instructor': return compare(a.maestro.nombre, b.maestro.nombre, isAsc);
      case 'fecha': return compare(a.fechaInicial, b.fechaInicial, isAsc);
      case 'tipo': return compare(a.tipoSuspension, b.tipoSuspension, isAsc);
      case 'tiempo': return compare(a.fechaFinal, b.fechaFinal, isAsc);
  
      default: return 0;
    }
  });
}
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
