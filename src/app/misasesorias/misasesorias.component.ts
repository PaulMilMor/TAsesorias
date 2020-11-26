import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/models/usuario';
import { AngularFirestore } from '@angular/fire/firestore';
import { Curso } from 'src/models/curso';
import { AngularFireAuth } from '@angular/fire/auth';
import { Asesoria } from 'src/models/asesoria';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { addImages, material } from '../profile/profile.component';
@Component({
  selector: 'app-misasesorias',
  templateUrl: './misasesorias.component.html',
  styleUrls: ['./misasesorias.component.css']
})
export class MisasesoriasComponent implements OnInit {
  misAsesorias: Array<Asesoria> = new Array()
  fechaActual: Date = new Date()
  isVisible_A:boolean=false
  constructor(private db: AngularFirestore, private auth: AngularFireAuth,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAsesorias()
  }
  getAsesorias() {
    this.db.collection('asesorias').get().subscribe(res => {
      res.forEach((item) => {
        if (item.id.split('@')[0] == this.auth.auth.currentUser.uid) {
          let a = item.data() as Asesoria


          //  a.dias.fecha = new Date(a.dias.fecha.seconds * 1000);
          this.db.collection('cursos').doc(item.id.split('@')[1]).get().forEach((item) => {
            let c = item.data() as Curso


            a.curso = c
          })
          var na;
          a.lunes = new Array()
          a.martes = new Array()
          a.miercoles = new Array()
          a.jueves = new Array()
          a.viernes = new Array()
          a.sabado = new Array()
          a.domingo = new Array()
          a.dias.forEach(element => {
            element.fecha = new Date(element.fecha.seconds * 1000);
           
            if (element.fecha.getDate() >= new Date().getDate()) {
              if (element.fecha.getDate() == this.fechaActual.getDate() && element.fecha.getMonth() == this.fechaActual.getMonth() && this.fechaActual.getHours() == element.hora.split(':', 1).toString()) {
                this.isVisible_A = true;
                console.log('simon')
              }

              switch (element.fecha.getDay()) {
                case 0:

                  a.domingo.push(element.hora)
                  break;
                case 1:
                  a.lunes.push(element.hora)
                  break;
                case 2:
                  a.martes.push(element.hora)
                  break;
                case 3:
                  a.miercoles.push(element.hora)
                  break;
                case 4:
                  a.jueves.push(element.hora)
                  break;
                case 5:

                  console.log(a.viernes);
                  a.viernes.push(element.hora)
                  break;
                case 6:
                  a.sabado.push(element.hora)
                  break;
              }


            }

          });

          this.misAsesorias.push(a)
          console.log(this.misAsesorias);

        }
      })
    })


  }
  openImages(imagenes) {
    const dialogRef3 = this.dialog.open(addImages, {
      width: '500px',
      height: '500px',
       data:{
         imagenes:imagenes,
         tipoUsuario:'alumno'
       }   

    });
 
      
  }
  
  openMaterial(item) {
    console.log(item);
    
    
    
    
    
    const dialogRef4 = this.dialog.open(material, {
      width: '440px',
      height: '175px',
      data: {
        id: item.curso.id,
        github: item.curso.github,
        odrive: item.curso.odrive,
        gdrive: item.curso.gdrive,
        tipoUsuario: 'alumno'
      }
    }

     )
  }

}
