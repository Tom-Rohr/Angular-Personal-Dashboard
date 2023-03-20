import { Injectable } from '@angular/core';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  notes: Note[] = [
    new Note('TestTitle', 'Test body of text to be stored in the test note. test test test test test'),
    new Note('TestTitle2', 'Test body of text to be stored in the test note. test test test test test')
  ]

  constructor() { }

  getNotes() {
    return this.notes
  }
  getNote(id: string) {
    return this.notes.find(note => note.id === id) //Returns note with matching id if it exists in the Notes array.
  }
  addNote(note: Note) {
    this.notes.push(note)
  }
  updateNote(id: string, updatedFields: Partial<Note>) {
    const note = this.getNote(id)
    Object.assign(note!, updatedFields)
  }
  deleteNote(id: string){
    //find index of note with matching id. Index needed to remove from Note[]
    const noteIndex = this.notes.findIndex(note => note.id === id)//<-- returns -1 if note id is not found
    if(noteIndex == -1) return
    this.notes.splice(noteIndex, 1)
  }
}
