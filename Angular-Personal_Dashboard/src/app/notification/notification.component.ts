import { Component } from '@angular/core';
import { NotificationService } from '../shared/notification.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { NotificationData } from '../shared/notification-data.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('notificationAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('150ms 125ms ease-out')
      ]),
      transition(':leave', [
        animate(150, style({ opacity: 0, transform: 'scale(0.8)' }))
      ])
    ])
  ]
})
export class NotificationComponent {

  notification!: NotificationData[];

  timeout: any;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notification.subscribe((notification: NotificationData) => {
      this.notification = Array(notification);

      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        this.notification = null!;
      }, notification.duration);
    });
  }
}
