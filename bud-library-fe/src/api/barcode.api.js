import httpClient from './httpClient';
import { serializeObjectToParams } from '../helpers';

const END_POINT = '/barcodes';
const CREATE_END_POINT = END_POINT + '/create';
const UPDATE_END_POINT = END_POINT + '/update/';
const DELETE_END_POINT = END_POINT + '/delete/';
const GENERATE_END_POINT = END_POINT + '/generate';
const BOOK_BARCODES_END_POINT = END_POINT + '/book';
const GET_BY_BARCODE_END_POINT = END_POINT + '/barcode';

const apiGetList = (filter) => httpClient.get(END_POINT + '?' + serializeObjectToParams(filter));
const apiGetById = (id) => httpClient.get(END_POINT + '/' + id);
const apiPost = (object) => httpClient.post(CREATE_END_POINT, object);
const apiUpdate = (record) => httpClient.post(UPDATE_END_POINT + record.id, record);
const apiDelete = (record) => httpClient.delete(DELETE_END_POINT + record.id);
const apiPostGenerate = (params) => httpClient.post(GENERATE_END_POINT, params);
const apiGetBarcodesOfBook = (id) => httpClient.get(BOOK_BARCODES_END_POINT + '/' + id);
const apiGetByBarcode = (barcode) => httpClient.get(GET_BY_BARCODE_END_POINT + '/' + barcode);

export {
    apiGetList,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete,
    apiPostGenerate,
    apiGetBarcodesOfBook,
    apiGetByBarcode,
}