import {
  AllowNull,
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
} from 'sequelize-typescript'
import { UserModel } from './user'

type Topic = {
  user_id: number
  title: string
  description?: string
}

@Table({
  tableName: 'topics',
})
export class TopicModel extends Model<Topic> {
  @AllowNull(false)
  @Column(DataType.STRING)
  title: string | undefined

  @AllowNull(true)
  @Column(DataType.STRING)
  description: string | undefined

  @BelongsTo(() => UserModel, {
    foreignKey: 'user_id',
    as: 'user',
  })
  user_id: number | undefined
}
