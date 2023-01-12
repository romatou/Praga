import { Model, Table, Column, DataType, AllowNull } from 'sequelize-typescript'

export type User = {
  id: number
  login: string
}

@Table({
  tableName: 'users',
})
export class UserModel extends Model<User> {
  @AllowNull(false)
  @Column(DataType.STRING)
  login: string | undefined
}
