import type { Request, Response } from 'express'
import { LikeModel, TopicCommentModel, TopicModel, UserModel } from '../models'

export const addTopic = async (req: Request, res: Response) => {
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

export const getAll = async (_: Request, res: Response) => {
  try {
    const data = await TopicModel.findAll()
    res.send({
      topics: data,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send()
  }
}

export const createComment = async (req: Request, res: Response) => {
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
      comment: comment,
      topic_id: topicId,
      user_id: userId,
      user_login: userLogin,
      parent_id: parentId,
    })

    res.send('OK')
  } catch (error) {
    console.log(error)
    res.status(400).send()
  }
}

export const deleteComment = async (req: Request, res: Response) => {
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

export const getComment = async (req: Request, res: Response) => {
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

export const addLike = async (req: Request, res: Response) => {
  try {
    const { body } = req
    const { isLike, commentId, userId, userLogin } = body

    await UserModel.findOrCreate({
      where: {
        id: userId,
      },
      defaults: {
        id: userId,
        login: userLogin,
      },
    })

    const foundItem = await LikeModel.findOne({
      where: {
        comment_id: commentId,
        user_id: userId,
      },
    })
    if (!foundItem) {
      await LikeModel.create({
        comment_id: commentId,
        isLike: isLike,
        user_id: userId,
      })
    } else {
      await LikeModel.update(
        { isLike: isLike },
        {
          where: {
            comment_id: commentId,
            user_id: userId,
          },
        }
      )
    }
    const data = await LikeModel.findAll({
      where: {
        user_id: userId,
      },
    })
    res.send({
      likes: data,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send()
  }
}

export const getLikes = async (req: Request, res: Response) => {
  try {
    const { body } = req
    const { id } = body

    const data = await LikeModel.findAll({
      where: {
        user_id: id,
      },
    })
    res.send({
      likes: data,
    })
  } catch (error) {
    console.log(error)
    res.status(400).send()
  }
}
