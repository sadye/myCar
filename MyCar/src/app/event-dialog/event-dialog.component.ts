import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Event } from '../eventdetail/event';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent {
  private backupEvent: Event = {...this.data.event};

  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventDialogData
  ) {}

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
