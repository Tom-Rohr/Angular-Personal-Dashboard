import { Injectable, OnDestroy } from '@angular/core';
import { Bookmark } from './bookmark.model';
import { Subscription, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService implements OnDestroy {

  bookmarks: Bookmark[] = [];

  demoBookmarks: Bookmark[] = [
    new Bookmark('Google', 'https://www.google.com', '1'),
    new Bookmark('YouTube', 'https://www.youtube.com', '2'),
    new Bookmark('Tom-Rohr GitHub', 'https://github.com/Tom-Rohr', '3'),
    new Bookmark('Tom Rohr LinkedIn', 'https://www.linkedin.com/in/tom-rohr-abc/', '4'),
    new Bookmark('Reddit', 'https://www.reddit.com', '5'),
    new Bookmark('Stack Overflow', 'https://stackoverflow.com', '6'),
    new Bookmark('Wikipedia', 'https://www.wikipedia.org', '7'),
    new Bookmark('Amazon', 'https://www.amazon.com', '8'),
    new Bookmark('Ebay', 'https://www.ebay.com', '9'),
    
  ]

  storageListenSubscription: Subscription;

  constructor() {
    this.loadState()
    
    this.storageListenSubscription = fromEvent<StorageEvent>(window, 'storage')
    .subscribe((event: StorageEvent) => {
      if (event.key === 'bookmarks') this.loadState()
    })
  }

  ngOnDestroy(): void {
    if (this.storageListenSubscription) this.storageListenSubscription.unsubscribe()
  }

  getBookmarks() {
    return this.bookmarks;
  }

  getBookmark(id: string) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  }

  addBookmark(bookmark: Bookmark) {
    this.bookmarks.push(bookmark);
    this.saveState();
  }

  updateBookmark(id: string, updatedFields: Partial<Bookmark>) { 
    const bookmark = this.getBookmark(id);
    Object.assign(bookmark!, updatedFields);
    this.saveState();
  }

  deleteBookmark(id: string) {
    const bookmarkIndex = this.bookmarks.findIndex(bookmark => bookmark.id === id);
    if (bookmarkIndex == -1) return;
    this.bookmarks.splice(bookmarkIndex, 1)
    this.saveState();
  }

  saveState() {
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
  }
  
  loadState() {
    try {
      // JSON.parse() will call the reviver function for each key/value pair in the object. This ensures favicons will be displayed after reload (if available).
      const bookmarksInStorage = JSON.parse(localStorage.getItem('bookmarks')!, (key, value) => {
        if (key === 'url') return new URL(value);
        return value;
      });
      this.bookmarks.length = 0; // clear the array while keeping the reference
      this.bookmarks.push(...bookmarksInStorage);
      ////////////////////////////////  FOR DEMO  ///////////////////////////////
      this.demoBookmarks.forEach(bookmark => {                                         
        if (!this.bookmarks.find(bookmarkInStorage => bookmarkInStorage.id === bookmark.id)) {                   
          this.bookmarks.push(bookmark)                                                
        }                                                                      
      })                                                                       
      ///////////////////////////////////////////////////////////////////////////
    } catch (error) {
      console.log('Error retrieving bookmarks from local storage.');
      console.log(error);
    }
  }
}