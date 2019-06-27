import { Component, OnInit, AfterViewChecked } from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit, AfterViewChecked {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewChecked() {
    (function () {
      const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

      if (isWindows) {
        // if we are on windows OS we activate the perfectScrollbar function
        $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();

        $('html').addClass('perfect-scrollbar-on');
      } else {
        $('html').addClass('perfect-scrollbar-off');
      }
      $('body').bootstrapMaterialDesign();
    })();
  }

}
