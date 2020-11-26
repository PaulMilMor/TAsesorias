import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Curso } from 'src/models/curso';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from 'src/models/usuario';
import {Sort} from '@angular/material/sort';
@Component({
  selector: 'app-misasesorias-i',
  templateUrl: './misasesorias-i.component.html',
  styleUrls: ['./misasesorias-i.component.css']
})
export class MisasesoriasIComponent implements OnInit {
asesorias:asesoria[]=new Array();
sortedData:any[]
datos:any[]=new Array()
fechaActual:Date=new Date()

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    this.sortedData=this.datos.slice()
   }

  ngOnInit(): void {
this.getAsesorias();

this.sortedData=this.datos
console.log(this.sortedData);

this.fechaActual.setMinutes(0)
this.fechaActual.setSeconds(0)
console.log(this.fechaActual);


  }
  getAsesorias() {
   this.db.collection('asesorias').get().subscribe((res)=>{
     res.docs.forEach((item)=>{
          this.db.collection('cursos').get().subscribe((res2)=>{
            res2.docs.forEach((item2)=>{
              if(item.id.split('@')[1]==item2.id){
              let c=item2.data() as Curso
                if(this.auth.auth.currentUser.uid==c.user.uid){
                     let a:asesoria={
                       categoria:' ',
                       alumno:' ',
                       dias:[{
                         fecha:new Date(),
                         hora:' '
                       }]
                     }
                     console.log("la categoria correspondiente es"+c.categoria.nombre);
                     a.categoria=c.categoria.nombre
                     a.dias=item.data().dias
                     this.db.collection('usuarios').doc(item.id.split('@')[0]).get().forEach((item3)=>{
                       let u=item3.data() as Usuario
                       a.alumno=u.nombre
                     }).finally(()=>{
                      this.corregirDatos(a)
                     })
                  
                     
                    
                   
                }
              }
            })
          })
     })
   })
    
   
  }
  corregirDatos(value:asesoria){

      let a:datos={
    
        alumno:'patata ',
        categoria:' ',
        fecha:' '
      }
    console.log("value"+value);
    console.log(value);
    a.categoria=value.categoria
    a.alumno=value.alumno
      value.dias.forEach((item2)=>{
      
       a.fecha=this.corregirFechas(item2)
     console.log("ITEM");
     console.log(item2);
     console.log("VALOR Fehca");
     console.log(item2.fecha);
     
     
     
       
       this.datos.push(a)
      })
    console.log("DATOS");
    
  console.log(this.datos);
  
  }
  corregirFechas(value):any{
   console.log(value);
   
    
        value.fecha=new Date((value.fecha.seconds)*1000)
        value.fecha.setHours(value.hora.split(':')[0])
        value.fecha.setMinutes(0)
        value.fecha.setSeconds(0)
    
    return value
  }
  sortData(sort: Sort) {
    console.log(sort);
    
    const data = this.datos.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
  
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'categoria': return compare(a.categoria, b.categoria, isAsc);
        case 'alumno': return compare(a.alumno, b.alumno, isAsc);

    
        default: return 0;
      }
    });
  }
  }
  
  function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  
export interface asesoria{
  categoria:string;
  alumno:string;
  dias:{
fecha:any
hora:string
  }[];
 
}
export interface datos{
  categoria:string
  alumno:any
  fecha:any
}