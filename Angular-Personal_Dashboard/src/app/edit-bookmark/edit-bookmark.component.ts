import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../shared/bookmark.service';
import { Bookmark } from '../shared/bookmark.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.scss']
})
export class EditBookmarkComponent implements OnInit{

  bookmark?: Bookmark;

  constructor(private bookmarkService: BookmarkService, private route: ActivatedRoute, private router: Router) { }
 
  onFormSubmit(form: NgForm) {
    const {name, url} = form.value;
    this.bookmarkService.updateBookmark(this.bookmark!.id, {
      name,
      url: new URL(url)
    });
  }

  delete(){
    this.bookmarkService.deleteBookmark(this.bookmark!.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.bookmark = this.bookmarkService.getBookmark(id!);
    })
  }
}
