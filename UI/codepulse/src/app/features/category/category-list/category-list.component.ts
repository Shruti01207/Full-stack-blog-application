import { Component, OnInit, inject } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  // categories?: Category[];
  categories$?:Observable<Category[ ]>;
  private category = inject(CategoryService);


  ngOnInit(): void {
   this.categories$=this.category.getAllCategories();
      // .subscribe({
      //   next: (response) => {
      //     this.categories = response;
      //   }
      // })
  }

 




}
