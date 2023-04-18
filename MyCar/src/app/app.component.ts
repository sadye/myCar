import { Component } from '@angular/core';
import { Task } from './task/task';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { TaskDialogResult } from './task-dialog/task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { CarService } from './cars/car.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todo: Task[] = [];
  
  constructor(private dialog: MatDialog, service: CarService) {
    service.getCars(this.todo, "chitchings16@gmail.com");
  }

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult|undefined) => {
        if (!result) {
          return;
        }
        this.todo.push(result.task);
      });
    }
    drop(event: CdkDragDrop<Task[]>): void {
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

    editTask(list: 'todo', task: Task): void {
      const dialogRef = this.dialog.open(TaskDialogComponent, {
        width: '500px',
        data: {
          task,
          enableDelete: true,
        },
      });
      dialogRef.afterClosed().subscribe((result: TaskDialogResult|undefined) => {
        if (!result) {
          return;
        }
        const dataList = this[list];
        const taskIndex = dataList.indexOf(task);
        if (result.delete) {
          dataList.splice(taskIndex, 1);
        } else {
          dataList[taskIndex] = task;
        }
      });
    }
}
