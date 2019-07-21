import { OnInit, Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
    templateUrl: './signup.component.html',
    styleUrls: ['./../../assets/scss/application/signin-signup.scss']
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    submitted: boolean = false;

    constructor(private _formBuilder: FormBuilder){}
    ngOnInit(){
        this.signupForm = this._formBuilder.group({
            name: ['', Validators.required],
            username: ['', Validators.compose([
                Validators.required,
                this.emailValidator.bind(this)
            ])],
            password: ['', Validators.compose([
                Validators.required,
                Validators.maxLength(10)
            ])],
            confirm_password: ['', Validators.required]
        })
    }
    private emailValidator(_control: FormControl) {
        var email = _control.value;
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email) ? null : { emailValidation: true };
    }
    handleSubmit() {
        this.submitted = true;
        console.log(this.signupForm);
    }
}