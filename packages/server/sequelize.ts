import { Model, Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { LikeModel, TopicCommentModel, TopicModel, UserModel } from './models'
import SiteTheme from './models/SiteTheme'
import UserTheme from './models/UserTheme'

export default async function sequelize() {
  const sequelizeOptions: SequelizeOptions = {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    dialect: 'postgres',
    logging: false,
    models: [
      UserTheme,
      SiteTheme,
      TopicCommentModel,
      TopicModel,
      UserModel,
      LikeModel,
    ],
  }

  const sequelize = new Sequelize(sequelizeOptions)

  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: true })
    await SiteTheme.bulkCreate<Model<SiteTheme, { theme: string }>>([
      {
        theme: 'dark',
      },
      {
        theme: 'light',
      },
    ])
  } catch (e) {
    console.error('Соединение с базой не может быть установлено')
  }
}
