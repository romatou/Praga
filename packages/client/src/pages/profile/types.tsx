export interface passwordType {
  oldPassword: string
  newPassword: string
}
export interface userType {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
}
export const TYPES_ALERT = {
  ERROR: 'error',
  SUCCESS: 'success',
  IN_PROGRESS: 'warning',
}
export const TYPES_ALERT_MESS = {
  ERROR: 'Ошибка',
  SUCCESS: 'Сохранен',
  IN_PROGRESS: 'В процессе',
}
export enum InputLabel {
  login = 'Логин',
  password = 'Пароль',
  first_name = 'Имя',
  second_name = 'Фамилия',
  email = 'Почта',
  phone = 'Телефон',
  display_name = 'Имя в чате',
}
