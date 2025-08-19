import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import TaskListModel from 'src/app/models/taskListModel';
import taskModel from 'src/app/models/taskModel';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-screen',
  templateUrl: './task-screen.component.html',
  styleUrls: ['./task-screen.component.scss']
})
export class TaskScreenComponent implements OnInit {

  taskLists: TaskListModel[] = [];
  tasks: taskModel[]= [];

  //injecting service in componnetn
  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  //lifecycle method - gets called when component is ready to be loaded
  // first method that is called 
  ngOnInit(): void {
      //debugger;
      //observable-object, asynchronous - here call from frontend to backend
      //all returns so far are observable-objects - jhere we are subscribing to an obs-object
      //want to get data and set it in my class variable
      this.taskService.getAllTaskLists()
      .subscribe((allTaskLists: TaskListModel[]) => this.taskLists = allTaskLists );

      this.activatedRoute.params.subscribe(
        (params: Params) => {
          const taskListId = params.taskListId;
          if(!taskListId){
            this.taskService.getAllTasksForTaskList(taskListId).subscribe(
              
            )
          }
        } 
      );
  }

}
