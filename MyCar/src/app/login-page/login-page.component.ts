import {Component} from '@angular/core';
import { LoginService } from '../login/login.service';
import { AppComponent } from '../app.component';
/**
* @title login demo
*/
@Component({
selector: 'login-demo',
styleUrls: ['login-page.component.scss'],
templateUrl: 'login-page.component.html',
})
export class LoginPageComponent {
    service: LoginService
    connected: boolean

    constructor(service: LoginService) {
        this.service = service;
        this.connected = false;
    }
username : string ="";
signupusername: string="";
password : string ="";
signuppassword : string ="";
password2 : string ="";
show: boolean= false;

signUpButton() {
    document.getElementById('container')?.classList.add("right-panel-active")
}

signInButton() {
    document.getElementById('container')?.classList.remove("right-panel-active")
}

submit(){
    this.service.signIn(this.username,this.password);
    this.connected = this.service.connected;
}
signUp() {
    if (this.signuppassword === this.password2) {
         console.log()
    this.service.signUp(this.signupusername,this.signuppassword)
    this.connected = this.service.connected;
    }
}
clear(){
this.username ="";
this.password = "";
this.show = true;
}
}