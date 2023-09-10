import httpClient from './httpClient';
import { serializeObjectToParams } from '../helpers';

const END_POINT = '/books';
const CATEGORIES = '/categories';
const UPDATE_END_POINT = END_POINT + '/update/';
const DELETE_END_POINT = END_POINT + '/delete/';

const apiGetList = (filter) => httpClient.get(END_POINT + '/specialSearch/' + filter.page + '?searchText='+filter.searchText+'&category='+filter.category);
const apiCategories = () => httpClient.get(CATEGORIES);
const apiPost = (record) => httpClient.post(CREATE_END_POINT, record);
const apiUpdate = (record) => httpClient.post(UPDATE_END_POINT + record.id, record);
const apiDelete = (record) => httpClient.delete(DELETE_END_POINT + record.id);

export {
    apiGetList,
    apiCategories,
    apiPost,
    apiUpdate,
    apiDelete,
}