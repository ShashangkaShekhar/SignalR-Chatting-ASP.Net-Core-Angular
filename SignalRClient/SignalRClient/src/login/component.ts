import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataService } from '../shared/service';

@Component({
    selector: 'app-login',
    templateUrl: './app/login/component.html',
    providers: [DataService]
})

export class LoginComponent implements OnInit, AfterViewInit {
    public title: any;
    public userForm: FormGroup;
    public resmessage: string;
    public _saveUrl: string = 'api/user/userlogin';

    constructor(
        private router: Router,
        private titleService: Title,
        private formBuilder: FormBuilder,
        private _dataService: DataService) {
    }

    ngOnInit() {
        this.titleService.setTitle("Login");
        this.createForm();
    }

    ngAfterViewInit() {

    }

    createForm() {
        this.userForm = this.formBuilder.group({
            userName: new FormControl('', Validators.required),
            userPass: new FormControl('', Validators.required)
        });

        $("#userName").focus();
    }

    onSubmit() {
        if (this.userForm.invalid) {
            return;
        }

        //debugger
        this._dataService.save(this.userForm.value, this._saveUrl)
            .subscribe(response => {
                console.log(response);

                var loggeduser = response.resdata;
                if (response.resdata != null) {
                    localStorage.setItem('loggedUser', JSON.stringify(loggeduser));
                    this.router.navigate(['/backoffice']);
                }
                else {
                    this.resmessage = "Login Faild";
                }
            }, error => {
                //console.log(error);
            });
    }

    reset() {
        this.userForm.setValue({
            userName: null,
            userPass: null
        });

        this.resmessage = null;
    }
}
