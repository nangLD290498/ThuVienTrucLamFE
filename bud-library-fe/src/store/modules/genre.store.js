import {
    apiGetList,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete,
    apiGetBooksGenre
} from "@/api/genre.api";

const getDataFromLS = () => {
    const genres = localStorage.getItem("genres");
    if (genres) {
        try {
            return JSON.parse(genres);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const genres = getDataFromLS();
const state = genres
    ? {
          genres: genres,
          pageCount: 0,
          booksGenre: {}
      }
    : {
          genres: [],
          pageCount: 0,
          booksGenre: {}
      };

const actions = {
    loadCache({ commit }) {
        commit("setDatas", getDataFromLS());
    },
    get({ commit }, filter) {
        return new Promise((resolve, reject) => {
            apiGetList(filter)
                .then(response => {
                    commit("setDatas", response.data.data);
                    localStorage.setItem('authors', response.data.data);
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
    create({}, genre) {
        return new Promise((resolve, reject) => {
            apiPost(genre)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    update({}, genre) {
        return new Promise((resolve, reject) => {
            apiUpdate(genre)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    delete({}, genre) {
        return new Promise((resolve, reject) => {
            apiDelete(genre)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    getBooksGenre({ commit }, genreId) {
        apiGetBooksGenre(genreId)
            .then(response => {
                commit("setBooksGenre", response.data.genreBooks[0]);
            })
            .catch(function(error) {
                if (error.response) {
                    reject(error.response.data);
                }
            });
    }
};

const mutations = {
    setDatas(state, genres) {
        state.genres = genres;
    },
    setPageCount(state, pageCount) {
        state.pageCount = pageCount;
    },
    setBooksGenre(state, booksGenre) {
        state.booksGenre = booksGenre;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};
