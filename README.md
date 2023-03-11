# Angular-Personal-Dashboard

# Part 1 Notes

### <ins>SCSS, html and intro to components.</ins>

-start new angular project with scss: 'ng new Project-Name --style=scss --routing'

-SCSS allows for nested styling  
-text-shadow: xOffset yOffset blurVal color

```css
.top-section-timeDate {
  background-color: purple;
  text-align: center;
  padding: 100px 0 50px;

  h1 {
    font-size: 100px;
    font-weight: bold;
    color: azure;
    text-shadow: 0px 1px 7px rgba(black, 0.1);
  }
  h2 {
    font-size: 30px;
    color: white;
    text-shadow: 0px 1px 7px rgba(black, 0.2);
  }
}
```

-Creating new tabs component for bottom-menu: 'ng generate component tabs'  
creates new 'tabs folder in the 'app' folder.'

-Using the tabs component in the app component.

```html
<div class="bottom-section-tabMenu">
  <app-tabs></app-tabs>
</div>
```

-Utilizing material icons for menu tabs https://fonts.google.com/icons?icon.query=bookmark&selected=Material+Symbols+Outlined:bookmarks:FILL@0;wght@400;GRAD@0;opsz@48

```css
@import url("https://fonts.googleapis.com/css?family=Material+Icons+Outlined");
```

```html
<div class="tabs-container">
  <div class="tab bookmarks-tab">
    <div class="tab-tile">
      <i class="material-icons-outlined">bookmarks</i>
    </div>
  </div>
  <div class="tab todos-tab">
    <div class="tab-tile">
      <i class="material-icons-outlined">check</i>
    </div>
  </div>
  <div class="tab notes-tab">
    <div class="tab-tile">
      <i class="material-icons-outlined">notes</i>
    </div>
  </div>
</div>
```

-Using image at URL for background. Will eventually call Unsplash API for different pics every so often.

```css
background-image: url("https://images.unsplash.com/photo-1678106761955-77e51d446699?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=2160&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3ODQ5MjkwNA&ixlib=rb-4.0.3&q=80&w=3840");
background-size: cover;
background-repeat: no-repeat;
background-position: center;
background-attachment: fixed;
```

### <ins>Routes and routerLink</ins>

-Setting routes in src/app/app-routing.module.ts after creating bookmars, todos and notes components.

```ts
import { BookmarksComponent } from "./bookmarks/bookmarks.component";
import { NotesComponent } from "./notes/notes.component";
import { TodosComponent } from "./todos/todos.component";

const routes: Routes = [
  { path: "bookmarks", component: BookmarksComponent },
  { path: "todos", component: TodosComponent },
  { path: "notes", component: NotesComponent },
];
```

Changing tabs from divs to anchors. Setting <ins>routerLink</ins> properties accordingly. Set <ins>routerLinkActive</ins> to "selected" so the selected class appears on the element when clicked.

```html
<div class="tabs-container">
  <a
    routerLink="bookmarks"
    routerLinkActive="selected"
    class="tab bookmarks-tab"
  >
    <div class="tab-tile">
      <i class="material-icons-outlined">bookmarks</i>
    </div>
  </a>
  <a routerLink="todos" routerLinkActive="selected" class="tab todos-tab">
    <div class="tab-tile">
      <i class="material-icons-outlined">check</i>
    </div>
  </a>
  <a routerLink="notes" routerLinkActive="selected" class="tab notes-tab">
    <div class="tab-tile">
      <i class="material-icons-outlined">notes</i>
    </div>
  </a>
</div>
```

Now I can start to style the selected tile to be circular.

```scss
.tab.selected .tab-tile::before {
  border-radius: 50%;
}
```
