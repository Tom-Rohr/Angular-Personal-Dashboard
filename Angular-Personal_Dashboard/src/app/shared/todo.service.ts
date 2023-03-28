import { Injectable, OnDestroy } from '@angular/core';
import { Todo } from './todo.model';
import { Subscription, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService implements OnDestroy {

  todos: Todo[] = []  

  demoTodos: Todo[] = [
    new Todo('Finish app main features.', '1'),
    new Todo('Add extra feature: Weather forecast in top left section of app.', '2'),
    new Todo('Add feature: Press escape to go to menu main pages.', '3'),
    new Todo('dark color background under background image so user isn\'t blinded during initial loading/', '4'),
  ]

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
      ////////////////////////////////  FOR DEMO  ///////////////////////////////
      this.demoTodos.forEach(todo => {                                         //
        if (!this.todos.find(todoInStorage => todoInStorage.id === todo.id)) { //
          if(todo.id === '1') todo.completed = true                            //
          this.todos.push(todo)                                                //
        }                                                                      //
      })                                                                       //
      ///////////////////////////////////////////////////////////////////////////
    } catch (error) {
      console.log('Error retrieving todos from local storage.')
      console.log(error)
    }
  }
}
