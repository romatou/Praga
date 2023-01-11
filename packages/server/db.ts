import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { TopicCommentModel, TopicModel, UserModel } from './models'

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  dialect: 'postgres',
  models: [UserModel, TopicModel, TopicCommentModel],
}

const sequelize = new Sequelize(sequelizeOptions)

/*const initTables = async () => {
  await sequelize.sync();
}  

const Topic = sequelize.define(
  'Topic',
  {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    author_id: {
      type: DataType.INTEGER,
      allowNull: false
    },
    text: DataType.STRING
  }
);

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    yandex_id: DataType.INTEGER
  }
)

const Comments = sequelize.define(
  'Comments',
  {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    author_id: DataType.INTEGER,
    topic_id: DataType.INTEGER,
    text: DataType.STRING
  }
)

const CommentsAnswer = sequelize.define(
  'Comments_answer',
  {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    author_id: DataType.INTEGER,
    comments_id: DataType.INTEGER,
    text: DataType.STRING
  }
)


initTables();*/

export { sequelize }
