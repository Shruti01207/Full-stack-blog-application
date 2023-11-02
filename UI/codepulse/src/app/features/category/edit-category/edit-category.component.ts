import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {


  id: string | null = null;
  paramSubscription?: Subscription;
  category?: Category;
  editCategorySubcription?: Subscription;
  deleteCategorySubcription?: Subscription;

  private activatedRoute = inject(ActivatedRoute);
  private categoryService = inject(CategoryService);
  private route = inject(Router);

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
    this.editCategorySubcription?.unsubscribe();
    this.deleteCategorySubcription?.unsubscribe();
  }

  onSubmit(): void {
    const updateCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name ?? ' ',
      urlHandle: this.category?.urlHandle ?? ' '
    }
    if (this.id) {
      this.editCategorySubcription = this.categoryService.updateCategory(this.id, updateCategoryRequest).
        subscribe({
          next: (response) => {
            this.route.navigateByUrl('/admin/categories');
          }
        });
    }
  }
  onDelete(id: string): void {

   this.deleteCategorySubcription=this.categoryService.deleteCategory(id).
      subscribe({
        next: (response) => {
          this.route.navigateByUrl('/admin/categories');
        }
      });

  }

}
