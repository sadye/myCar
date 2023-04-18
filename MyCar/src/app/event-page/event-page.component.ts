import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventDialogComponent, EventDialogResult } from '../event-dialog/event-dialog.component';
import { Event } from '../eventdetail/event';
import { CarService } from '../cars.service';
import { EventService } from '../events/event.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent {
  todo: Event[] = [];
  constructor(private dialog: MatDialog, service: EventService) {
    service.getEvents(this.todo);
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
        this.todo.push(result.event);
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

    editEvent(list: 'todo', event: Event): void {
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
        const dataList = this[list];
        const eventIndex = dataList.indexOf(event);
        if (result.delete) {
          dataList.splice(eventIndex, 1);
        } else {
          dataList[eventIndex] = event;
        }
      });
    }

}
