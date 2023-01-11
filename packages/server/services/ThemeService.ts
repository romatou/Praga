import UserTheme from '../models/UserTheme'
import type BaseRESTService from './BaseRESTService'

interface UpdateRequest {
  userId: number
  themeId: number
}

class ThemeService implements BaseRESTService {
  public find = <T = number>(key: string, value: T, model: any = UserTheme) => {
    return model.findOne({
      where: {
        [key]: value,
      },
    })
  }

  public create = (userId: number) => {
    return UserTheme.findOrCreate({
      where: {
        userId,
      },
      defaults: {
        themeId: 1,
        userId,
      },
    })
  }

  public update = ({ userId, themeId }: UpdateRequest) => {
    const data = UserTheme.update(
      { themeId },
      {
        where: { userId },
        returning: true,
      }
    )

    return data
  }
}

export default new ThemeService()
