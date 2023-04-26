import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  service: LoginService

  constructor(service: LoginService) {
    this.service = service;
  }

  logOut() {
    this.service.logOut()
  }

}
