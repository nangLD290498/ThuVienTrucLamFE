import {
    apiGetList,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete,
    apiPostGenerate,
    apiGetBookCodesOfBook,
    apiGetByBookCode,
} from "@/api/bookCode.api";

const getAuthors = () => {
    const bookCodes = localStorage.getItem("bookCodes");
    if (bookCodes) {
        try {
            return JSON.parse(bookCodes);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const bookCodes = getAuthors();
const state = bookCodes
    ? {
          bookCodes: bookCodes,
          pageCount: 0,
          generateBookCodes: []
      }
    : {
          bookCodes: [],
          pageCount: 0,
          generateBookCodes: []
      };

const actions = {
    get({ commit }, filter) {
        return new Promise((resolve, reject) => {
            apiGetList(filter)
                .then(response => {
                    commit("setDatas", response.data.data);
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
    create({}, object) {
        return new Promise((resolve, reject) => {
            apiPost(object)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    update({}, bookCode) {
        return new Promise((resolve, reject) => {
            apiUpdate(bookCode)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    delete({}, bookCode) {
        return new Promise((resolve, reject) => {
            apiDelete(bookCode)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    generate({ commit }, params) {
        return new Promise((resolve, reject) => {
            apiPostGenerate(params)
                .then(response => {
                    commit("setGenerateBookCodes", response.data.data);
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    clearGenerateBookCodes({ commit }) {
        commit("clearGenerateBookCodes");
    },
    setGenerateBookCodes({ commit }, generateBookCodes) {
        commit("setGenerateBookCodes", generateBookCodes);
    },
    getBookCodesOfBook({ commit }, id) {
        return new Promise((resolve, reject) => {
            apiGetBookCodesOfBook(id)
                .then(response => {
                    commit("setGenerateBookCodes", response.data);
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    findByBookCode({ commit }, bookCode) {
        return new Promise((resolve, reject) => {
            apiGetByBookCode(bookCode)
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
    setDatas(state, bookCodes) {
        state.bookCodes = bookCodes;
    },
    setPageCount(state, pageCount) {
        state.pageCount = pageCount;
    },
    setGenerateBookCodes(state, generateBookCodes) {
        state.generateBookCodes = generateBookCodes;
    },
    clearGenerateBookCodes(state) {
        state.generateBookCodes = [];
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};
