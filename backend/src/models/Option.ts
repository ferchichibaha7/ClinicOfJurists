import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Question } from './Question';

@Table
export class Option extends Model {
  @Column
  text: string; // Option text

  @ForeignKey(() => Question)
  @Column
  question_id: number;

  @BelongsTo(() => Question)
  question: Question;
}
