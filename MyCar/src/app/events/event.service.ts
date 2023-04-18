import { initializeApp } from "firebase/app";
import { Firestore, collectionGroup, doc, getDoc, getFirestore, where } from "firebase/firestore";
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { TaskDialogResult } from '../task-dialog/task-dialog.component';
import { collection, getDocs, query } from "firebase/firestore"; 
import { Inject, Injectable, Type } from "@angular/core";
import { Event } from '../eventdetail/event';


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
export class EventService {

  constructor() { }

  async getEvents(list:Event[]) {
    const events = query(collectionGroup(db,'events'));
    const querySnapshot = await getDocs(events);
    querySnapshot.forEach(async(doc)  => {
      const car = await getDoc(doc.get("Car"));
      var newEvent: Event;
      newEvent = {
        Name: doc.get("Name"),
        Car: car.get("Nickname"),
        Date: doc.get("Date"),
        Price: doc.get("Price"),
        Type: doc.get("Type"),
        Description: doc.get("Description")
      }
      list.push(newEvent);
    })
  }
}
