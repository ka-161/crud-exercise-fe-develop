import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import TaskListModel from 'src/app/models/taskListModel';
import taskModel from 'src/app/models/taskModel'; //currently missing in app.config.ts
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-screen',
  templateUrl: './task-screen.component.html',
  styleUrls: ['./task-screen.component.scss']
})
export class TaskScreenComponent implements OnInit {

  taskLists: TaskListModel[] = [];
  tasks: taskModel[]= [];
  taskListId: string='';

  //injecting service in componnetn
  constructor(
    private taskService: TaskService, //inject instance of taskservice inside this class
    private activatedRoute: ActivatedRoute, //angular provided service
    private router: Router //after:  go to ngOnInit
  ) { }

  //lifecycle method - gets called when component is ready to be loaded
  // first method that is called 
  ngOnInit(): void {
     // debugger;
      //observable-object, asynchronous - here call from frontend to backend
      //all returns so far are observable-objects - jhere we are subscribing to an obs-object
      //want to get data and set it in my class variable
      this.taskService.getAllTaskLists()
      .subscribe(allTaskLists => {
        this.taskLists = allTaskLists
        //get the first list id and route to it on page load
     //   this.router.navigate(['task-list', this.taskLists[0]['_id']]);
          /**instead first one, load the one recently visited, for web-app todolist */
   });
   
      this.activatedRoute.params.subscribe(//as soon as route changes, subscribe method will be invoked
        (params: Params) => {
          this.taskListId = params.taskListId;
          if(this.taskListId){
            this.taskService.getAllTasksForTaskList(this.taskListId).subscribe(
              (tasks: taskModel[]) => this.tasks = tasks //taskModel or TaskModel potential error
            );
          }
          /**en red, usando: http://localhost:4200/task-list/6885027f6248241c667e878f
           * en postman: http://localhost:3000/tasklists/6885027f6248241cx667e878f/tasks
           * 
           * ¡Muy buena pregunta! Y sí, es muy normal que las URLs de tu frontend (Angular) 
           * y tu backend (API en Node.js) sean diferentes durante el desarrollo. Te explico por qué y cuándo importa. 
           * 
           * Angular tiene su propio sistema de rutas que no tiene que coincidir con las rutas del backend.
           * --> por eso usamos CORS*/
        } 
      );
  }

  taskClicked(task: taskModel){
    this.taskService.updateTaskStatus(this.taskListId, task)
    .subscribe(() => task.completed = !task.completed);
  }

  deleteTask(task: taskModel){
    console.log(task);
    this.taskService.deleteTaskFromTaskList(this.taskListId, task._id)
    .subscribe((taskDeleted: taskModel) => {
      this.tasks = this.tasks.filter(t => t._id !=taskDeleted._id);// remove the deleted task from teh class level tasks
      //  (js included view option filter) <- problematic -> had to assign the whole thing to the "new" tasks
    } 
  );
  }

  deleteTaskList(tasklistClicked: TaskListModel){
        this.taskService.deleteTaskList(tasklistClicked._id)
    .subscribe(() => {
      this.taskLists = this.taskLists.filter(tL => tL._id !=tasklistClicked._id);    
      //removed detailed info in subscribe - not needed here - check fro tasks 
      // why needed there, because as i understand - click is the only needed identifiere here?
    } 
  );
  }

  addNewTask(){
    
  }


}
