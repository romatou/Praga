import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  changeUserTheme,
  editAvatar,
  editPasswordData,
  editProfileData,
  fetchUser,
} from '../actions/UserActionCreators'
import { RootState } from '../index'
import { 
  RequestData,
  RequestDataState, 
  SelectedTheme, 
  StatusLoading, 
  User, 
  UserDataWithTheme 
} from '../types'

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
    changeUserTheme: {} as RequestDataState,
  },
}



export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(changeUserTheme.pending.type, state => {
        state.requestData.changeUserTheme.status = StatusLoading.IN_PROGRESS
      })
      .addCase(changeUserTheme.fulfilled.type, (state, { payload: {themeId} }: PayloadAction<{themeId: number}>) => {
        const newTheme = themeId === 1 ? 'dark' : 'light'
        state.selectedTheme = newTheme
        state.requestData.changeUserTheme.status = StatusLoading.SUCCESS
      })
      .addCase(
        changeUserTheme.rejected.type,
        (state, { payload }: PayloadAction<string>) => {
          state.requestData.changeUserTheme.errorMessage = payload
          state.requestData.changeUserTheme.status = StatusLoading.ERROR
        }
      )
      .addCase(fetchUser.pending.type, state => {
        state.requestData.getUser.status = StatusLoading.IN_PROGRESS
      })
      .addCase(fetchUser.fulfilled.type, (state, { payload: {user, userTheme} }: PayloadAction<UserDataWithTheme>) => {
        state.userData = user
        state.selectedTheme = userTheme
        state.requestData.getUser.status = StatusLoading.SUCCESS
      })
      .addCase(fetchUser.rejected.type, (state, { payload }: PayloadAction<string>) => {
        state.requestData.getUser.errorMessage = payload
        state.requestData.getUser.status = StatusLoading.ERROR
      })
      .addCase(editProfileData.pending.type, state => {
        state.requestData.editUser.status = StatusLoading.IN_PROGRESS
      })
      .addCase(
        editProfileData.fulfilled.type,
        (state, { payload }: PayloadAction<User>) => {
          state.userData = payload
          state.requestData.editUser.status = StatusLoading.SUCCESS
        }
      )
      .addCase(
        editProfileData.rejected.type,
        (state, { payload }: PayloadAction<string>) => {
          state.requestData.editUser.errorMessage = payload
          state.requestData.editUser.status = StatusLoading.ERROR
        }
      )
      .addCase(editAvatar.pending.type, state => {
        state.requestData.editAvatar.status = StatusLoading.IN_PROGRESS
      })
      .addCase(editAvatar.fulfilled.type, (state, { payload }: PayloadAction<User>) => {
        state.userData = payload
        state.requestData.editAvatar.status = StatusLoading.SUCCESS
      })
      .addCase(editAvatar.rejected.type, (state, { payload }: PayloadAction<string>) => {
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
        (state, { payload }: PayloadAction<string>) => {
          state.requestData.editPassword.errorMessage = payload
          state.requestData.editPassword.status = StatusLoading.ERROR
        }
      )
  },
})

export const selectUserData = (state: RootState) => state.user

export default UserSlice.reducer
