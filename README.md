# Angular-Personal-Dashboard

## <ins> Add Note UI</ins>

Generated new component for the add-note UI

```terminal
    ng generate component add-note
```

In app-routing.module.ts  
Add 'add-note' component to routes.

```ts
const routes: Routes = [
  { path: "bookmarks", component: BookmarksComponent, data: { tab: 0 } },
  { path: "todos", component: TodosComponent, data: { tab: 1 } },
  { path: "notes", component: NotesComponent, data: { tab: 2 } },
  { path: "notes/add", component: AddNoteComponent },
];
```

Add routerLink to 'Add' button in notes.component.html

```ts
<div class="btns-container btns-centered">
  <a routerLink="add" class="btn add-btn">
    <i class="material-icons-outlined">add</i>
    Add
  </a>
</div>
```

in add-note.component.html
Create wrapper for add-note. Reuse container class and create another global style for blurred white background.

create form element containing an input, text area, button container and buttons.

```html
<div class="add-note-wrapper has-blurred-white-bg container">
  <h2>New Note</h2>
  <form>
    <input
      type="text"
      class="textbox"
      placeholder="Enter title for new note..."
    />
    <textarea class="textarea" placeholder="Enter note..."></textarea>
    <div class="btns-container">
      <button routerLink="../" class="btn">Cancel</button>
      <button class="btn align-end">Add Note</button>
    </div>
  </form>
</div>
```

Styling add-note-wrapper in add-note.component.scss

```scss
.add-note-wrapper {
  max-height: 100%; //<-- stops from overflowing out of body
  overflow: auto; //<-- gives a scroll-bar where note would overflow
  padding: 40px;
  border-radius: 8px;
}
```

Style other elements globally as they will be reused.

```scss
.has-blurred-white-bg {
  background: rgba(white, 0.8);
  backdrop-filter: blur(15px);
}

.textbox,
.textarea {
  display: block;
  font-size: 16px;
  padding: 8px 2px;
  margin-bottom: 15px;
  width: 100%;
  border-radius: 3px;
  outline-style: solid;
  outline-width: 1px;
  background: rgba(white, 0.8);

  &:hover {
    background: rgba(white, 0.9);
  }
  &:focus {
    background: rgba(white, 1);
    outline-width: 2px;
  }
}
.textarea {
  resize: vertical;
  min-height: 150px;
}
```

## <ins> Creating Note Service </ins>

created 'shared' folder in app folder.  
generated new 'note' service inside of newly created shared folder

```terminal
ng generate service shared/note
```

created new note.model.ts class inside shared folder

```ts
import { v4 as uuidv4 } from "uuid";

export class Note {
  id: string;
  title: string;
  content: string;

  constructor(title: string, content: string) {
    this.id = uuidv4();
    this.title = title;
    this.content = content;
  }
}
```

Using UUID to uniquely identify each note

```terminal
npm install uuid --save
```

In note.service.ts write service which stores and manages an array of Notes.

```ts
import { Injectable } from "@angular/core";
import { Note } from "./note.model";

@Injectable({
  providedIn: "root",
})
export class NoteService {
  notes!: Note[];

  constructor() {}

  getNotes() {
    return this.notes;
  }
  getNote(id: string) {
    return this.notes.find((note) => note.id === id); //Returns note with matching id if it exists in the Notes array.
  }
  addNote(note: Note) {
    this.notes.push(note);
  }
  updateNote(id: string, updatedFields: Partial<Note>) {
    const note = this.getNote(id);
    Object.assign(note!, updatedFields);
  }
  deleteNote(id: string) {
    //find index of note with matching id. Index needed to remove from Note[]
    const noteIndex = this.notes.findIndex((note) => note.id === id); //<-- returns -1 if note id is not found
    if (noteIndex == -1) return;
    this.notes.splice(noteIndex, 1);
  }
}
```

In notes.component.ts, implement OnInit interface and configure implementation of notes service.

```ts
import { Component, OnInit } from "@angular/core";
import { NoteService } from "../shared/note.service";
import { Note } from "../shared/note.model";

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.scss"],
})
export class NotesComponent implements OnInit {
  notes!: Note[];

  constructor(private noteService: NoteService) {} //<-- 'Injecting' NoteService
  ngOnInit(): void {
    //this.notes = this.noteService.getNotes(); //<-- must remove this exception to populate Note[]?
  }
}
```

create new component for note cards

```terminal
ng generate component note-card
```

move html for note title and content to note-card.component.html

```html
<div class="note-card">
  <div class="note-card-title">{{ note.title }}</div>
  <!-- *ngIf="note.content" will hide the content element completely if the note has only a title and no content -->
  <div class="note-card-content" *ngIf="note.content">{{ note.content }}</div>
</div>
```

In notes.component.html add injection site for note-card components  
ngFor="let note of notes" allows for iteration over the collection of Note objects and populate the notes-list element with their respective note-cards.

```html
<div class="notes-wrapper">
  <div class="container">
    <div class="notes-list">
      <!-- HERE -->
      <app-note-card *ngFor="let note of notes" [note]="note"></app-note-card>
      <!---------->
    </div>
    <div class="btns-container btns-centered">
      <a routerLink="add" class="btn add-btn">
        <i class="material-icons-outlined">add</i>
        Add
      </a>
    </div>
  </div>
</div>
```

Move note-card styling code from notes.component.scss to note-card.component.scss  
Give note-cards a margin-bottom so they have some spacing

```scss
app-note-card {
  display: block; //<--- Specify display: block b/c angular sets inline by default
  margin-bottom: 10px;
}
```

## <ins> 'Wiring up' add-note form </ins>

In app.module.ts import FormsModule and add it to the imports array.

```ts
import { FormsModule } from "@angular/forms";
//...
//...
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule //<--
  ],
//...
```

In add-note.component.ts add a contructor to inject the NoteService and Router. Also create a method for submitting a new note.

```ts
export class AddNoteComponent {
  constructor(private noteService: NoteService, private router: Router) {}
  onFormSubmit(form: NgForm) {
    const note = new Note(form.value.title, form.value.content);
    console.log(note);

    this.noteService.addNote(note);
    this.router.navigateByUrl("/notes"); //<--exit add-note and return to notes main menu
  }
}
```

In add-note.component.html add the 'ngSubmit' event to the form so the method created above fires when a submission is made(Add Note is clicked).

Create 'template variable' to access for values in the onFormSubmit method (#form="ngForm").

Add ngModel to title input and content text area properties and give them names (name="title"/name="content")

```html
<div class="add-note-wrapper has-blurred-white-bg container">
  <h2>New Note</h2>
  <!--Can use ngSubmit and ngForm on the template variable thanks to FormsModule-->
  <form #form="ngForm" (ngSubmit)="onFormSubmit(form)">
    <!---------------------Using newly created onFormSubmit() method-------------->
    <input
      ngModel
      name="title"
      type="text"
      class="textbox"
      placeholder="Enter title for new note..."
    />
    <textarea
      class="textarea"
      ngModel
      name="content"
      placeholder="Enter note..."
    ></textarea>
    <div class="btns-container">
      <button routerLink="../" class="btn">Cancel</button>
      <button class="btn align-end">Add Note</button>
    </div>
  </form>
</div>
```
