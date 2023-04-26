import { Component } from '@angular/core';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { connect } from 'rxjs';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  connected: boolean

  constructor(private router: Router) {
    this.connected = false;
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          this.connected = true;
          // ...
      } else {
        this.router.navigate(["/"]);
        this.connected = false;
      }
    });
    }
}
