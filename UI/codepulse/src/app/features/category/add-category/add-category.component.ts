import { Component, OnDestroy, inject } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnDestroy {

  model: AddCategoryRequest;
  private addCategorySubcription?:Subscription;

  private category = inject(CategoryService);
  private router=inject(Router);

  constructor() {
    this.model = {
      name: 'Shruti',
      urlHandle: ' '
    };
  }
  ngOnDestroy(): void {
    this.addCategorySubcription?.unsubscribe( );
  }


  onFormSubmit() {
    this.addCategorySubcription=this.category.addCategory(this.model)
   .subscribe((result )=>{
     this.router.navigateByUrl('/admin/categories');
    });
  }

}
