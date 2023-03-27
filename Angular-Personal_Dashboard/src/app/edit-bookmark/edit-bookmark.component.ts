import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../shared/bookmark.service';
import { Bookmark } from '../shared/bookmark.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.scss']
})
export class EditBookmarkComponent implements OnInit{

  bookmark?: Bookmark;

  constructor(private bookmarkService: BookmarkService, private route: ActivatedRoute, private router: Router, private notificationService: NotificationService) { }
 
  onFormSubmit(form: NgForm) {
    const {name, url} = form.value;
    this.bookmarkService.updateBookmark(this.bookmark!.id, {
      name,
      url: new URL(url)
    });
    this.notificationService.display('Bookmark updated', 1500);
  }

  delete(){
    this.bookmarkService.deleteBookmark(this.bookmark!.id);
    this.router.navigate(['../'], {relativeTo: this.route});
    this.notificationService.display('Bookmark deleted', 1500);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.bookmark = this.bookmarkService.getBookmark(id!);
    })
  }
}
