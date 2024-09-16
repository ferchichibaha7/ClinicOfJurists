import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';

@Table
export class Transaction extends Model {
  @ForeignKey(() => User)
  @Column
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @Column
  amount: number; // Transaction amount

  @Column
  token: string; // Currency token (e.g., 'TND')

  @Column
  method: string; // Payment method (e.g., 'bank_card')

  @Column
  status: string; // Transaction status (e.g., 'success')

  @Column
  transaction_date: Date; // Date and time of the transaction
}
