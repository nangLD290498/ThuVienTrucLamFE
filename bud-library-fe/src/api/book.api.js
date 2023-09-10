import httpClient from './httpClient';
import { serializeObjectToParams } from '../helpers';

const END_POINT = '/books';
const CREATE_END_POINT = '/pdf/saveBookFullFlow';
const UPDATE_END_POINT = END_POINT + '/update/';
const DELETE_END_POINT = END_POINT + '/delete/';
const TOP_BOOKS_END_POINT = '/top-books';
const LIQUIDATION_BOOKS_END_POINT = '/liquidation-books';
const AVAIABLE_LIQUIDATION_BOOKS_END_POINT = '/avaiable-liquidation-books';
const BOOK_BY_BARCODES_END_POINT = END_POINT + '/barcode';

// const apiGetList = (from, to, filter) => httpClient.get(END_POINT + `/getList/${from}/${to}/ASC/name` + '?' + serializeObjectToParams(filter));
const apiGetList = (filter) => httpClient.get(END_POINT + '?' + serializeObjectToParams(filter));
const apiGetListByCate = (filter) => httpClient.get(END_POINT + '/ByCategory/' + filter.cateId+ '?page=' + filter.page);
const apiGetById = (id) => httpClient.get(END_POINT + '/' + id);
const apiPost = (record) => httpClient.post(END_POINT, record);
const apiUpdate = (record) => httpClient.post(UPDATE_END_POINT + record.id, record);
const apiDelete = (record) => httpClient.delete(DELETE_END_POINT + record.id);
const apiGetTopBooks = () => httpClient.get(TOP_BOOKS_END_POINT);
const apiGetLiquidationBooks = () => httpClient.get(LIQUIDATION_BOOKS_END_POINT);
const apiGetAvaiableLiquidationBooks = () => httpClient.get(AVAIABLE_LIQUIDATION_BOOKS_END_POINT);
const apiGetByBarcode = (barcode) => httpClient.get(BOOK_BY_BARCODES_END_POINT + '/' + barcode);

export {
    apiGetList,
    apiGetListByCate,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete,
    apiGetTopBooks,
    apiGetLiquidationBooks,
    apiGetAvaiableLiquidationBooks,
    apiGetByBarcode,
}