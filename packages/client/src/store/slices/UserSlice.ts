import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  getThemeFromStorage,
  SelectedTheme,
  setThemeToStorage
} from '../../storage/adapters/theme'
import {
  addUserTheme,
  changeUserTheme,
  editAvatar,
  editPasswordData,
  editProfileData,
  fetchUser,
  fetchUserTheme
} from '../actions/UserActionCreators'
import { RootState } from '../index'
import { RequestData, RequestDataState, StatusLoading, User } from '../types'

export interface UserState {
  userData: User
  requestData: RequestData
  selectedTheme: SelectedTheme
}

const initialState: UserState = {
  userData: {
    avatar: '',
    display_name: '',
    email: '',
    first_name: '',
    id: 0,
    login: '',
    phone: '',
    second_name: '',
    status: '',
  },
  selectedTheme: 'dark',
  requestData: {
    getUser: {} as RequestDataState<User>,
    editUser: {} as RequestDataState<User>,
    editAvatar: {} as RequestDataState<User>,
    editPassword: {} as RequestDataState,
    getUserTheme: {} as RequestDataState,
    addUserTheme: {} as RequestDataState,
    changeUserTheme: {} as RequestDataState,
  },
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getTheme: state => {
      state.selectedTheme = getThemeFromStorage(!!state.userData.id)
    },
    toggleTheme: (state, { payload }: PayloadAction<SelectedTheme>) => {
      const newTheme: SelectedTheme = payload === 'dark' ? 'light' : 'dark'

      setThemeToStorage(newTheme, !!state.userData.id)
      state.selectedTheme = newTheme
    },
  },
  extraReducers: builder => {
    builder
      .addCase(changeUserTheme.pending.type, state => {
        state.requestData.changeUserTheme.status = StatusLoading.IN_PROGRESS
      })
      .addCase(changeUserTheme.fulfilled.type, (state, action: AnyAction) => {
        const newTheme = action.payload.themeId === 1 ? 'dark' : 'light'
        state.selectedTheme = newTheme
        setThemeToStorage(newTheme, !!state.userData.id)

        state.requestData.changeUserTheme.status = StatusLoading.SUCCESS
      })
      .addCase(
        changeUserTheme.rejected.type,
        (state, { payload }: AnyAction) => {
          state.requestData.changeUserTheme.errorMessage = payload
          state.requestData.changeUserTheme.status = StatusLoading.ERROR
        }
      )
      .addCase(addUserTheme.pending.type, state => {
        state.requestData.addUserTheme.status = StatusLoading.IN_PROGRESS
      })
      .addCase(addUserTheme.fulfilled.type, state => {
        state.requestData.addUserTheme.status = StatusLoading.SUCCESS
      })
      .addCase(addUserTheme.rejected.type, (state, { payload }: AnyAction) => {
        state.requestData.addUserTheme.errorMessage = payload
        state.requestData.addUserTheme.status = StatusLoading.ERROR
      })
      .addCase(fetchUserTheme.pending.type, state => {
        state.requestData.getUserTheme.status = StatusLoading.IN_PROGRESS
      })
      .addCase(
        fetchUserTheme.fulfilled.type,
        (state, { payload }: AnyAction) => {
          state.selectedTheme = payload
          state.requestData.getUserTheme.status = StatusLoading.SUCCESS
        }
      )
      .addCase(
        fetchUserTheme.rejected.type,
        (state, { payload }: AnyAction) => {
          state.requestData.getUserTheme.errorMessage = payload
          state.requestData.getUserTheme.status = StatusLoading.ERROR
        }
      )
      .addCase(fetchUser.pending.type, state => {
        state.requestData.getUser.status = StatusLoading.IN_PROGRESS
      })
      .addCase(fetchUser.fulfilled.type, (state, { payload }: AnyAction) => {
        state.userData = payload
        state.requestData.getUser.status = StatusLoading.SUCCESS
      })
      .addCase(fetchUser.rejected.type, (state, { payload }: AnyAction) => {
        state.requestData.getUser.errorMessage = payload
        state.requestData.getUser.status = StatusLoading.ERROR
      })
      .addCase(editProfileData.pending.type, state => {
        state.requestData.editUser.status = StatusLoading.IN_PROGRESS
      })
      .addCase(
        editProfileData.fulfilled.type,
        (state, { payload }: AnyAction) => {
          state.userData = payload
          state.requestData.editUser.status = StatusLoading.SUCCESS
        }
      )
      .addCase(
        editProfileData.rejected.type,
        (state, { payload }: AnyAction) => {
          state.requestData.editUser.errorMessage = payload
          state.requestData.editUser.status = StatusLoading.ERROR
        }
      )
      .addCase(editAvatar.pending.type, state => {
        state.requestData.editAvatar.status = StatusLoading.IN_PROGRESS
      })
      .addCase(editAvatar.fulfilled.type, (state, { payload }: AnyAction) => {
        state.userData = payload
        state.requestData.editAvatar.status = StatusLoading.SUCCESS
      })
      .addCase(editAvatar.rejected.type, (state, { payload }: AnyAction) => {
        state.requestData.editAvatar.errorMessage = payload
        state.requestData.editAvatar.status = StatusLoading.ERROR
      })
      .addCase(editPasswordData.pending.type, state => {
        state.requestData.editPassword.status = StatusLoading.IN_PROGRESS
      })
      .addCase(editPasswordData.fulfilled.type, state => {
        state.requestData.editPassword.status = StatusLoading.SUCCESS
      })
      .addCase(
        editPasswordData.rejected.type,
        (state, { payload }: AnyAction) => {
          state.requestData.editPassword.errorMessage = payload
          state.requestData.editPassword.status = StatusLoading.ERROR
        }
      )
  },
})

export const { toggleTheme, getTheme } = UserSlice.actions

export const selectUserData = (state: RootState) => state.user

export default UserSlice.reducer
