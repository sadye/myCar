import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Event } from '../eventdetail/event';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { CarService } from '../cars/car.service';
import { Task } from '../task/task';

interface EventType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent {
  private backupEvent: Event = {...this.data.event};
  email: string = ""
  cars: Task[] = [];

  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    private service: CarService,
    @Inject(MAT_DIALOG_DATA) public data: EventDialogData
  ) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        if (user.email) {
          this.email = user.email
          this.service.getCars(this.cars, this.email);
        }
        // ...
      } else {
        this.email = ""
      }

    });
    
  }

  ngOnInit(){
    
  }
  types: EventType[] = [
    {value: 'maintenance-0', viewValue: 'Maintenance'},
    {value: 'accident-1', viewValue: 'Accident'},
    {value: 'self-2', viewValue: 'Self'},
  ];

  cancel(): void {
    
    this.data.event.Name = this.backupEvent.Name;
    this.data.event.Car = this.backupEvent.Car;
    this.data.event.Date = this.backupEvent.Date;
    this.data.event.Price = this.backupEvent.Price;
    this.data.event.Description = this.backupEvent.Description;
    this.data.event.Type = this.backupEvent.Type;
    this.dialogRef.close();
  }

  
}
export interface EventDialogData {
  event: Event;
  enableDelete: boolean;
}

export interface EventDialogResult {
  event: Event;
  delete?: boolean;
}
