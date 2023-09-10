import {
    apiGetList,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete
} from "@/api/category.api";

const getAuthors = () => {
    const categories = localStorage.getItem("categories");
    if (categories) {
        try {
            return JSON.parse(categories);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const categories = getAuthors();
const state = categories
    ? {
          categories: categories,
          pageCount: 0,
          category: null,
      }
    : {
          categories: [],
          pageCount: 0,
          category: null,
      };

const actions = {
    get({ commit }) {
        return new Promise((resolve, reject) => {
            apiGetList()
                .then(response => {
                    commit("setDatas", response.data.content);
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    findById({commit}, id) {
        return new Promise((resolve, reject) => {
            apiGetById(id)
                .then(response => {
                    commit("setData", response.data);
                    resolve(response)
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    create({}, category) {
        return new Promise((resolve, reject) => {
            apiPost(category)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    update({}, category) {
        return new Promise((resolve, reject) => {
            apiUpdate(category)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    delete({}, category) {
        return new Promise((resolve, reject) => {
            apiDelete(category)
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
    setDatas(state, categories) {
        state.categories = categories;
    },
    setData(state, category) {
        state.category = category;
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
