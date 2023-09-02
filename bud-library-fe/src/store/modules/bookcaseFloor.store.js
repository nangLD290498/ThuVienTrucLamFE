import {
    apiGetList,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete
} from "@/api/bookcaseFloor.api";

const getDataFromLS = () => {
    const bookcaseFloors = localStorage.getItem("bookcaseFloors");
    if (bookcaseFloors) {
        try {
            return JSON.parse(bookcaseFloors);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const bookcaseFloors = getDataFromLS();
const state = bookcaseFloors
    ? {
          bookcaseFloors: bookcaseFloors,
          pageCount: 0
      }
    : {
          bookcaseFloors: [],
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
    create({}, bookcaseFloor) {
        return new Promise((resolve, reject) => {
            apiPost(bookcaseFloor)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    update({}, bookcaseFloor) {
        return new Promise((resolve, reject) => {
            apiUpdate(bookcaseFloor)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    delete({}, bookcaseFloor) {
        return new Promise((resolve, reject) => {
            apiDelete(bookcaseFloor)
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
    setDatas(state, bookcaseFloors) {
        state.bookcaseFloors = bookcaseFloors;
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
