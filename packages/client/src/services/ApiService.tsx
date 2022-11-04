export type SigninData = {
  login: string,
  password: string,
}

export type SignupData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}
class ApiService {

  static API_URL = 'https://ya-praktikum.tech/api/v2';

  request = async (url: string, method: string, body: unknown = null) => {
    const result = await fetch(url, {
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      method: method,
      body: JSON.stringify(body)
    });

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
  }

  getAuth = async (data: SigninData) => {
    return await this.request(`${ApiService.API_URL}/auth/signin`, 'POST', data);
  }
  getRegister = async (data:SignupData) => {
   return await this.request(`${ApiService.API_URL}/auth/signup`, 'POST', data)
  }
}
export const apiService = new ApiService();