import { Component, OnDestroy, inject } from '@angular/core';
import { AddBlogPost } from '../model/add-blogpost.model';
import { BlogPostService } from '../services/blog-post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnDestroy {

  model: AddBlogPost;

  private blogPostService= inject(BlogPostService)
  private $blogPostServiceSubcription?:Subscription

  constructor() {

    this.model = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date()
    };

  }
  ngOnDestroy(): void {
    this.$blogPostServiceSubcription?.unsubscribe( );
  }





  onFormSubmit() {
    this.$blogPostServiceSubcription=this.blogPostService.createBlogPost(this.model).subscribe({
      next:(responses)=>{
        console.log("created blog",responses);
      }
    })
  }












}
