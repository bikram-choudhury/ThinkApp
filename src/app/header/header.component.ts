import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() Header: string;
  constructor(private _router: Router) { }

  ngOnInit() {
  }
  logout() {
    localStorage.clear();
    this._router.navigateByUrl('/admin');
  }

}
