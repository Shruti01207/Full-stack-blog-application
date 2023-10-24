import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {


  id: string | null = null;
  paramSubscription?: Subscription;
  category?: Category;


  private activatedRoute = inject(ActivatedRoute);
  private categoryService = inject(CategoryService);

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
      }
    });

    if (this.id) {
      this.categoryService.getCategoryId(this.id).
        subscribe({
          next: (response) => {
            this.category = response;
          }
        });
    }

  }
  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
  }
  onSubmit(): void {
    console.log("called");
    console.log("category", this.category);
  }


}
