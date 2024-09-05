import { Table, Column, Model, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { Role } from './Role'

@Table
export class User extends Model {
  @Column
  name: string

  @Column
  password: string

  @Column
  email: string

  @Column
  google_id: string

  @Column
  picture: string

  @Column
  phone_number: string

  @Column
  active: boolean

  @ForeignKey(() => Role)
  @Column
  role_id: number

  @BelongsTo(() => Role)
  role: Role

}