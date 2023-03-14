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
        // style({
        //   position: 'relative'
        // }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            width: '100%',
            height: '100%'
          })
        ],{optional: true}),
        query(':enter', [
          style({
            opacity: 0,
          })
        ],{optional: true}),
        group([
          query(':leave', [
            animate(200, style({
              opacity: 0
            }))
          ], {optional: true}),
          query(':enter', [
            animate(200, style({
              opacity: 1
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
