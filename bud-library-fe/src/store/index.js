import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules'; // import the auto exporter
import { STORAGE_BASE_INFO,  STORAGE_AREA_INFO} from '../config/constants';
import httpClient from '../api/httpClient'


const getStorageBaseInfo = () => {
	const baseInfo = localStorage.getItem(STORAGE_BASE_INFO);
	if (baseInfo) {
		try {
			return JSON.parse(baseInfo);
		} catch (e) {
			return null;
		}
	}
	return null;
};

const getStorageArea = () => {
	const areaInfo = localStorage.getItem(STORAGE_AREA_INFO);
	if (areaInfo) {
		try {
			return JSON.parse(areaInfo);
		} catch (e) {
			return null;
		}
	}
	return null;
};

export const store = new Vuex.Store({
	state: {
		showErrorModal: false,
		error: {},
		hasStorageBaseInfo: false,
		baseInfo: getStorageBaseInfo(),
		areaInfo: getStorageArea()
	},
	getters: {
		getBaseInfo: state => state.baseInfo,
		getAreaInfo: state => state.getAreaInfo,
	},
	mutations: {
		SET_BASE_INFO(state, baseInfo) {
			localStorage.setItem(STORAGE_BASE_INFO, JSON.stringify({ ...baseInfo }));
			state.baseInfo = baseInfo;

			for (var models in baseInfo) {
				localStorage.setItem(models, JSON.stringify(baseInfo[models]));
			}
		},
		SET_AREA_INFO(state, areaInfo) {
			localStorage.setItem(STORAGE_BASE_INFO, JSON.stringify({ ...areaInfo }));
			state.baseInfo = areaInfo;

			for (var models in areaInfo) {
				localStorage.setItem(models, JSON.stringify(areaInfo[models]));
			}
		},
	},
	actions: {
		getBaseInfo({ commit }) {
			return new Promise((resolve, reject) => {
				httpClient.get(`/base-data`)
					.then(response => {
						commit('SET_BASE_INFO', response.data)
						resolve(response);
					})
					.catch(error => reject(error));
			});
		},
		getAreaInfo({ commit }) {
			return new Promise((resolve, reject) => {
				httpClient.get(`/area-data`)
					.then(response => {
						commit('SET_AREA_INFO', response.data)
						resolve(response);
					})
					.catch(error => reject(error));
			});
		},
	},
	modules: modules
});