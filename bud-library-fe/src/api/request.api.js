import httpClient from './httpClient';
import { serializeObjectToParams } from '../helpers';

const END_POINT = '/request-books';
const CREATE_END_POINT = END_POINT + '/create';
const UPDATE_END_POINT = END_POINT + '/update/';
const DELETE_END_POINT = END_POINT + '/delete/';
const REQUEST_REGISTER_END_POINT = '/user/request-book/register';
const REQUEST_STATUS_END_POINT = 'user/request-book/';
const GET_BY_BARCODE_END_POINT = 'barcode';

const apiGetList = (filter) => httpClient.get(END_POINT + '?' + serializeObjectToParams(filter));
const apiGetById = (id) => httpClient.get(END_POINT + '/' + id);
const apiPost = (record) => httpClient.post(CREATE_END_POINT, record);
const apiUpdate = (record) => httpClient.post(UPDATE_END_POINT + record.id, record);
const apiDelete = (record) => httpClient.delete(DELETE_END_POINT + record.id);
const apiPostRegisterRequest = (request) => httpClient.post(REQUEST_REGISTER_END_POINT, request);
const apiGetRequestFilterByStatus = (status) => httpClient.get(REQUEST_STATUS_END_POINT + status);
const apiGetByBarcode = (barcode) => httpClient.get(GET_BY_BARCODE_END_POINT + '/' + barcode);

export {
    apiGetList,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete,
    apiPostRegisterRequest,
    apiGetRequestFilterByStatus,
    apiGetByBarcode,
}