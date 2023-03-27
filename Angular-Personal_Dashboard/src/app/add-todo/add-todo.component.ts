import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Todo } from '../shared/todo.model';
import { TodoService } from '../shared/todo.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent {

  
  constructor(
    private todoService: TodoService,
    private router: Router,
    private notificationService: NotificationService) { }


  onFormSubmit(form: NgForm) {
    if (form.invalid) return alert("The new todo cannot be empty.")
    
    const todo = new Todo(form.value.text)
    this.todoService.addTodo(todo)
    this.router.navigateByUrl('/todos')
    this.notificationService.display("Todo added", 1500)
  }
}
