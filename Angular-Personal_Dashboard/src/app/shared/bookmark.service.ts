import { Injectable, OnDestroy } from '@angular/core';
import { Bookmark } from './bookmark.model';
import { Subscription, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService implements OnDestroy {

  bookmarks: Bookmark[] = [];

  storageListenSubscription: Subscription;

  constructor() {
    this.loadState()
    
    this.storageListenSubscription = fromEvent<StorageEvent>(window, 'storage')
    .subscribe((event: StorageEvent) => {
      if (event.key === 'bookmarks') this.loadState()
    })
  }

  ngOnDestroy(): void {
    this.storageListenSubscription.unsubscribe()
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
    } catch (error) {
      console.log('Error retrieving bookmarks from local storage.');
      console.log(error);
    }
  }
}