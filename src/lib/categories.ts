// lib/categories.ts
import Category from '../models/Category';

export async function getCategories() {
  return await Category.find();
}

export async function getCategoryByName(name: string) {
  return await Category.findOne({ name });
}

export async function createCategory(name: string, description?: string) {
  const category = new Category({ name, description });
  return await category.save();
}
