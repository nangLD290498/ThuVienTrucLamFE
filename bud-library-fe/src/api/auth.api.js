import httpClient from './httpClient';

const LOGIN_END_POINT = '/login';
const LOGIN_WITH_FACEBOOK_END_POINT = '/login/facebook';
const LOGIN_WITH_GOOGLE_END_POINT = '/login/google';
const REGISTER_END_POINT = '/register';
const LOGOUT_END_POINT = '/logout';
const PROFILE_END_POINT = '/profile';

const login = ({ email, password }) => httpClient.post(LOGIN_END_POINT, { email, password });

const apiPostLoginWithFacebook = (accessToken) => httpClient.post(LOGIN_WITH_FACEBOOK_END_POINT, { 'access_token': accessToken });

const apiPostLoginWithGoogle = (id_token) => httpClient.post(LOGIN_WITH_GOOGLE_END_POINT, { 'id_token': id_token });

const register = (user) => httpClient.post(REGISTER_END_POINT, user);

const logout = () => httpClient.get(LOGOUT_END_POINT);

const apiGetProfile = () => httpClient.get(PROFILE_END_POINT);

export {
  login,
  apiPostLoginWithFacebook,
  apiPostLoginWithGoogle,
  register,
  logout,
  apiGetProfile,
}