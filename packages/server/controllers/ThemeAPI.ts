import type { Request, Response } from 'express'
import SiteTheme from '../models/SiteTheme'
import ThemeService from '../services/ThemeService'

class ThemeAPI {
  public static create = async (request: Request, response: Response) => {
    if (request.body.userId) {
      try {
        const {
          body: { userId },
        } = request
        await ThemeService.create(userId)
        response.send('OK')
      } catch (error) {
        console.log(error)
        response.status(400).send()
      }
    }
  }

  public static get = async (
    request: Request<any, any, any, { userId: number }>,
    response: Response
  ) => {
    try {
      const {
        query: { userId },
      } = request

      const data = await ThemeService.find('userId', userId)

      if (data) {
        const theme = await ThemeService.find(
          'id',
          data.dataValues.themeId,
          SiteTheme
        )

        response.send(theme?.dataValues.theme)
      }
    } catch (error) {
      console.log(error)
      response.status(400).send()
    }
  }

  public static update = async (request: Request, response: Response) => {
    try {
      const {
        body: { userId, themeId },
      } = request

      await ThemeService.update({ userId, themeId })
      const theme = await ThemeService.find('userId', userId)

      response.send(theme)
    } catch (error) {
      console.log(error)
      response.status(400).send()
    }
  }
}

export default ThemeAPI
