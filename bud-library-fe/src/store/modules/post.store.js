import {
    apiGetList,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete
} from "@/api/post.api";

const getDataFromLS = () => {
    const posts = localStorage.getItem("posts");
    if (posts) {
        try {
            return JSON.parse(posts);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const posts = getDataFromLS();
const state = posts
    ? {
          posts: posts,
          pageCount: 0,
          post: null,
      }
    : {
          posts: [],
          pageCount: 0,
          post: null,
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
    create({}, post) {
        return new Promise((resolve, reject) => {
            apiPost(post)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    update({}, post) {
        return new Promise((resolve, reject) => {
            apiUpdate(post)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    delete({}, post) {
        return new Promise((resolve, reject) => {
            apiDelete(post)
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
    setDatas(state, posts) {
        state.posts = posts;
    },
    setData(state, post) {
        state.post = post;
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
