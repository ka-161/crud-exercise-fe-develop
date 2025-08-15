import { Injectable } from '@angular/core';
import { ApiConfService } from './api-conf.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiConfService: ApiConfService  ) { }

  //to fetch all tasklists
  getAllTaskLists(){
    return this.apiConfService.get('tasklists');
  }
//potential error
  //create tasklistBUcket
  createTaskList(title:string){
    let data = {'title': title};
    return this.apiConfService.post('tasklists', data);
  }

  //potential error
  //fetch all tasks inside a list object // http://localhost:3000/tasklists/6889ea9e6f0f37380199209c/tasks/
  getAllTasksForTaskList(taskListId: string)
  {
    return this.apiConfService.get(`tasklists/${taskListId}/tasks`);//dynamic string concatenation
  }

}
