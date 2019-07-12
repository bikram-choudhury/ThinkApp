import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {
    signinForm: FormGroup;
    constructor(private _formBuilder: FormBuilder){}
    ngOnInit() {
        this.signinForm = this._formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.compose([
                Validators.required,
                Validators.maxLength(5),
                this.alphaNumericCheck.bind(this)
            ])]
        })
    }
    private alphaNumericCheck(_control: FormControl): ({[key: string]: boolean} | null){
        return /^[a-z0-9]+$/i.test(_control.value)? null: {'alphaNumeric': false}
    }
    signin() {
        console.log(this.signinForm);
    }
    reset() {

    }
}