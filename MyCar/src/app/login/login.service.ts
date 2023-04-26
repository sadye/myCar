import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from "firebase/app";
import { getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut } from "firebase/auth";
import { setDoc, doc, getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyCT9brm-XvGANnqIzJEXI6F_6Oc8ezvgWs",
  authDomain: "mycar-259be.firebaseapp.com",
  projectId: "mycar-259be",
  storageBucket: "mycar-259be.appspot.com",
  messagingSenderId: "548335650962",
  appId: "1:548335650962:web:2068669be13b9bbd317e4b",
  measurementId: "G-WCESG7Q7JY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const db = getFirestore(app)


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public connected: boolean;
  private email: string;

  constructor(private router: Router) {
    this.connected = false;
    this.email = "";
   }


  async logOut() {
    signOut(auth).then(() => {
      // Sign-out successful.
      this.router.navigate(['/'])
    }).catch((error) => {
      // An error happened.
    });
  }

  async signUp(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      this.connected = true;
      if(user.email!=null){
        this.email = user.email;
      }
      localStorage.setItem('token',this.email)
      this.router.navigate(['/Dashboard'])
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
    await setDoc(doc(db,'users', email), {
      Email: email,
      Password: password
    })
  }

  async signIn(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    this.connected = true;
    localStorage.setItem('token',this.email)
    this.router.navigate(['/Dashboard'])
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  }
  loggedIn(){
    let hasToken = false;
    if(localStorage.getItem('user') == this.email){
        hasToken=true;
    }
    return hasToken;
  }

  getToken(){
    return localStorage.getItem('user')
  }
}
