import { Injectable } from '@angular/core';
import { ApiConfService } from './api-conf.service';
import taskModel from './models/taskModel';
import TaskListModel from './models/taskListModel';
import { Observable } from 'rxjs';
//confusion
//connotation enables reaching methods in here by components 
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiConfService: ApiConfService  ) { }

  //to fetch all tasklists
  getAllTaskLists(): Observable<TaskListModel[]>{
    return this.apiConfService.getTaskLists('tasklists');
  }

/*  //to fetch all tasks
  getAllTasks(): Observable<taskModel[]>{
    return this.apiConfService.getTasks('tasks');
  }
    */

  //potential error
  //fetch all tasks inside a task list object // http://localhost:3000/tasklists/6889ea9e6f0f37380199209c/tasks/
  getAllTasksForTaskList(taskListId: string)
  {
    return this.apiConfService.getTasks(`tasklists/${taskListId}/tasks`);//dynamic string concatenation
  }


//potential error
  //create tasklistBUcket
  createTaskList(title:string){
    let data = {'title': title};
    return this.apiConfService.post('tasklists', data);
  }


  //create task in specific task list object - potential error, value can be both different title
  createTaskInsideATaskList(taskListId: string, title: string){
//    let data= {'title': title}; <-- old
    return this.apiConfService.post(`tasklists/${taskListId}/tasks`, {title});
  }

  //delete tasklist
  deleteTaskList(taskListId: string): Observable<TaskListModel>{
    return this.apiConfService.deleteTaskList(`tasklists/${taskListId}`);
  }

    //delete specific task in specific tasklist - potential error - duplicate variable name title
  deleteTaskFromTaskList(taskListId: string, taskId: string): Observable<taskModel>{
    return this.apiConfService.deleteTask(`tasklists/${taskListId}/tasks/${taskId}`);
  }

  //update task status completed yes no
  updateTaskStatus(taskListId: string, taskObject: taskModel): Observable<taskModel>{
    //constant created w changed status, then returned as data in url sth sth
    let updateData= {'completed': !taskObject.completed };// ! toggles value --> boolean - changes prior status to opposite
    return this.apiConfService.patch(`tasklists/${taskListId}/tasks/${taskObject._id}`, updateData);
  }
}
