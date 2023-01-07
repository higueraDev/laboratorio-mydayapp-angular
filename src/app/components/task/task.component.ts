import { Component, ElementRef, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent {
  @Input() task: Task | null = null;

  public isEditing: boolean = false;

  public editionInput = new FormControl();

  @ViewChild("editionElement") editionElement!: ElementRef<HTMLInputElement>;

  @Output()updateTask = new EventEmitter<Task>()

  constructor() {}

  onClick() {
    this.task!.completed = !this.task!.completed;
    this.onUpdateTask()
  }

  onDoubleClick() {
    this.editionInput.setValue(this.task!.title);
    setTimeout(()=>{
      this.editionElement?.nativeElement.focus();
    },100)
    this.isEditing = true;
  }

  onEnterEdition() {
    if (this.editionInput.value.trim()) this.task!.title = this.editionInput.value.trim();
    this.onUpdateTask()
    this.isEditing = false;
  }

  onEscapeEdition(){
    this.isEditing = false;
  }

  onUpdateTask(){
    this.updateTask.emit(this.task!)
  }
}
