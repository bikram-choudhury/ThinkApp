import { OnInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    constructor(private _formBuilder: FormBuilder) {}
    ngOnInit(){
        this.signupForm = this._formBuilder.group({
            name: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(10)
            ])],
            confirm_password: ['', Validators.compose([
                Validators.required,
                this.matchPassword.bind(this)
            ])]
        })
    }
    private matchPassword(_control: FormControl) {
        const password = this.signupForm && this.signupForm.value.password;
        const confirm_password = _control.value;
        return (password === confirm_password)? null: {notMatching: true};
    }
    signup(){
        console.log(this.signupForm);
    }
}