import httpClient from './httpClient';

const END_POINT = '/dashboard';

const apiGetList = () => httpClient.get(END_POINT);

export {
    apiGetList,
}