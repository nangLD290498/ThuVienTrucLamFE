import {
    apiGetList,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete
} from "@/api/bookcase.api";

const getDataFromLS = () => {
    const bookcases = localStorage.getItem("bookcases");
    if (bookcases) {
        try {
            return JSON.parse(bookcases);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const bookcases = getDataFromLS();
const state = bookcases
    ? {
          bookcases: bookcases,
          pageCount: 0
      }
    : {
          bookcases: [],
          pageCount: 0
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
    create({}, bookcase) {
        return new Promise((resolve, reject) => {
            apiPost(bookcase)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    update({}, bookcase) {
        return new Promise((resolve, reject) => {
            apiUpdate(bookcase)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    delete({}, bookcase) {
        return new Promise((resolve, reject) => {
            apiDelete(bookcase)
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
    setDatas(state, bookcases) {
        state.bookcases = bookcases;
    },
    setPageCount(state, pageCount) {
        state.pageCount = pageCount;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};
