import httpClient from './httpClient';
import { serializeObjectToParams } from '../helpers';

const END_POINT = '/categories';
const CREATE_END_POINT = END_POINT + '/create';
const UPDATE_END_POINT = END_POINT + '/update/';
const DELETE_END_POINT = END_POINT + '/delete/';

const apiGetList = () => httpClient.get(END_POINT);
const apiGetById = (id) => httpClient.get(END_POINT + '/' + id);
const apiPost = (record) => httpClient.post(CREATE_END_POINT, record);
const apiUpdate = (record) => httpClient.post(UPDATE_END_POINT + record.id, record);
const apiDelete = (record) => httpClient.delete(DELETE_END_POINT + record.id);

export {
    apiGetList,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete,
}