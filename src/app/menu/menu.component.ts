import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
opcion:number=1
  constructor() { }

  ngOnInit(): void {
  }

  change(n:number){
   this.opcion=n
  }
  
}
