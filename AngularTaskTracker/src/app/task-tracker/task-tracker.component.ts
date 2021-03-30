import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from 'task.model';

@Component({
  selector: 'app-task-tracker',
  templateUrl: './task-tracker.component.html',
  styleUrls: ['./task-tracker.component.css']
})
export class TaskTrackerComponent implements OnInit {
  errorMsg:string = "Must complete all fields";
  errorMsg1:string = "Cannot have duplicate IDs";
  incompleteFields:boolean = false;
  dupIds:boolean = false;
  taskArray:Array<Task>=[];
  constructor(public taskSer:TaskService) { }

  ngOnInit(): void {
    this.loadTask();
  }

  storeTask(taskRef:any){
    if(!taskRef.id || !taskRef.name || !taskRef.task || !taskRef.deadline){
      this.incompleteFields = true;
      return;
    }
    for(let i = 0; i < this.taskArray.length; i++){
      if(this.taskArray[i].id == taskRef.id){
        this.dupIds = true;
        return;
      }
    }
    console.log(taskRef.id);
    console.log(taskRef.name);
    console.log(taskRef.task);
    console.log(taskRef.deadline);
    this.taskSer.storeTaskInJSON(taskRef);
  }
  loadTask(){
    this.taskSer.loadTasksFromJSON().subscribe(data=>this.taskArray=data)
  }

}
