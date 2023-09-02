import {
    apiGetList,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete,
    apiPostRegisterRequest,
    apiGetRequestFilterByStatus,
    apiGetByBarcode,
} from "@/api/request.api";

const getDataFromLS = () => {
    const requests = localStorage.getItem("requests");
    if (requests) {
        try {
            return JSON.parse(requests);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const requests = getDataFromLS();
const state = requests
    ? {
          requests: requests,
          pageCount: 0,
          requestBook: null
      }
    : {
          requests: [],
          pageCount: 0,
          requestBook: null
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
    create({}, request) {
        return new Promise((resolve, reject) => {
            apiPost(request)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    update({}, request) {
        return new Promise((resolve, reject) => {
            apiUpdate(request)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    delete({}, request) {
        return new Promise((resolve, reject) => {
            apiDelete(request)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    register({}, request) {
        return new Promise((resolve, reject) => {
            apiPostRegisterRequest(request)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    if (error.response) {
                        reject(error);
                    }
                });
        });
    },
    getByStatus({ commit }, status) {
        return new Promise((resolve, reject) => {
            apiGetRequestFilterByStatus(status)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    if (error.response) {
                        reject(error);
                    }
                });
        });
    },
    setBook({ commit }, requestBook) {
        commit("setBook", requestBook);
    },
    reset({ commit }) {
        commit("clear");
    },
    findByBarcode({ commit }, filter) {
        return new Promise((resolve, reject) => {
            apiGetByBarcode(filter)
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
};

const mutations = {
    setBook(state, requestBook) {
        state.requestBook = requestBook;
        localStorage.setItem("requestBook", JSON.stringify(state.requestBook));
    },
    clear(state) {
        state.requestBook = null;
        localStorage.removeItem("requestBook");
    },
    setDatas(state, requests) {
        state.requests = requests;
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
