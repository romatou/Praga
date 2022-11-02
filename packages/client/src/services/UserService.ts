import API from './BaseApi';

export const editAvatarApi = (formData: any) => {
    try {
      const response = API.put('/user/profile/avatar', formData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
}
export const editProfile = (formData: any) => {
  return API.put('/user/profile', formData)
}
export const getUser = async () => {
  return await API.get('/auth/user')
}
