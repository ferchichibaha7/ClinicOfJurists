import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Subcategory } from './Subcategory';

@Table
export class Category extends Model {
  @Column
  name: string; // Category name

  @Column
  description: string; // Category description

  @HasMany(() => Subcategory)
  subcategories: Subcategory[];
}
