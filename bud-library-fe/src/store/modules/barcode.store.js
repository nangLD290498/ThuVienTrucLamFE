import {
    apiGetList,
    apiGetById,
    apiPost,
    apiUpdate,
    apiDelete,
    apiPostGenerate,
    apiGetBarcodesOfBook,
    apiGetByBarcode,
} from "@/api/barcode.api";

const getAuthors = () => {
    const barcodes = localStorage.getItem("barcodes");
    if (barcodes) {
        try {
            return JSON.parse(barcodes);
        } catch (e) {
            return null;
        }
    }
    return null;
};
const barcodes = getAuthors();
const state = barcodes
    ? {
          barcodes: barcodes,
          pageCount: 0,
          generateBarcodes: []
      }
    : {
          barcodes: [],
          pageCount: 0,
          generateBarcodes: []
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
    update({}, barcode) {
        return new Promise((resolve, reject) => {
            apiUpdate(barcode)
                .then(response => {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    delete({}, barcode) {
        return new Promise((resolve, reject) => {
            apiDelete(barcode)
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
                    commit("setGenerateBarcodes", response.data.data);
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    clearGenerateBarcodes({ commit }) {
        commit("clearGenerateBarcodes");
    },
    setGenerateBarcodes({ commit }, generateBarcodes) {
        commit("setGenerateBarcodes", generateBarcodes);
    },
    getBarcodesOfBook({ commit }, id) {
        return new Promise((resolve, reject) => {
            apiGetBarcodesOfBook(id)
                .then(response => {
                    commit("setGenerateBarcodes", response.data);
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    findByBarcode({ commit }, barcode) {
        return new Promise((resolve, reject) => {
            apiGetByBarcode(barcode)
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
    setDatas(state, barcodes) {
        state.barcodes = barcodes;
    },
    setPageCount(state, pageCount) {
        state.pageCount = pageCount;
    },
    setGenerateBarcodes(state, generateBarcodes) {
        state.generateBarcodes = generateBarcodes;
    },
    clearGenerateBarcodes(state) {
        state.generateBarcodes = [];
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};
