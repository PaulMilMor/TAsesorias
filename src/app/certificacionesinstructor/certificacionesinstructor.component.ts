import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-certificacionesinstructor',
  templateUrl: './certificacionesinstructor.component.html',
  styleUrls: ['./certificacionesinstructor.component.css']
})
export class CertificacionesinstructorComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog(): void {

    const dialogRef = this.dialog.open(dialogNewcertificacion, {
      width: '800px',
      height: '300px',
    });
  }

}
@Component({
  selector: 'dialogNewcertificacion',
  templateUrl: 'dialogNewcertificacion.html',
  styleUrls: ['./dialogNewcertificacion.css'],
})
export class dialogNewcertificacion implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
