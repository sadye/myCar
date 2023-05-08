import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CarService } from '../cars/car.service';
import { TaskDialogComponent, TaskDialogResult } from '../task-dialog/task-dialog.component';
import { Task } from '../task/task';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AppComponent } from '../app.component';

var email: string


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  todo: Task[] = [];
  service: CarService
  appComponent: AppComponent
  
  constructor(private dialog: MatDialog, service: CarService, appComponent: AppComponent) {
    this.service = service
    const auth = getAuth();
onAuthStateChanged(auth,(user) => {
  if (user?.email)
  email = user?.email
  service.getCars(this.todo,email);
})
    this.appComponent = appComponent
    this.appComponent.connected = true
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
        result.task.Account = email
        this.service.setCar(email, result.task.id, result.task)
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
      const name = task.Nickname
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
        if (result.task.id == null) {
          result.task.id = result.task.Nickname
        }
        if (result.task.Nickname != name) {
          this.service.deleteCar(email, name, false)
        }
        if (result.delete) {
          this.service.deleteCar(email,result.task.id, true)
          dataList.splice(taskIndex, 1);
        } else {
          this.service.setCar(email,result.task.id,result.task)
          dataList[taskIndex] = task;
        }
      });
    }
}
