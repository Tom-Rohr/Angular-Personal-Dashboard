import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component, Query } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[
    trigger('routeAnimations', [    //<---Trigger
      transition('* => *', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            width: '100%',
            height: '100%'
          })
        ],{optional: true}),
        group([
          query(':leave', [
            animate('300ms ease-in', style({

              opacity: 0,
              transform: 'translateX(-100px)' //<-- Setting position to move to by the time the element completely disappears
            }))
          ], {optional: true}),
          query(':enter', [
            style({
              transform: 'translateX(100px)', //<-- Setting where to start animation relative to element's position
              opacity: 0
            }),
            animate('300ms ease-in', style({
              opacity: 1,
              transform: 'translateY(0)' //<-- Setting position of element at end of animation
            }))
          ], {optional: true})
        ]),
      ])
    ])
  ]
})
export class AppComponent {
  prepareRoute(outlet: RouterOutlet){
    if (outlet.isActivated) 
      return outlet.activatedRoute.snapshot.url
    else return outlet.deactivate(); //Band-aid fix;
  }
}
