import { Injectable, OnDestroy } from '@angular/core';
import { Note } from './note.model';
import { Subscription, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService implements OnDestroy{

  notes: Note[] = []

  demoNotes: Note[] = [
    new Note('Note Title 1', 'This is a note.', '1'),
    new Note('Note Title No Body Needed', '', '2'),
    new Note('Note Title Long', ' Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus', '3'),
  ]
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
      ////////////////////////////////  FOR DEMO  ///////////////////////////////
      this.demoNotes.forEach(note => {                                         
        if (!this.notes.find(notesInStorage => notesInStorage.id === note.id)) {                   
          this.notes.push(note)                                                
        }                                                                      
      })                                                                       
      ///////////////////////////////////////////////////////////////////////////
    } catch (error) {
      console.log('Error retrieving notes from local storage.')
      console.log(error)
    }
  }
}
