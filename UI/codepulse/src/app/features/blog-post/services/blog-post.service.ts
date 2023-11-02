import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BlogPost } from '../model/blogpost.model';
import { Observable } from 'rxjs';
import { AddBlogPost } from '../model/add-blogpost.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  private http = inject(HttpClient);

  constructor() { }

  createBlogPost(body: AddBlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${environment.apiBaseUrl}/api/BlogPosts`, body);
  }

  getBlogPost(): Observable<BlogPost[]> {

    return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/BlogPosts`);

  }


}
