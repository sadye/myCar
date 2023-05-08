import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventDialogComponent, EventDialogResult } from '../event-dialog/event-dialog.component';
import { Event } from '../eventdetail/event';
import { CarService } from '../cars.service';
import { EventService } from '../events/event.service';
import { every } from 'rxjs';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ContentObserver } from '@angular/cdk/observers';

var email: string
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    if (user.email) {
      email = user.email
    }
    // ...
  } else {
    email = ""
  }
});

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent {
  todo: Event[] = [];
  past: Event[] = []
  future: Event[] = []
  service: EventService

  constructor(private dialog: MatDialog, service: EventService) {
    this.service = service
    this.service.getEvents(this.past, this.future, email);
    console.log(new Date().toDateString())
  }

  filterEvents(){
    this.past = [];
    this.future = [];
    this.todo.forEach(element => {
    if(element.Date < new Date()){
      this.past.push(element)
    } else {
      this.future.push(element)
    }
    });
    console.log(this.past, this.future)
  }

  newEvent(): void {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '500px',
      data: {
        event: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: EventDialogResult|undefined) => {
        if (!result) {
          return;
        }
        const carName = result.event.Car
        this.service.getCarRef(email, result.event)
        this.service.setEvent(email,result.event)
        this.todo.push(result.event);
        if(result.event.Date < new Date()){
          this.past.push(result.event)
        }else {
          this.future.push(result.event)
        } 
      });
    }
    drop(event: CdkDragDrop<Event[]>): void {
      if (event.previousContainer === event.container) {
        return;
      }
      if (!event.container.data || !event.previousContainer.data) {
        return;
      }
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    editEvent(list: Event[], event: Event): void {
      const dialogRef = this.dialog.open(EventDialogComponent, {
        width: '500px',
        data: {
          event,
          enableDelete: true,
        },
      });
      dialogRef.afterClosed().subscribe((result: EventDialogResult|undefined) => {
        if (!result) {
          return;
        }
        const dataList = list;
        const eventIndex = dataList.indexOf(event);
        if (result.delete) {
          this.service.deleteEvent(email, result.event)
          dataList.splice(eventIndex, 1);
        } else {
          this.service.setEvent(email, result.event)
          dataList[eventIndex] = event;
        }
      });
    }

}
