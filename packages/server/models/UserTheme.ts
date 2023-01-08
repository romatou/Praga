import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import SiteTheme from './SiteTheme'

export type TUserTheme = {
  themeId: number
  userId: number
}

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_theme',
})
export default class UserTheme extends Model<TUserTheme> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number

  @ForeignKey(() => SiteTheme)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  themeId: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId: number
}
