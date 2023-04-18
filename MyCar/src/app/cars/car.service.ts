import { initializeApp } from "firebase/app";
import { Firestore, doc, getFirestore } from "firebase/firestore";
import { Task } from "../task/task";
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { TaskDialogResult } from '../task-dialog/task-dialog.component';
import { collection, getDocs } from "firebase/firestore"; 
import { Inject, Injectable } from "@angular/core";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCT9brm-XvGANnqIzJEXI6F_6Oc8ezvgWs",
  authDomain: "mycar-259be.firebaseapp.com",
  projectId: "mycar-259be",
  storageBucket: "mycar-259be.appspot.com",
  messagingSenderId: "548335650962",
  appId: "1:548335650962:web:2068669be13b9bbd317e4b",
  measurementId: "G-WCESG7Q7JY"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }

  async getCars(list: Task[], email: String) {
    const querySnapshot = await getDocs(collection(db, "users/" + email + "/cars"));
    querySnapshot.forEach((doc) => {
        var newTask: Task;
        newTask = {
            Nickname: doc.get("Nickname"),
            Make: doc.get("Make"),
            Model: doc.get("Model"),
            Year: doc.get("Year"),
            Mileage: doc.get("Mileage"),
            VinNumber: doc.get("VinNumber"),
            description: doc.get("Description")
          }
        list.push(newTask);
    })
}
}
