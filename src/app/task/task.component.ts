import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from './task';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task: Task | null = null;
  @Output() edit = new EventEmitter<Task>();
  editTask(): void{
    if (this.task) {
      this.edit.emit(this.task);
    }
  }
}
