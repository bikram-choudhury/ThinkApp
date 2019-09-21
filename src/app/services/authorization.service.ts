import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthoriztionService implements CanActivateChild {
    constructor(private _router: Router) {}
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = localStorage.getItem('token');
        if(token) {
            return true;
        } else {
            this._router.navigateByUrl('/admin');
            return false;
        }
    }
}