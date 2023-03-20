import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent {

  constructor(private noteService: NoteService, private router: Router) { }
  
  onFormSubmit(form: NgForm) {
    const note = new Note(form.value.title, form.value.content)
    console.log(note)

    this.noteService.addNote(note)
    this.router.navigateByUrl("/notes")
  }
}
