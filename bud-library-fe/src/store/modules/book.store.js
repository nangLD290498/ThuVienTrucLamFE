import {
    apiGetList,
    apiGetById,
    apiGetListByCate,
    apiPost,
    apiUpdate,
    apiDelete,
    apiGetTopBooks,
    apiGetLiquidationBooks,
    apiGetAvaiableLiquidationBooks,
    apiGetByBarcode,
} from "@/api/book.api";

const getDataFromLS = () => {
    const books = localStorage.getItem("books");
    if (books) {
        try {
            return JSON.parse(books);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const books = getDataFromLS();
const state = books
    ? { books: books, pageCount: 0, topBooks: [], liquidationBooks: [], cateId: 0, category: '' }
    : { books: {}, pageCount: 0, topBooks: [], liquidationBooks: [], cateId: 0, category: '' };

const actions = {
    get({ commit }, filter) {
        return new Promise((resolve, reject) => {
            apiGetList(filter)
                .then(response => {
                    commit("setDatas", response.data.content.elements);
                    commit("setTotal", response.data.content.numberOfElements);
                    commit("setPageCount", response.data.last_page);
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    getByCate({ commit }, filter) {
        return new Promise((resolve, reject) => {
            apiGetListByCate(filter)
                .then(response => {
                    commit("setDatas", response.data.content.elements);
                    commit("setTotal", response.data.content.numberOfElements);
                    commit("setPageCount", response.data.last_page);
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    findById({}, id) {
        return new Promise((resolve, reject) => {
            apiGetById(id)
                .then(response => resolve(response))
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    create({}, book) {
        return new Promise((resolve, reject) => {
            apiPost(book)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    update({}, book) {
        return new Promise((resolve, reject) => {
            apiUpdate(book)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    delete({}, book) {
        return new Promise((resolve, reject) => {
            apiDelete(book)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    getTopBooks({ commit }) {
        return new Promise((resolve, reject) => {
            apiGetTopBooks()
                .then(response => {
                    commit("setTopBooks", response.data);
                    resolve(response);
                })
                .catch(function(error) {
                    if (error.response) {
                        reject(error.response.data);
                    }
                });
        });
    },
    getLiquidationBooks({ commit }) {
        return new Promise((resolve, reject) => {
            apiGetLiquidationBooks()
                .then(response => {
                    commit(
                        "setLiquidationBooks",
                        response.data.liquidationBooks
                    );
                    resolve(response);
                })
                .catch(function(error) {
                    if (error.response) {
                        reject(error.response.data);
                    }
                });
        });
    },
    getAvaiableLiquidationBooks({ commit }) {
        return new Promise((resolve, reject) => {
            apiGetAvaiableLiquidationBooks()
                .then(response => {
                    commit(
                        "setLiquidationBooks",
                        response.data.liquidationBooks
                    );
                    resolve(response);
                })
                .catch(function(error) {
                    if (error.response) {
                        reject(error.response.data);
                    }
                });
        });
    },
    findByBarcode({ commit }, barcode) {
        return new Promise((resolve, reject) => {
            apiGetByBarcode(barcode)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
};

const mutations = {
    setDatas(state, books) {
        state.books = books;
    },
    setPageCount(state, pageCount) {
        state.pageCount = pageCount;
    },
    setTotal(state, total) {
        state.total = total;
    },
    setTopBooks(state, topBooks) {
        state.topBooks = topBooks;
    },
    setLiquidationBooks(state, liquidationBooks) {
        state.liquidationBooks = liquidationBooks;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};
