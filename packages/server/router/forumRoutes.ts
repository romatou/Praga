import { Router } from 'express'
import { addTopic, getAll, createComment, deleteComment, getComment, addLike, getLikes } from '../controllers/topics'


const topicsRouter = (router: Router) => {
  const topicsRouter: Router = Router()

  topicsRouter
    .post('/add', [], addTopic)
    .get('/all', [], getAll)
    .post('/add-comment', [], createComment)
    .delete('/delete-comment', [], deleteComment)
    .post('/get-comments', [], getComment)
    .post('/add-like', [], addLike)
    .post('/get-likes', [], getLikes)
  
  router.use('/api/topics', topicsRouter)
}


export default topicsRouter
