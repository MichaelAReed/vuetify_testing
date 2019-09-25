import Vue from 'vue';
import Vuex from 'vuex';

import router from '@/router'

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase";

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		loadedSuppliers: [
			{
				id: 'aoeuaosetuahoeu',
				name: 'Winsense',
				url: 'http://winsense.co.th/',
				location: 'Thailand',
				description:
					'An ISFET Supplier that has good responsiveness and cheapish samples.',
				imageURL: 'http://winsense.co.th/images/common/logo.png',
				date: new Date()
			},
			{
				id: 'oeuaoeukaeui',
				name: 'Wenext',
				url: 'http://wenext.cn/',
				location: 'Shenzhen',
				imageURL: 'http://www.wenext.cn/image/catalog/logo.png',
				description:
					'A 3D printing Supplier with super quick turnaround and good quality.',
				date: new Date()
			},
			{
				id: 'oeuieoideuideuid',
				name: 'Banana',
				url: 'http://banana.com/',
				location: 'My pants',
				imageURL:
					'https://i5.walmartimages.com/asr/209bb8a0-30ab-46be-b38d-58c2feb93e4a_1.1a15fb5bcbecbadd4a45822a11bf6257.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF',
				description: 'Literally a banana.',
				date: new Date()
			}
		],
		user: null,
		loading: false,
		error: null
	},
	mutations: {
		setLoadedSuppliers(state, payload) {
			state.loadedSuppliers = payload;
		},
		createSupplier(state, payload) {
			state.loadedSuppliers.push(payload);
		},
		setUser(state, payload) {
			state.user = payload;
		},
		setLoading(state, payload) {
			state.loading = payload;
		},
		setError(state, payload) {
			state.error = payload;
		},
		clearError(state) {
			state.error = null;
		}
	},
	actions: {
		loadSuppliers({ commit }) {
			commit('setLoading', true);
			firebase.database().ref('suppliers').once('value')
				.then((data) => {
					const suppliers = [];
					const obj = data.val();
					for (let key in obj) {
						suppliers.push({
							id: key,
							name: obj[key].name,
							url: obj[key].url,
							location: obj[key].location,
							imageURL: obj[key].imageURL,
							description: obj[key].description,
							date: obj[key].date,
							creatorID: obj[key].creatorID
						})
					}
					commit('setLoading', false);
					commit('setLoadedSuppliers', suppliers);
				})
				.catch((error) => {
					console.log(error);
					commit('setLoading', false);
				});
		},
		createSupplier({ commit, getters }, payload) {
			commit('setLoading', true);
			commit('clearError');
			const supplier = {
				name: payload.name,
				url: payload.url,
				location: payload.location,
				description: payload.description,
				date: payload.date.toISOString(),
				creatorID: getters.user.id
			};
			let imageURL;
			let key;
			firebase.database().ref('suppliers').push(supplier)
				.then((data) => {
					key = data.key;
					return key
				})
				.then(key => {
					const filename = payload.image.name;
					const ext = filename.slice(filename.lastIndexOf('.'));
					return firebase.storage().ref('suppliers/' + key + ext).put(payload.image);
				})
				.then(fileData => {
					return fileData.ref.getDownloadURL()
				})
				.then(downloadURL => {
					imageURL = downloadURL;
					return firebase.database().ref('suppliers').child(key).update({imageURL: imageURL})
				})
				.then(() => {
					commit('createSupplier', {
						...supplier,
						imageURL: imageURL,
						id: key
					});
					commit('setLoading', false);
					router.push('/suppliers');
				})
				.catch((error) => {
					console.log(error);
					commit('setLoading', false);
					commit('setError', error);
				})
		},
		signUpUser({commit}, payload) {
			commit('setLoading', true);
			commit('clearError');
			firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
				.then(
					user => {
						commit('setLoading', false);
						console.log(user);
						const newUser = {
							id: user.user.uid,
							createdSuppliers: []
						};
						commit('setUser', newUser);
					}
				)
				.catch(
					error => {
						commit('setLoading', false);
						commit('setError', error);
						console.log(error);
					}
				)
		},
		loginUser({commit}, payload) {
			commit('setLoading', true);
			commit('clearError');
			firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
				.then(
					user => {
						commit('setLoading', false);
						const newUser = {
							id: user.user.uid,
							createdSuppliers: []
						};
						commit('setUser', newUser);
					}
				)
				.catch(
					error => {
						commit('setLoading', false);
						commit('setError', error)
						console.log(error);
					}
				)
		},
		autoLoginUser({commit}, payload) {
			commit('setUser', {id: payload.uid, createdSuppliers: []});
		},
		logoutUser({commit}) {
			firebase.auth().signOut();
			commit('setUser', null);
			router.push('/');
		},
		clearError({commit}) {
			commit('clearError');
		},
		setError({commit}, message) {
			commit('setError', {message: message})
		}
	},
	getters: {
		loadedSuppliers(state) {
			return state.loadedSuppliers.sort((supplierA, supplierB) => {
				supplierA.lastUpdated > supplierB.lastUpdated;
			});
		},
		featuredSuppliers(state, getters) {
			return getters.loadedSuppliers.slice(0, 5);
		},
		loadedSupplier(state) {
			return supplierID => {
				return state.loadedSuppliers.find(supplier => {
					return supplier.id === supplierID;
				});
			};
		},
		user(state) {
			return state.user;
		},
		loading(state) {
			return state.loading;
		},
		error(state) {
			return state.error;
		}
	}
});
