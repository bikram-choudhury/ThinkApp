import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    templateUrl: './signin.component.html',
    styleUrls: ['./../../assets/scss/application/signin-signup.scss']
})
export class SignInComponent implements OnInit {
    loginError: Error;
    constructor(private _authentication: AuthenticationService) {}
    ngOnInit() {}
    handleSignIn(form: NgForm) {
        if(form.submitted) {
            const formData = form.value;
            formData.password = btoa(formData.password);
            this._authentication.loginUser(formData).subscribe(
                (success) => console.log(success),
                (error) => (console.log(error), this.loginError = error),
                () => console.log("Finally block")
            )
        }
    }
}