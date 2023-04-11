import { Component } from '@angular/core';
import { Task } from './task/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todo: Task[] = [
    {
      Nickname: 'Green Machine',
      Make: 'Chevy',
      Model: "Tahoe",
      Year: '2003',
      Mileage: '104356',
      VinNumber: "12",
      description: 'Go to the store and buy milk'
    }
  ];
}
