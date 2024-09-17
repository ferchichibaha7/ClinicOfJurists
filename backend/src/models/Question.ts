import { Table, Column, Model, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Quiz } from './Quiz';
import { Option } from './Option';

@Table
export class Question extends Model {
  @Column
  text: string; // Question text

  @ForeignKey(() => Quiz)
  @Column
  quiz_id: number;

  @BelongsTo(() => Quiz)
  quiz: Quiz;

  @HasMany(() => Option)
  options: Option[];

  @Column
  correct_answer: number; // Stores the ID of the correct Option

  @Column
  desc_answer: string; // Question text
}
