import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CarService } from '../cars/car.service';
import { TaskDialogComponent, TaskDialogResult } from '../task-dialog/task-dialog.component';
import { Task } from '../task/task';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  todo: Task[] = [];
  service: CarService
  email: string
  
  constructor(private dialog: MatDialog, service: CarService) {
    this.service = service
    this.email = "chitchings16@gmail.com"
    service.getCars(this.todo, this.email);
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
        result.task.id = result.task.Nickname
        result.task.Account = this.email
        this.service.setCar(this.email, result.task.id, result.task)
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
        if (task.id == null) {
          task.id = result.task.Nickname
        }
        const dataList = this[list];
        const taskIndex = dataList.indexOf(task);
        if (result.delete) {
          dataList.splice(taskIndex, 1);
        } else {
          this.service.setCar(this.email,task.id,result.task)
          dataList[taskIndex] = task;
        }
      });
    }
}
