import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookmarkService } from '../shared/bookmark.service';
import { Bookmark } from '../shared/bookmark.model';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.scss']
})
export class AddBookmarkComponent {

  constructor(private bookmarkService: BookmarkService, private router: Router, private notificationService: NotificationService) { }

  onFormSubmit(form: NgForm) {
    if (form.invalid) return;

    const {name, url} = form.value;
    const bookmark = new Bookmark(name, url);

    this.bookmarkService.addBookmark(bookmark);
    this.router.navigateByUrl('/bookmarks');
    this.notificationService.display('Bookmark added', 1500);
  }

}
