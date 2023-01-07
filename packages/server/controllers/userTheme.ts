import { Router, Request, Response } from 'express';
import UserTheme from '../models/UserTheme';

export const userThemeRouter = Router();

const addUserTheme = async (req: Request, res: Response) => {
  try {
    const { body: { userId } } = req;

     await UserTheme.findOrCreate({
      where: {
        userId,
      },
      defaults: {
        themeId: 1,
        userId
      },
      
    });
    
    res.send('OK');
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
} 

const getUserTheme = async (req: Request<any, any, any, {userId: number}>, res: Response) => {

  try {
    const { query: { userId } } = req;

    const data = await UserTheme.findOne({
      where: {
        userId: userId,
      },
    });
    
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
}

const changeUserTheme = async (req: Request<any, any, {userId: number, themeId: number}, any>, res: Response) => {
  try {
    const { body: { userId, themeId } } = req;

    const data =  await UserTheme.update(
      { themeId },
      {
        where: {  userId },
        returning: true,
        
      },
      ).then(() => {
        const response = UserTheme.findOne({
          where: {
            userId: userId,
          },
        });                      

        return response
    }).then(response => {
       res.send(response?.dataValues)
    });
    
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
}


// const getUserTheme = async (req: Request, res: Response) => {
//   try {
//     const { body: { userId } } = req;
// console.log(req);

//     const data = await UserTheme.findOne({
//       where: {
//         userId,
//       },
//     });

//     res.send({
//       theme: data,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send();
//   }
// }

userThemeRouter.route('/get').get(getUserTheme);
userThemeRouter.route('/add').post(addUserTheme);
userThemeRouter.route('/update').post(changeUserTheme);

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