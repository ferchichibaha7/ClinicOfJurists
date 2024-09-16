import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { UserQuizzes } from './UserQuizzes';
import { Question } from './Question';
import { Option } from './Option';

@Table
export class UserAnswers extends Model {
  
  @ForeignKey(() => UserQuizzes)
  @Column
  user_quiz_id: number;

  @ForeignKey(() => Question)
  @Column
  question_id: number;

  @ForeignKey(() => Option)
  @Column
  option_id: number;

  @Column
  answer_text: string;

  @BelongsTo(() => UserQuizzes)
  userQuiz: UserQuizzes;

  @BelongsTo(() => Question)
  question: Question;

  @BelongsTo(() => Option)
  option: Option;
}
