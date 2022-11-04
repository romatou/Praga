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

export const editAvatarApi = (formData: any) => {
    try {
      const response = API.put('/user/profile/avatar', formData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
}
export const editProfile = (formData: userType) => {
  return API.put('/user/profile', formData)
}
export const editPassword = (formData: passwordType) => {
  return API.put('/user/password', formData)
}
export const getUser = async () => {
  return await API.get('/auth/user')
}
