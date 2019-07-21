import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    templateUrl: './signin.component.html',
    styleUrls: ['./../../assets/scss/application/signin-signup.scss']
})
export class SignInComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
    handleSignIn(form: NgForm) {
        console.log(form);
    }
}