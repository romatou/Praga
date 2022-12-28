import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import SiteTheme from './models/SiteTheme'
import UserTheme from './models/UserTheme'

export default function sequelize() {
  const sequelizeOptions: SequelizeOptions = {
    host: 'localhost',
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    dialect: 'postgres',
  }

  const sequelize = new Sequelize(sequelizeOptions)
  sequelize.addModels([UserTheme, SiteTheme])

  sequelize.sync({ force: true })
}
