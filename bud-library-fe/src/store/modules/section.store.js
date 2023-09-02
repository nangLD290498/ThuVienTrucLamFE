import {
    apiGetList,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete,
    apiGetBooksSection,
} from "@/api/section.api";

const getDataFromLS = () => {
    const sections = localStorage.getItem("sections");
    if (sections) {
        try {
            return JSON.parse(sections);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const sections = getDataFromLS();
const state = sections
    ? {
          sections: sections,
          pageCount: 0,
          booksSection: [],
      }
    : {
          sections: [],
          pageCount: 0,
          booksSection: [],
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
    create({}, section) {
        return new Promise((resolve, reject) => {
            apiPost(section)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    update({}, section) {
        return new Promise((resolve, reject) => {
            apiUpdate(section)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    delete({}, section) {
        return new Promise((resolve, reject) => {
            apiDelete(section)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    getBooksSection({ commit }, sectionId) {
        apiGetBooksSection(sectionId)
            .then(response => {
                commit("setBooksSection", response.data.sectionBooks[0]);
            })
            .catch(function(error) {
                if (error.response) {
                    reject(error.response.data);
                }
            });
    }
};

const mutations = {
    setDatas(state, sections) {
        state.sections = sections;
    },
    setPageCount(state, pageCount) {
        state.pageCount = pageCount;
    },
    setBooksSection(state, booksSection) {
        state.booksSection = booksSection;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};
