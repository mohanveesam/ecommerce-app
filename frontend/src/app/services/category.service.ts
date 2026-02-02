import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private api: ApiService) { }

  addCategory(data: any) {
    return this.api.post('category', data);
  }

  getCategories() {
    return this.api.get('category');
  }

  deleteCategory(id: number) {
    return this.api.delete(`category/${id}`);
  }
}
