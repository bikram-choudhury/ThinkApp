import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
