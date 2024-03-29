import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent {

  constructor(private noteService: NoteService, private router: Router, private notificationService: NotificationService) { }
  
  onFormSubmit(form: NgForm) {
    console.log(form)

    if(form.invalid) return alert("The new note must have a title.")

    const note = new Note(form.value.title, form.value.content)

    this.noteService.addNote(note)
    this.router.navigateByUrl("/notes")
    this.notificationService.display("Note added", 1500)
  }
}
