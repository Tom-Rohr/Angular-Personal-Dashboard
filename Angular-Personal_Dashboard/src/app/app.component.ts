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
    ]),

    trigger('backgroundAnimations', [
      transition(':leave', [
        animate(1000, style({
          opacity: 0
        }))
      ])
    ]),

    trigger('fadeAnimation', [
      transition(':enter', [
        style({opacity: 0}),
        animate(1000, style({
          opacity: 1
        }))
      ])
    ]),
    
  ]
})
export class AppComponent implements OnInit {
  
dateTime?: Observable<Date>

backgrounds: string [] = [
  // "https://images.unsplash.com/photo-1679171915269-07013ad0e524?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=2160&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3OTk0OTA5Mw&ixlib=rb-4.0.3&q=80&w=3840"
]
loadingBackground: boolean = false

  ngOnInit(): void {

    this.dateTime = timer(0, 1000).pipe(
      map(() => new Date())
    )

    this.changeBackgroundImg()
  }

  prepareRoute(outlet: RouterOutlet){
      return outlet.activatedRouteData['tab']
  }

  async changeBackgroundImg(): Promise<void>{
    this.loadingBackground = true
    const result = await fetch('https://source.unsplash.com/random/3840x2160', {
      method: 'HEAD' //get url of image
    })

    const alreadyLoaded = this.backgrounds.includes(result.url)
    if(alreadyLoaded){
      return this.changeBackgroundImg()
    }

    this.backgrounds.push(result.url)
  }

  onBackgroundLoad(imageEvent: Event){
    const imageElement = imageEvent.target as HTMLImageElement
    const source = imageElement.src

    this.backgrounds = [source]
    this.loadingBackground = false
  }
}
