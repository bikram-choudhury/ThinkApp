import { OnInit, Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
    templateUrl: './signup.component.html',
    styleUrls: ['./../../assets/scss/application/signin-signup.scss']
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    submitted: boolean = false;

    constructor(private _formBuilder: FormBuilder, private _authentication: AuthenticationService, private _router: Router){}
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
        if(this.signupForm.valid) {
            const formData = {...this.signupForm.value};
            delete formData.confirm_password;
            formData['password'] = btoa(formData['password']);
            this._authentication.saveUser(formData).subscribe(
                (userResponse) => {
                    const navigationExtras: NavigationExtras = {
                        state: {
                            username: formData.username
                        }
                    }
                    this._router.navigate(['/admin/signin'], navigationExtras);
                },
                (errorResponse) => console.log(errorResponse),
                () => console.log('Default block')
            )
        }
    }
}