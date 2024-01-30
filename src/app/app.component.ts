import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';
import { Task } from './task/task';
import { TaskComponent } from './task/task.component';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { TaskDialogResult } from './task-dialog/task-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, MatToolbarModule, MatIconModule,
    CommonModule,
    TaskComponent,
    MatCardModule,
    DragDropModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todo: Task[] = [
    {
      title: 'Buy milk',
      description: 'Go to the store and buy milk'
    },
    {
      title: 'Create a Kanban app',
      description: 'Using Angular, build a Kanban app'
    }
  ];
  inProgress: Task[] = [];
  done: Task[] = [];

  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void { 
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true
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
        dataList[taskIndex]=task;
      }
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

  constructor(private dialog: MatDialog) { }

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {}
      }
    });
    dialogRef
    .afterClosed()
    .subscribe((result: TaskDialogResult|undefined)  => {
      if (!result) {
        return;
      }
      this.todo.push(result.task);
    });
  }
}
