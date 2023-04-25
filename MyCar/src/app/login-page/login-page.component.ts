import {Component} from '@angular/core';
/**
* @title login demo
*/
@Component({
selector: 'login-demo',
styleUrls: ['login-page.component.scss'],
templateUrl: 'login-page.component.html',
})
export class LoginPageComponent {
username : string ="";
password : string ="";
show: boolean= false;
submit(){
console.log("user name is " + this.username)
this.clear();
}
clear(){
this.username ="";
this.password = "";
this.show = true;
}
}