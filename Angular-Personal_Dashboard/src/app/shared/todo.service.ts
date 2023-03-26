import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = [
    new Todo('Learn Angular'),
    new Todo('Learn Angular'),
    new Todo('Learn Angular'),
    new Todo('Learn Angular'), 
    new Todo('fgdssssssssggggg ggggggggg ggggggggg gggggggg ggggg gggggggs rrrrr rrrrrrrrrrrrrr rrrrrrrrrrrrrr rrrrrrrrrggggggggg gggggggggggggggggg ggggggggggggggggg gggggggggggg fgdssssssssggggggggg ggggggg gggggggggggggggggggggggggggsrrrrrrrrrrrrrrrrrrrrrrrrrr rrrrrrrrrrrrrrrrgggg ggggggggggggggggg ggggggggggggggggg gggggggggggggggggg')
  ]  

  constructor() { }
  getTodos() {
    return this.todos
  }

  getTodo(id: string) {
    return this.todos.find(todo => todo.id === id)
  }

  addTodo(todo: Todo) {
    this.todos.push(todo)
  }

  updateTodo(id: string, changes: Partial<Todo>) {
    const todo = this.getTodo(id)
    if (!todo) {
      return
    }
    Object.assign(todo, changes)
  }

  deleteTodo(id: string) {
    const index = this.todos.findIndex(todo => todo.id === id)
    if (index === -1) {
      return
    }
    this.todos.splice(index, 1)
  }
}
