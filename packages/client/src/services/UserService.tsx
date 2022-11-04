import API from './BaseApi';
export interface passwordType {
  oldPassword: string,
  newPassword: string
}

export interface userType {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
}

export const editAvatarApi = async (formData: any) => {
  return await API.put('/user/profile/avatar', formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }})
}
export const editProfile = async (formData: userType) => {
  return await API.put('/user/profile', formData)
}
export const editPassword = async (formData: passwordType) => {
  return await API.put('/user/password', formData)
}
export const getUser = async () => {
  return await API.get('/auth/user')
}
