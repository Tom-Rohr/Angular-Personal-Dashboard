import { Component, OnInit } from '@angular/core';
import { NoteService } from '../shared/note.service';
import { Note } from '../shared/note.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit{

  notes!: Note[]

  constructor(private noteService: NoteService) {

  }
  async ngOnInit() {
    this.notes = await this.noteService.getNotes()
  }
}
