import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Query } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, map, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[
    trigger('routeAnimations', [    //<---Trigger
      transition(':increment', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            width: '100%',
            height: '100%'
          })
        ],{optional: true}),
        group([
          query(':leave', [
            animate('250ms ease-in', style({

              opacity: 0,
              transform: 'translateX(-100px)' //<-- Setting position to move to by the time the element completely disappears
            }))
          ], {optional: true}),
          query(':enter', [
            style({
              transform: 'translateX(100px)', //<-- Setting where to start animation relative to element's position
              opacity: 0
            }),
            animate('250ms ease-in', style({
              opacity: 1,
              transform: 'translateX(0)' //<-- Setting position of element at end of animation
            }))
          ], {optional: true})
        ]),
      ]),
      transition(':decrement', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            width: '100%',
            height: '100%'
          })
        ],{optional: true}),
        group([
          query(':leave', [
            animate('250ms ease-in', style({

              opacity: 0,
              transform: 'translateX(100px)' //<-- Setting position to move to by the time the element completely disappears
            }))
          ], {optional: true}),
          query(':enter', [
            style({
              transform: 'translateX(-100px)', //<-- Setting where to start animation relative to element's position
              opacity: 0
            }),
            animate('250ms ease-in', style({
              opacity: 1,
              transform: 'translateX(0)' //<-- Setting position of element at end of animation
            }))
          ], {optional: true})
        ]),
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  
dateTime?: Observable<Date>

  ngOnInit(): void {

    this.dateTime = timer(0, 1000).pipe(
      map(() => new Date())
    )
  }

  prepareRoute(outlet: RouterOutlet){
      return outlet.activatedRouteData['tab']
  }
}
