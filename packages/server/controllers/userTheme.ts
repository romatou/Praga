
// import { Router, Request, Response } from 'express';
// import UserTheme from '../models/UserTheme';

// export const themeRouter = Router();

// const addThemeToUser = async (req: Request, res: Response) => {
//   try {
//     const { body } = req;
//     const { userId } = body;

//     await UserTheme.findOrCreate({
//       where: {
//         id: userId,
//       },
//       defaults: {
//         id: 1111,
        
//       },
//     });

//     await TopicModel.create({
//       title: title,
//       description: description,
//       user_id: 1111,
//     });

//     res.send('OK');
//   } catch (error) {
//     console.log(error);
//     res.status(400).send();
//   }
// };

// const getThemeFromDb = async (req: Request, res: Response) => {
  // try {
  //   const { body } = req;
  //   const { id } = body;

  //   const data = await TopicCommentModel.findOne({
  //     where: {
  //       topic_id: id,
  //     },
  //   });
  //   res.send({
  //     comments: data,
  //   });
  // } catch (error) {
  //   console.log(error);
  //   res.status(400).send();
  // }
// };


// topicsRouter.route('/get').post(addTopic);
export {}