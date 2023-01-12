import {
  Model,
  Table,
  Column,
  DataType,
  AllowNull,
  BelongsTo,
} from 'sequelize-typescript'
import { UserModel } from './user'
import { TopicCommentModel } from './comments'

export type Like = {
  user_id: number
  comment_id: number
  isLike: boolean
}

@Table({
  tableName: 'likes',
})
export class LikeModel extends Model<Like> {
  @AllowNull(true)
  @Column(DataType.BOOLEAN)
  isLike: boolean | undefined

  @BelongsTo(() => UserModel, {
    foreignKey: 'user_id',
    as: 'user',
  })
  user_id: number | undefined

  @BelongsTo(() => TopicCommentModel, {
    foreignKey: 'comment_id',
    as: 'comment',
  })
  comment_id: number | undefined
}
