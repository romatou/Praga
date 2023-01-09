import { Router, Request, Response } from 'express'
import { TopicModel, UserModel, TopicCommentModel } from '../models'

export const topicsRouter = Router()

const addTopic = async (req: Request, res: Response) => {
  try {
    const { body } = req
    const { title, description, userId, userLogin } = body

    await UserModel.findOrCreate({
      where: {
        id: userId,
      },
      defaults: {
        id: userId,
        login: userLogin,
      },
    })

    await TopicModel.create({
      title: title,
      description: description,
      user_id: userId,
    })

    res.send('OK')
  } catch (error) {
    console.log(error)
    res.status(400).send()
  }
}

const getAll = async (req: Request, res: Response) => {
  try {
    const { body } = req
    console.log(body)

    const data = await TopicModel.findAll()
    res.send({
      topics: data,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send()
  }
}

const createComment = async (req: Request, res: Response) => {
  try {
    const { body } = req
    const { parentId, comment, topicId, userId, userLogin } = body

    await UserModel.findOrCreate({
      where: {
        id: userId,
      },
      defaults: {
        id: userId,
        login: userLogin,
      },
    })

    await TopicCommentModel.create({
      comment,
      topic_id: topicId,
      user_id: userId,
      parent_id: parentId,
    })

    res.send('OK')
  } catch (error) {
    console.log(error)
    res.status(400).send()
  }
}

const deleteComment = async (req: Request, res: Response) => {
  try {
    const { body } = req
    const { id } = body

    const comment = await TopicCommentModel.findByPk(id)
    await comment?.destroy()

    res.send('OK')
  } catch (error) {
    console.log(error)
    res.status(400).send()
  }
}

const getComment = async (req: Request, res: Response) => {
  try {
    const { body } = req
    const { id } = body

    const data = await TopicCommentModel.findAll({
      where: {
        topic_id: id,
      },
    })
    res.send({
      comments: data,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send()
  }
}

topicsRouter.route('/add').post(addTopic)
topicsRouter.route('/all').get(getAll)
topicsRouter.route('/add-comment').post(createComment)
topicsRouter.route('/delete-comment').delete(deleteComment)
topicsRouter.route('/get-comments').post(getComment)
