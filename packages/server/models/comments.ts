import {
  Model,
  Table,
  Column,
  DataType,
  AllowNull,
  BelongsTo,
} from 'sequelize-typescript'
import { UserModel } from './user'
import { TopicModel } from './topic'

type Comment = {
  topic_id: number
  parent_id: number | null
  user_id: number
  user_login: string
  comment: string
}

@Table({
  tableName: 'topic_comments',
})
export class TopicCommentModel extends Model<Comment> {
  @BelongsTo(() => TopicModel, {
    foreignKey: 'topic_id',
    as: 'topic',
  })
  topic_id: number | undefined

  @BelongsTo(() => TopicCommentModel, {
    foreignKey: 'parent_id',
    as: 'parent',
  })
  parent_id: number | null | undefined

  @BelongsTo(() => UserModel, {
    foreignKey: 'user_id',
    as: 'user',
  })
  user_id: number | undefined

  @AllowNull(false)
  @Column(DataType.STRING)
  user_login: string | undefined

  @AllowNull(false)
  @Column(DataType.STRING)
  comment: string | undefined
}
