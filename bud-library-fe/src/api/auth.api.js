import httpClient from './httpClient';

const LOGIN_END_POINT = '/api/auth/signin';
const REGISTER_END_POINT = '/api/auth/signup';
const LOGOUT_END_POINT = '/api/auth/logout';

const login = ({ username, password }) => httpClient.post(LOGIN_END_POINT, { username, password });

const register = ({ username, password }) => httpClient.post(REGISTER_END_POINT, { username, password });

const logout = () => httpClient.get(LOGOUT_END_POINT);


export {
  login,
  register,
  logout,
}