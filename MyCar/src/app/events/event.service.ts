import { initializeApp } from "firebase/app";
import { Firestore, deleteDoc, doc, getDoc, getFirestore, setDoc,updateDoc, query, where, collectionGroup, DocumentReference, QuerySnapshot} from "firebase/firestore";
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { TaskDialogResult } from '../task-dialog/task-dialog.component';
import { collection, getDocs } from "firebase/firestore"; 
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

  async getEvents(list:Event[], email: string) {
    if (email == "" || email == null) {
      return
    }
    const querySnapshot = await getDocs(collection(db, "users", email, "cars"));// get list of cars
    querySnapshot.forEach(async(doc)  => {// for every car
      const eventList = await getDocs(collection(db,'users', email, 'cars', doc.id, 'events')) // get list of events
      eventList.forEach(async(doc) => { // for every event
        var newEvent: Event;
        newEvent = {
          id: doc.get("id"),
          Name: doc.get("Name"),
          Car: doc.get("Car"),
          Date: new Date(doc.get("Date")),
          Price: doc.get("Price"),
          Type: doc.get("Type"),
          Description: doc.get("Description")
        }
        list.push(newEvent);
      })
      })
  }
  async pastEvents(pastEvents:Event[], futureEvents: Event[], email: string) {
  if (email == "" || email == null) {
    return
  }
  const events = query(collectionGroup(db,'events'));
  const querySnapshot = await getDocs(events);
  querySnapshot.forEach(async(doc)  => {
    var newEvent: Event;
    newEvent = {
      id: doc.get("id"),
      Name: doc.get("Name"),
      Car: doc.get("Car"),
      Date: new Date(doc.get("Date")),
      Price: doc.get("Price"),
      Type: doc.get("Type"),
      Description: doc.get("Description")
    }
    if(new Date() > newEvent.Date) {
       pastEvents.push(newEvent);
    } else {
     futureEvents.push(newEvent);
    }
  })
  console.log(pastEvents);
  console.log(futureEvents);
 } 
  
  makeRandom(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }

  async getCarRef(email: string, event: Event) {
    const q = query(collection(db,'users', email, 'cars'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.get("Nickname") == event.Car) {
        event.Car = doc.ref.path
      }
    })
  }

  async setEvent(email: string, event: Event) {
    var id = event.id
    if (id == "" || id == null) {
      id = this.makeRandom(15, "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]\=-)(*&^%$#@!~`")
    }
      await setDoc(doc(db, 'users', email, 'cars', event.Car, 'events', id), {
        Name: event.Name,
        Date: event.Date.toString(),
        Type: event.Type,
        Price: event.Price,
        Description: event.Description,
        Car: event.Car,
        id: id
      })
  }

  async deleteEvent(email: string, event: Event) {
    await deleteDoc(doc(db,'users', email, 'cars', event.Car, 'events', event.id))
  }


}
