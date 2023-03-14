# Angular-Personal-Dashboard

## <ins>GUI</ins>

-Using SCSS feature to write &:hover and &:active as nested styles instead of having to use new blocks.

```scss
.bookmark-tile {
  background: rgba(black, 0.5);
  border-radius: 1rem;
  width: 110px;
  height: 110px;
  padding: 8px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;

  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background-color: rgba(black, 0.7);
    backdrop-filter: blur(3px);
  }
  &:active {
    background-color: rgba(black, 0.8);
    transform: translateY(2px);
    transition: 0;
  }
}
```

-Styling that stops text from wrapping and/or overflowing and places ellipses before it happens.

```scss
.tile-text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.95);

  overflow: hidden;
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

-Adding min-height of 0 to stop menu from being pushed down and enables a scroll-bar when overflow-y: auto; is set on the bookmarks-wrapper.

app.component.scss

```scss
.middle-section-content {
  flex-grow: 1;
  min-height: 0; //<---
}
```

bookmarks.component.scss

```scss
.bookmarks-wrapper {
  height: 100%;
  overflow-y: auto; //<---
}
```

## <ins>Route Transition Animations</ins>

-Declaring route animations at component injection element (div containing router-outlet).  
and creating a template variable named "outlet", storing the router-outlet element, that will be passed to the prepareRoute(RouterOutlet) method.

app.component.html

```html
<div class="main">
  <div class="top-section-timeDate">
    <h1>42:42</h1>
    <h2>10 March 2023</h2>
  </div>
  <div class="middle-section-content" [@routeAnimations]="prepareRoute(outlet)">
    <router-outlet #outlet="outlet"></router-outlet>
  </div>
  <div class="bottom-section-tabMenu">
    <app-tabs></app-tabs>
  </div>
</div>
```

-Creating prepareRoute method. Need to add import statements to use RouterOutlet and trigger().

-setting up trigger named 'routeAnimations' that takes an array of animation meta-data.

added to <ins>app.component.ts</ins>. Deleted default export class AppComponent implementation.

```ts
import {
  animate,
  query,
  style,
  transition,
  trigger,
} from "@angular/animations"; //<-- Not imported by default
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [trigger("routeAnimations", [])],
})
export class AppComponent {
  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) {
      return outlet.activatedRoute.snapshot.url;
    } else return outlet.deactivate(); //<--Bandaid fix.
  }
}
```

-Add import statement to app.module.ts
-add to imports: [...,..,..]

```ts
import { BrowserAnimationsModule } from '@angular/platform-browser-animations';
 //...
   imports: [
    BrowserModule,
    AppRoutingModule
    BrowserAnimationsModule //<---
  ],
  //...

```
