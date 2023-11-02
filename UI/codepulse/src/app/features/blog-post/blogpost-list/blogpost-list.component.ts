import { Component, OnInit, inject } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../model/blogpost.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {
  
  blogPosts?:BlogPost[ ];
  $blogPostServiceSubscription?:Subscription;
  private blogPostService= inject(BlogPostService);
  

  
  ngOnInit(): void {
   this.getBlogPost( );  
  }

  getBlogPost( ){

    this.$blogPostServiceSubscription=this.blogPostService.getBlogPost( ).subscribe({
      next:(response)=>{
        console.log("api response",response);
        this.blogPosts=response;
      }
    })


  }



}
