import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';
import { Quiz } from './Quiz';

@Table
export class UserQuizzes extends Model {
  @ForeignKey(() => User)
  @Column
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Quiz)
  @Column
  quiz_id: number;

  @BelongsTo(() => Quiz)
  quiz: Quiz;

  @Column
  score: number; // Score of the user in the quiz

  @Column
  questions_answered: number; // Number of questions answered by the user
}
