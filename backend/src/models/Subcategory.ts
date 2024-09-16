import { Table, Column, Model, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Category } from './Category';
import { Quiz } from './Quiz';

@Table
export class Subcategory extends Model {
  @Column
  name: string; // Subcategory name

  @Column
  description: string; // Subcategory description

  @ForeignKey(() => Category)
  @Column
  category_id: number;

  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => Quiz)
  quizzes: Quiz[];
}
