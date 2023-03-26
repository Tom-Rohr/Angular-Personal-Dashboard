import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TodoService } from '../shared/todo.service';
import { Todo } from '../shared/todo.model';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit{

  todo?: Todo
  
  constructor(private route:ActivatedRoute, private todoService: TodoService, private router: Router, private notificationService: NotificationService) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const todoId = paramMap.get('id')
      this.todo = this.todoService.getTodo(todoId!)
    })
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) return alert("The todo cannot be empty.")

    this.todoService.updateTodo(this.todo!.id, form.value)
    this.router.navigateByUrl("/todos")
    this.notificationService.display("Todo updated", 1500)
  }
}
