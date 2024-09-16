import { Table, Column, Model, HasMany, ForeignKey } from 'sequelize-typescript';
import { Question } from './Question';
import { Subcategory } from './Subcategory'; // Assuming you have a Subcategory model

@Table
export class Quiz extends Model {
  @Column
  title: string;

  @Column
  description: string;

  @ForeignKey(() => Subcategory)
  @Column
  subcategory_id: number;

  @HasMany(() => Question)
  questions: Question[];
}
