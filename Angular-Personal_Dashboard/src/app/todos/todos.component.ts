import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todo.service';
import { Todo } from '../shared/todo.model';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  animations: [
    trigger('todoItemAnimation', [
      transition(':leave', [
        animate(300, style({
          opacity: 0, 
          height: 0,
          marginBottom: 0,
          transform: 'translateX(-100%)'
        }))
      ])
    ])
  ]
})
export class TodosComponent implements OnInit{

  todos: Todo[] = []

  constructor(private todoService: TodoService, private router: Router, private notificationService: NotificationService) { }
  ngOnInit(): void {
    this.todos = this.todoService.getTodos()    
  }

  toggleCompleted(todo: Todo) {
    this.todoService.updateTodo(todo.id, {
      completed: !todo.completed
    })
  }

  onEditClick(todo: Todo) {
    this.router.navigate(['/todos', todo.id])
  }

  onDeleteClick(todo: Todo) {
    this.todoService.deleteTodo(todo.id)
    this.notificationService.display("Todo deleted", 1500)
  }

  //'TrackBy' function used in component's html to prevent re-rendering of list items when the list is changed
  trackById(index: number, todo: Todo) {
    return todo.id
  }

}
