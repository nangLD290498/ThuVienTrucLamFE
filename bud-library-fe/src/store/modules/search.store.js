import {
    apiGetList,
    apiCategories,
    apiPost,
    apiUpdate,
    apiDelete
} from "@/api/search.api";

const getDataFromLS = () => {
    const searchItems = localStorage.getItem("searchItems");
    if (searchItems) {
        try {
            return JSON.parse(searchItems);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const searchItems = getDataFromLS();
const state = searchItems
    ? {
        searchItems: searchItems,
        pageCount: 0,
        totalElements: 0
      }
    : {
        searchItems: [],
        pageCount: 0,
        totalElements: 0
      };

const actions = {
    get({ commit }, filter) {
        return new Promise((resolve, reject) => {
            apiGetList(filter)
                .then(response => {
                    commit("setDatas", response.data.content);
                    //localStorage.setItem('searchItems', response.data.data);
                    commit("setTotalElements", response.data.totalElements);
                    commit("setPageCount", response.data.totalPages);
                    resolve(response);
                })
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
    setDatas(state, searchItems) {
        state.searchItems = searchItems;
    },
    setPageCount(state, pageCount) {
        state.pageCount = pageCount;
    },
    setTotalElements(state, totalElements) {
        state.totalElements = totalElements;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};
