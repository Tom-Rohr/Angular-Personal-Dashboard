import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationData } from './notification-data.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notification$: Subject<NotificationData> = new Subject();

  constructor() { }

  get notification() {
    return this.notification$.asObservable();
  }

  display(text: string, duration = 3000) {
    this.notification$.next({text, duration});
  }
}
