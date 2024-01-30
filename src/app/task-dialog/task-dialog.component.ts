import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../task/task';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-task-dialog',
  standalone: true,
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatDialogModule]
})
export class TaskDialogComponent {
  private backupTask: Partial<Task> = { ...this.data.task };

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
  ) {}

  cancel(): void {
    this.data.task.title = this.backupTask.title;
    this.data.task.description = this.backupTask.description;
    this.dialogRef.close(this.data);
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
