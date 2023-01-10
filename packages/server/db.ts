import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { TopicCommentModel, TopicModel, UserModel, LikeModel } from './models'

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  dialect: 'postgres',
  models: [UserModel, TopicModel, TopicCommentModel, LikeModel],
}

const sequelize = new Sequelize(sequelizeOptions)

export { sequelize }
