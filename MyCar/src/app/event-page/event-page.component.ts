import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventDialogComponent, EventDialogResult } from '../event-dialog/event-dialog.component';
import { Event } from '../eventdetail/event';
import { CarService } from '../cars/car.service';
import { EventService } from '../events/event.service';
import { every, from } from 'rxjs';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ContentObserver } from '@angular/cdk/observers';
import { Task } from '../task/task';

var email: string


@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent {
  carService: CarService;
  todo: Event[] = [];
  past: Event[] = []
  future: Event[] = []
  service: EventService
  cars: Task[] = [];
  car: string = "All";

  constructor(private dialog: MatDialog, service: EventService, carService: CarService) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        if (user.email) {
          email = user.email
          this.service.getEvents(this.past, this.future, email);
          this.carService.getCars(this.cars, email);
        }
        // ...
      } else {
        email = ""
      }
    });
    this.carService = carService
    this.service = service
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
        this.service.setEvent(email,result.event)
        this.todo.push(result.event);
        if(result.event.Date < new Date()){
          this.pastSorting(result.event);
        }else {
          this.futureSorting(result.event)
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

    editEvent(list: Event[], fromPast: boolean, event: Event): void {
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
            if(fromPast && result.event.Date >= new Date()){
              /// if should be moved to future
              dataList.splice(eventIndex, 1);
              this.futureSorting(result.event)
              return;
            } else if (!fromPast && result.event.Date < new Date()){
              ///of should be moved to past
              dataList.splice(eventIndex, 1);
              this.pastSorting(result.event)
              return;
            }
          dataList[eventIndex] = event;
          this.past.sort((a:Event, b:Event)=> b.Date.getTime()- a.Date.getTime())
          this.future.sort((a:Event, b:Event)=> a.Date.getTime()- b.Date.getTime())

        }
      });
    }

    pastSorting(event: Event){
      this.past.push(event);
      this.past.sort((a:Event, b:Event)=> b.Date.getTime()- a.Date.getTime())
    }
    futureSorting(event:Event){
      this.future.push(event);
      this.future.sort((a:Event, b:Event)=> a.Date.getTime()- b.Date.getTime())
    }

    getNewCars(){
      console.log('here')
      console.log(this.car)
      this.past = []
      this.future = []
      if (!this.car){
        this.service.getEvents(this.past, this.future, email);
      }else{
        this.service.getSpecificEvents(this.past, this.future, email, this.car);
      }
    }

}
