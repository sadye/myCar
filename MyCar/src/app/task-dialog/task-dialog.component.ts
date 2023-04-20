import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../task/task';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent {
  private backupTask: Partial<Task> = { ...this.data.task };

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
  ) {}

  cancel(): void {
    this.data.task.Account = this.backupTask.Account;
    this.data.task.id = this.backupTask.id;
    this.data.task.Nickname = this.backupTask.Nickname;
    this.data.task.Make = this.backupTask.Make;
    this.data.task.Model = this.backupTask.Model;
    this.data.task.Year = this.backupTask.Year;
    this.data.task.Mileage = this.backupTask.Mileage;
    this.data.task.VinNumber = this.backupTask.VinNumber;
    this.data.task.Description = this.backupTask.Description;
    this.dialogRef.close();
  }
}

export interface TaskDialogData {
  task: Partial<Task>;
  enableDelete: boolean;
}

export interface TaskDialogResult {
  task: Task;
  delete?: boolean;
}