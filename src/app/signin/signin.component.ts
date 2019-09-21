import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
    templateUrl: './signin.component.html',
    styleUrls: ['./../../assets/scss/application/signin-signup.scss']
})
export class SignInComponent implements OnInit {
    loginError: Error;
    signin: any = {
        username: '',
        password: ''
    }
    constructor(private _authentication: AuthenticationService, private _router: Router) {}
    ngOnInit() {
        const username = history.state && history.state.username || '';
        this.signin.username = username;
    }
    handleSignIn(form: NgForm) {
        if(form.submitted) {
            const formData = form.value;
            formData.password = btoa(formData.password);
            this._authentication.loginUser(formData).subscribe(
                (success) => {
                    const token = success.token;
                    if(token) {
                        localStorage.setItem('token', token);
                        this._router.navigate([`/admin/user/${success.username}/dashboard`])
                    }
                },
                (error) => (console.log(error), this.loginError = error),
                () => console.log("Finally block")
            )
        }
    }
}