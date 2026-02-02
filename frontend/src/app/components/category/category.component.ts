import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from "@angular/forms";
import { SharedModule } from '../../shared/shared.module';
import { CategoryService } from '../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category',
  imports: [FormsModule, SharedModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
  categoryForm!: FormGroup;
  categories: any[] = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private cs: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      category_name: ['', Validators.required]
    });

    this.loadCategories();
  }

  loadCategories() {
    this.cs.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data;
      },
      error: () => {
        this.showSnack('Failed to load categories', 'error');
      }
    });
  }

  submit() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    this.cs.addCategory(this.categoryForm.value).subscribe({
      next: (res: any) => {
        // ✅ REAL-TIME update
        this.categories.unshift({
          id: res.category_id,
          category_name: this.categoryForm.value.category_name
        });

        this.categoryForm.reset();
        this.showSnack('Category added successfully', 'success');
        this.isSubmitting = false;
      },
      error: () => {
        this.showSnack('Failed to add category', 'error');
        this.isSubmitting = false;
      }
    });
  }

  deleteCategory(id: number) {
    this.cs.deleteCategory(id).subscribe({
      next: () => {
        // ✅ REAL-TIME delete
        this.categories = this.categories.filter(c => c.id !== id);
        this.showSnack('Category deleted', 'success');
      },
      error: () => {
        this.showSnack('Delete failed', 'error');
      }
    });
  }

  private showSnack(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type
    });
  }

  get f() {
    return this.categoryForm.controls;
  }
}