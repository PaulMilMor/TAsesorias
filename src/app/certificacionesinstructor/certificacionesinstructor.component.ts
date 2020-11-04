import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-certificacionesinstructor',
  templateUrl: './certificacionesinstructor.component.html',
  styleUrls: ['./certificacionesinstructor.component.css']
})
export class CertificacionesinstructorComponent implements OnInit {
breakpoint
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
  }
  openDialog(): void {

    const dialogRef = this.dialog.open(dialogNewcertificacion, {
      width: '800px',
      height: '300px',
    });
  }
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
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
