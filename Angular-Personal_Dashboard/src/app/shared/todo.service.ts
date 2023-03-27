import { Injectable, OnDestroy } from '@angular/core';
import { Todo } from './todo.model';
import { Subscription, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService implements OnDestroy {

  todos: Todo[] = []  

  storageListenSubscription: Subscription

  constructor() {
    this.loadState()
    this.storageListenSubscription = fromEvent<StorageEvent>(window, 'storage')
      .subscribe((event: StorageEvent) => {
        if (event.key === 'todos') this.loadState()
      }
    )
   }

  ngOnDestroy(): void {
    this.storageListenSubscription.unsubscribe()
  }
  getTodos() {
    return this.todos
  }

  getTodo(id: string) {
    return this.todos.find(todo => todo.id === id)
  }

  addTodo(todo: Todo) {
    this.todos.push(todo)
    this.saveState()
  }

  updateTodo(id: string, changes: Partial<Todo>) {
    const todo = this.getTodo(id)
    if (!todo) {
      return
    }
    Object.assign(todo, changes)
    this.saveState()
  }

  deleteTodo(id: string) {
    const index = this.todos.findIndex(todo => todo.id === id)
    if (index === -1) {
      return
    }
    this.todos.splice(index, 1)
    this.saveState()
  }

  saveState() {
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }

  loadState() {
    try {
      const todosInStorage = JSON.parse(localStorage.getItem('todos')!)
      this.todos.length = 0
      this.todos.push(...todosInStorage)
    } catch (error) {
      console.log('Error retrieving todos from local storage.')
      console.log(error)
    }
  }
}
