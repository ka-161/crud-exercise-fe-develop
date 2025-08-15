import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-screen',
  templateUrl: './task-screen.component.html',
  styleUrls: ['./task-screen.component.scss']
})
export class TaskScreenComponent implements OnInit {

  taskLists: any[] = [];
  tasks: any[]= [];
  constructor() { }

  ngOnInit(): void {
  }

}
