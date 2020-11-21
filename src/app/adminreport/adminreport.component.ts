import { Component, OnInit ,Inject} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MsgService } from 'src/services/msg.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Reporte } from 'src/models/reportes';
import { Usuario } from 'src/models/usuario';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-adminreport',
  templateUrl: './adminreport.component.html',
  styleUrls: ['./adminreport.component.css']
})
export class AdminreportComponent implements OnInit {
  reportes: Array<Reporte> = new Array();
  constructor(private db: AngularFirestore, private msg: MsgService, public dialog: MatDialog) { }

  ngOnInit(): void {
this.getReportes()
  }
  openDialog(maestro): void {
    const dialogRef = this.dialog.open(dialogBan, {
   
 data:{
    maestro:maestro
 }
    });
  }
  getReportes() {
    this.db.collection('reportes').get().subscribe((res) => {
      res.forEach((item) => {
        let r = item.data() as Reporte
        r.id = item.id
        console.log(item.data().fecha);
      
        r.fecha=new Date((item.data().fecha.seconds)*1000)
 
        this.reportes.push(r)
        
        
      })
    })

  }


 
 
}
@Component({
  selector: 'dialogBan',
  templateUrl: 'dialog.html',
})
export class dialogBan {

  constructor(
    public dialogRef: MatDialogRef<dialogBan>,
    @Inject(MAT_DIALOG_DATA) public data: any, private db: AngularFirestore, private msg: MsgService) { }

  onNoClick(): void {
    this.dialogRef.close();

  }

  banHammer(){
    var fechaInicio=new Date()
    var fechaFinal=new Date()
    fechaFinal.setDate(fechaFinal.getUTCDate()+15)
    this.db.collection('baneados').doc(this.data.maestro.uid).set({
      fechaInicio:fechaInicio,
      fechaFinal:fechaFinal,
      tipoSuspension:'Manual',
      maestro:this.data.maestro 
    }).finally(()=>{
      this.deleteReportes(this.data.maestro.uid)
    })
  }
  banHammerU(){
    var fechaInicio=new Date()
    var fechaFinal='Indefinidamente'

    this.db.collection('baneados').doc(this.data.maestro.uid).set({
      fechaInicio:fechaInicio,
      fechaFinal:fechaFinal,
      tipoSuspension:'Manual',
      maestro:this.data.maestro 
    }).finally(()=>{
      this.deleteReportes(this.data.maestro.uid)
    })
  }
  deleteReportes(id){
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
  }
}