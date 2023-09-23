import {
    apiGetList,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete
} from "@/api/author.api";

const getDataFromLS = () => {
    const authors = localStorage.getItem("authors");
    if (authors) {
        try {
            return JSON.parse(authors);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const authors = getDataFromLS();
const state = authors
    ? {
          authors: authors,
          pageCount: 0,
          total: 0
      }
    : {
          authors: [],
          pageCount: 0,
          total: 0
      };

const actions = {
    get({ commit }, page) {
        return new Promise((resolve, reject) => {
            apiGetList(page)
                .then(response => {
                    commit("setDatas", response.data.content);
                    commit("setPageCount", response.data.totalPages);
                    commit("setTotal", response.data.totalElements);
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
    create({}, author) {
        return new Promise((resolve, reject) => {
            apiPost(author)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    update({}, author) {
        return new Promise((resolve, reject) => {
            apiUpdate(author)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    delete({}, author) {
        return new Promise((resolve, reject) => {
            apiDelete(author)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    }
};

const mutations = {
    setDatas(state, authors) {
        state.authors = authors;
    },
    setPageCount(state, pageCount) {
        state.pageCount = pageCount;
    },
    setTotal(state, total) {
        state.total = total;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};
