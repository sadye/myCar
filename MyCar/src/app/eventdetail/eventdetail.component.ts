import { Component,Input, Output, EventEmitter } from '@angular/core';
import {Event} from "./event"

@Component({
  selector: 'app-eventdetail',
  templateUrl: './eventdetail.component.html',
  styleUrls: ['./eventdetail.component.scss']
})
export class EventdetailComponent {
  @Input() event: Event | null = null;
  @Output() edit = new EventEmitter<Event>();

}
