import { Router, Request, Response } from 'express';
import SiteTheme from '../models/SiteTheme';

export const themeRouter = Router();

const getTheme = async (req: Request, res: Response) => {
  try {
//     const { body: { theme } } = req;
console.log(req);

    const data = await SiteTheme.findOne({
      where: {
        id: 2,
      },
    });

    res.send({
      theme: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
}

themeRouter.route('/user-theme').get(getTheme);