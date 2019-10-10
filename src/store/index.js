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
		loadedTeams: [],
		loadedUsers: [],
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
		createTeam(state, payload) {
			state.loadedTeams.push(payload);
		},
		setLoadedTeams(state, payload) {
			state.loadedTeams = payload;
		},
		createUser(state, payload) {
			state.loadedUsers.push(payload);
		},
		deleteUser(state, userID) {
			state.loadedUsers = state.loadedUsers.filter(function(value, index, arr){
				console.log(value);
				return value._id !== userID;
			});
		},
		setLoadedUsers(state, payload) {
			state.loadedUsers = payload;
		},
		updateSupplierData(state, payload) {
			const supplier = state.loadedSuppliers.find(supplier => {
				return supplier.id === payload.id
			});
			if (payload.name) {
				supplier.name = payload.name;
			}
			if (payload.url) {
				supplier.url = payload.url;
			}
			if (payload.description) {
				supplier.description = payload.description;
			}
			if (payload.location) {
				supplier.location = payload.location;
			}
			if (payload.date) {
				supplier.date = payload.date;
			}
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
					commit('setError', error);
					commit('setLoading', false);
				});
		},
		loadTeamsNode({ commit }) {
			commit('setLoading', true);
			fetch('http://localhost:1234/teams/getAll',{method: "get"}).then((response)=>{
				return response.json();
			}).then((data)=>{
				console.log(data);
				commit('setLoading', false);
				commit('setLoadedTeams', data);
			})
			.catch((error) => {
				commit('setError', error);
				commit('setLoading', false);
			});
		},
		loadTeams({ commit }) {
			commit('setLoading', true);
			firebase.database().ref('teams').once('value')
				.then((data) => {
					const teams = [];
					const obj = data.val();
					for (let key in obj) {
						teams.push({
							id: key,
							name: obj[key].name,
							url: obj[key].url,
							imageURL: obj[key].imageURL,
							description: obj[key].description,
							status: obj[key].status,
							members: [],
							lastUpdated: obj[key].lastUpdated
						})
					}
					commit('setLoading', false);
					commit('setLoadedTeams', teams);
				})
				.catch((error) => {
					commit('setError', error);
					commit('setLoading', false);
				});
		},
		createTeamNode({ commit }, payload) {
			commit('setLoading', true);
			commit('clearError');
			const team = {
				name: 			payload.name,
				url: 			payload.url,
				credits:		payload.credits,
				description:	payload.description,
				status:			payload.status,
			};
			let imageURL;
			let returnTeam;
			fetch(`http://localhost:1234/teams/create`,{
				method: "POST",
				body : JSON.stringify(team),
				headers : {
					"Content-Type" : "application/json; charset=utf-8"
				}
			}).then((response)=>{
				return response.json();
			}).then((data)=>{
				if(data.error) {
					return Promise.reject(data.error);
				}
				returnTeam = data;
				const filename = payload.image.name;
				const ext = filename.slice(filename.lastIndexOf('.'));

				var imageData = new FormData();
				imageData.append('teamImage', payload.image)
				return fetch(`http://localhost:1234/teams/${returnTeam._id}/uploadImage`,{
					method : 'post',
					body : imageData,
				})
			.then((response)=>{
				return response.json();
			}).then((data)=>{
				commit('createTeam', data);
				commit('setLoading', false);
				router.push('/teams/' + data._id);
			})
			}).catch((error) => {
				console.log(error);
				commit('setLoading', false);
				commit('setError', error);
			});
		},
		createTeam({ commit }, payload) {
			commit('setLoading', true);
			commit('clearError');
			const team = {
				name: payload.name,
				url: payload.url,
				description: payload.description,
				credits: payload.credits,
				status: payload.status,
				lastUpdated: new Date()
			}
			let imageURL;
			let key;
			firebase.database().ref('teams').push(team)
				.then((data) => {
					key = data.key;
					return key
				})
				.then(key => {
					const filename = payload.image.name;
					const ext = filename.slice(filename.lastIndexOf('.'));
					return firebase.storage().ref('teams/' + key + ext).put(payload.image);
				})
				.then(fileData => {
					return fileData.ref.getDownloadURL()
				})
				.then(downloadURL => {
					imageURL = downloadURL;
					return firebase.database().ref('teams').child(key).update({imageURL: imageURL})
				})
				.then(() => {
					commit('createTeam', {
						...team,
						imageURL: imageURL,
						id: key
					});
					commit('setLoading', false);
					router.push('/teams/'+key);
				})
				.catch((error) => {
					console.log(error);
					commit('setLoading', false);
					commit('setError', error);
				})
		},
		loadUsersNode({ commit }) {
			commit('setLoading', true);
			fetch('http://localhost:1234/users/getAll',{method: "get"}).then((response)=>{
				return response.json();
			}).then((data)=>{
				commit('setLoading', false);
				commit('setLoadedUsers', data);
			})
			.catch((error) => {
				commit('setError', error);
				commit('setLoading', false);
			});
		},
		loadUsers({ commit }) {
			commit('setLoading', true);
			firebase.database().ref('users').once('value')
				.then((data) => {
					const users = [];
					const obj = data.val();
					for (let key in obj) {
						users.push({
							id: key,
							name: obj[key].name,
							email: obj[key].email,
							wechat: obj[key].wechat,
							mattermostID: obj[key].mattermostID,
							phoneNum: obj[key].phoneNum,
							lang: obj[key].lang,
							team: obj[key].team,
							position: obj[key].position,
							introduction: obj[key].introduction,
							lastUpdated: obj[key].lastUpdated,
							imageURL: obj[key].imageURL
						})
					}
					commit('setLoading', false);
					commit('setLoadedUsers', users);
				})
				.catch((error) => {
					commit('setError', error);
					commit('setLoading', false);
				});
		},
		createUserNode({ commit }, payload) {
			commit('setLoading', true);
			commit('clearError');
			const user = {
				name: payload.name,
				email: payload.email,
				wechat: payload.wechat,
				mattermostID: payload.mattermostID,
				phoneNum: payload.phoneNum,
				lang: payload.lang,
				team: payload.team,
				position: payload.position,
				introduction: payload.introduction
			};
			let imageURL;
			let returnUser;
			fetch(`http://localhost:1234/users/create`,{
				method: "POST",
				body : JSON.stringify(user),
				headers : {
					"Content-Type" : "application/json; charset=utf-8"
				}
			}).then((response)=>{
				return response.json();
			}).then((data)=>{
				if(data.error) {
					return Promise.reject(data.error);
				}
				returnUser = data;
				const filename = payload.image.name;
				const ext = filename.slice(filename.lastIndexOf('.'));

				var imageData = new FormData()
				imageData.append('userImage', payload.image)
				return fetch(`http://localhost:1234/users/${returnUser._id}/uploadImage`,{
					method : 'post',
					body : imageData,
// 					headers : {
// 						"Content-Type" : "multipart/form-data"
// 					}
				})
			.then((response)=>{
				return response.json();
			}).then((data)=>{
				commit('createUser', data);
				commit('setLoading', false);
				router.push('/users/' + data._id);
			})
			}).catch((error) => {
				console.log(error);
				commit('setLoading', false);
				commit('setError', error);
			});
		},
		createUser({ commit }, payload) {
			commit('setLoading', true);
			commit('clearError');
			const user = {
				name: payload.name,
				email: payload.email,
				wechat: payload.wechat,
				mattermostID: payload.mattermostID,
				phoneNum: payload.phoneNum,
				lang: payload.lang,
				team: payload.team,
				position: payload.position,
				introduction: payload.introduction,
				lastUpdated: new Date(),
			};
			let imageURL;
			let key;
			firebase.database().ref('users').push(user)
				.then((data) => {
					key = data.key;
					return key
				})
				.then(key => {
					const filename = payload.image.name;
					const ext = filename.slice(filename.lastIndexOf('.'));
					return firebase.storage().ref('users/' + key + ext).put(payload.image);
				})
				.then(fileData => {
					return fileData.ref.getDownloadURL()
				})
				.then(downloadURL => {
					imageURL = downloadURL;
					return firebase.database().ref('users').child(key).update({imageURL: imageURL})
				})
				.then(() => {
					commit('createUser', {
						...user,
						imageURL: imageURL,
						id: key
					});
					commit('setLoading', false);
					router.push('/users/'+key);
				})
				.catch((error) => {
					console.log(error);
					commit('setLoading', false);
					commit('setError', error);
				})
		},
		deleteUser({ commit }, userID) {
			commit('setLoading', true);
			commit('clearError');
			fetch(`http://localhost:1234/users/${userID}/delete`,{
				method: "DELETE",
// 				headers : {
// 					"Content-Type" : "application/json; charset=utf-8"
// 				}
			}).then((data)=>{
				commit('deleteUser', userID);
				commit('setLoading', false);
				router.push('/users/');
			}).catch((error) => {
				console.log(error);
				commit('setLoading', false);
				commit('setError', error);
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
		updateSupplierData({commit}, payload) {
			commit('setLoading', true);
			commit('clearError');
			const updateObj = {};
			if (payload.name) {
				updateObj.name = payload.name;
			}
			if (payload.url) {
				updateObj.url = payload.url;
			}
			if (payload.description) {
				updateObj.description = payload.description;
			}
			if (payload.location) {
				updateObj.location = payload.location;
			}
			if (payload.date) {
				updateObj.date = payload.date;
			}
			firebase.database().ref('suppliers').child(payload.id).update(updateObj)
				.then(() => {
					commit('setLoading', false);
					commit('updateSupplierData', payload);
				})
				.catch((error) => {
					commit('setLoading', false);
					commit('setError', error);
				});
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
		loadedTeams(state) {
			return state.loadedTeams.sort((teamA, teamB) => {
				teamA.lastUpdated > teamB.lastUpdated;
			});
		},
		loadedTeam(state) {
			return teamID => {
				return state.loadedTeams.find(team => {
					return team._id === teamID;
				});
			};
		},
		loadedUsers(state) {
			return state.loadedUsers.sort((userA, userB) => {
				userA.lastUpdated > userB.lastUpdated;
			});
		},
		loadedUser(state) {
			return userID => {
				return state.loadedUsers.find(user => {
					return user._id === userID;
				});
			};
		},
		featuredSuppliers(state, getters) {
			return getters.loadedSuppliers.slice(0, 5);
		},
		loadedSupplier(state) {
			return supplierID => {
				return state.loadedSuppliers.find(supplier => {
					return supplier._id === supplierID;
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
