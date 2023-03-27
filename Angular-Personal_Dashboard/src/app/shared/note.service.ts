import { Injectable, OnDestroy } from '@angular/core';
import { Note } from './note.model';
import { Subscription, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService implements OnDestroy{

  notes: Note[] = []
  storageListenSubscription: Subscription

  constructor() { 
    this.loadState(); 

    this.storageListenSubscription = fromEvent<StorageEvent>(window, 'storage')
      .subscribe((event: StorageEvent) => {
        if (event.key === 'notes') this.loadState()
      })
  }
  
  ngOnDestroy(): void {
    if (this.storageListenSubscription) this.storageListenSubscription.unsubscribe()
  }

  getNotes() {
    return this.notes
  }
  getNote(id: string) {
    return this.notes.find(note => note.id === id) //Returns note with matching id if it exists in the Notes array.
  }
  addNote(note: Note) {
    this.notes.push(note)
    this.saveState()
  }
  updateNote(id: string, updatedFields: Partial<Note>) {
    const note = this.getNote(id)
    Object.assign(note!, updatedFields)
    this.saveState()
  }
  deleteNote(id: string){
    //find index of note with matching id. Index needed to remove from Note[]
    const noteIndex = this.notes.findIndex(note => note.id === id)//<-- returns -1 if note id is not found
    if(noteIndex == -1) return
    this.notes.splice(noteIndex, 1)
    this.saveState()
  }

  saveState() {
    localStorage.setItem('notes', JSON.stringify(this.notes))
  }
  loadState() {
    try {
      const notesInStorage = JSON.parse(localStorage.getItem('notes')!)

      this.notes.length = 0 //Clears the array
      this.notes.push(...notesInStorage) //Adds notes from local storage to the array
    } catch (error) {
      console.log('Error retrieving notes from local storage.')
      console.log(error)
    }
  }
}
