import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
opcion:number=1
breakpoint;
  constructor() { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth<=600) ? 1:2;
  }

  change(n:number){
   this.opcion=n
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth<=600) ? 1:2;
  }
  
}
