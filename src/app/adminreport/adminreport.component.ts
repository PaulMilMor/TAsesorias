import { Component, OnInit, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MsgService } from 'src/services/msg.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Reporte } from 'src/models/reportes';
import { Usuario } from 'src/models/usuario';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
@Component({
  selector: 'app-adminreport',
  templateUrl: './adminreport.component.html',
  styleUrls: ['./adminreport.component.css']
})
export class AdminreportComponent implements OnInit {
  reportes: Array<Reporte> = new Array();
  sortedData: any[];
  constructor(private db: AngularFirestore, private msg: MsgService, public dialog: MatDialog) {
    this.sortedData = this.reportes.slice();
  }

  ngOnInit(): void {
    this.getReportes()

  }
  openDialog(maestro): void {
    const dialogRef = this.dialog.open(dialogBan, {
      width: '510px', height: '320px',
      data: {
        maestro: maestro
      }
    });
  }
  getReportes() {
    this.db.collection('reportes').get().subscribe((res) => {
      res.forEach((item) => {
        let r = item.data() as Reporte
        r.id = item.id
        console.log(item.data().fecha);

        r.fecha = new Date((item.data().fecha.seconds) * 1000)

        this.reportes.push(r)


      })
    })
    this.sortedData = this.reportes
  }


  sortData(sort: Sort) {
    console.log(sort);

    const data = this.reportes.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'instructor': return compare(a.maestro.nombre, b.maestro.nombre, isAsc);
        case 'fecha': return compare(a.fecha, b.fecha, isAsc);
        case 'reporte': return compare(a.reporte, b.reporte, isAsc);


        default: return 0;
      }
    });
  }
}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
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

  banHammer() {
    var fechaInicio = new Date()
    var fechaFinal = new Date()
    fechaFinal.setDate(fechaFinal.getUTCDate() + 15)
    this.db.collection('baneados').doc(this.data.maestro.uid).set({
      fechaInicio: fechaInicio,
      fechaFinal: fechaFinal,
      tipoSuspension: 'Manual',
      maestro: this.data.maestro
    }).finally(() => {
      this.deleteReportes(this.data.maestro.uid)
    })
  }
  banHammerU() {
    var fechaInicio = new Date()
    var fechaFinal = 'Indefinidamente'

    this.db.collection('baneados').doc(this.data.maestro.uid).set({
      fechaInicio: fechaInicio,
      fechaFinal: fechaFinal,
      tipoSuspension: 'Manual',
      maestro: this.data.maestro
    }).finally(() => {
      this.deleteReportes(this.data.maestro.uid)
    })
  }
  deleteReportes(id) {
    this.db.collection('reportes').get().subscribe(res => {
      res.forEach(item => {
        let r = item.data() as Reporte
        r.id = item.id
        if (r.maestro.uid == id) {
          this.db.collection('reportes').doc(r.id).delete()
        }
      })
      window.location.reload()
    })
  }

  cancel(){
    this.dialogRef.close();
  }
}