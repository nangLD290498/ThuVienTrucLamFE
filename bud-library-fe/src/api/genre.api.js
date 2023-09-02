import httpClient from './httpClient';
import { serializeObjectToParams } from '../helpers';

const END_POINT = '/genres';
const CREATE_END_POINT = END_POINT + '/create';
const UPDATE_END_POINT = END_POINT + '/update/';
const DELETE_END_POINT = END_POINT + '/delete/';
const BOOKS_GENRE_END_POINT = '/genre-books/';

const apiGetList = (filter) => httpClient.get(END_POINT + '?' + serializeObjectToParams(filter));
const apiGetById = (id) => httpClient.get(END_POINT + '/' + id);
const apiPost = (record) => httpClient.post(CREATE_END_POINT, record);
const apiUpdate = (record) => httpClient.post(UPDATE_END_POINT + record.id, record);
const apiDelete = (record) => httpClient.delete(DELETE_END_POINT + record.id);
const apiGetBooksGenre = (genreId = null) => httpClient.get(BOOKS_GENRE_END_POINT + genreId);


export {
    apiGetList,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete,
    apiGetBooksGenre,
}