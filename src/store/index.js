import Vue from 'vue';
import Vuex from 'vuex';

import router from '@/router'

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
// import * as firebase from "firebase";

// const BACKEND_ROOT_URL = "http://ec2-54-169-48-140.ap-southeast-1.compute.amazonaws.com:1234/";
const BACKEND_ROOT_URL = "http://localhost:1234/";
// const BACKEND_ROOT_URL = __backendHost;

Vue.use(Vuex);

// TODO: seems like we should probably swap from fetch to axios at some stage, not a big deal but will clean some shit up.


function findWithAttr(array, attr, value) {
	for(var i = 0; i < array.length; i += 1) {
		if(array[i][attr] === value) {
			return i;
		}
	}
	return -1;
}



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
		mattermostDetails: 	null,
		loadedTeams: 		[],
		loadedUsers: 		[],
		loadedToolTypes: 	[],
		loadedSuppliers: 	[],
		loadedTools: 		[],
		loadedBookings: 	[],
		user: 				null,
		loading: 			false,
		error: 				null
	},
	mutations: {
		setMattermostDetails(state, payload) {
			state.mattermostDetails = payload;
		},
		setLoadedSuppliers(state, payload) {
			state.loadedSuppliers = payload;
		},
		createSupplier(state, payload) {
			state.loadedSuppliers.push(payload);
		},

		// SUPPLIER MUTATIONS
		supplierCreate(state, payload) {
			state.loadedSuppliers.push(payload);
		},
		suppliersSetLoaded(state, payload) {
			state.loadedSuppliers = payload;
		},
		supplierDelete(state, supplierID) {
			state.loadedSuppliers = state.loadedSuppliers.filter(function(value, index, arr){
				return value._id !== supplierID;
			});
		},

		// TEAM MUTATIONS
		teamCreate(state, payload) {
			state.loadedTeams.push(payload);
		},
		teamsSetLoaded(state, payload) {
			state.loadedTeams = payload;
		},
		teamDelete(state, teamID) {
			state.loadedTeams = state.loadedTeams.filter(function(value, index, arr){
				return value._id !== teamID;
			});
		},

		// USER MUTATIONS
		userCreate(state, payload) {
			state.loadedUsers.push(payload);
// 			var index = state.loadedTeams.findIndex((team) => {
// 				return (payload.team._id === team._id);
// 			});
// 			state.loadedTeams[index].users.push(payload);
		},
		userDelete(state, userID) {
			state.loadedUsers = state.loadedUsers.filter(function(value, index, arr){
				return value._id !== userID;
			});
		},
		userEdit(state, payload) {
			var index = findWithAttr(state.loadedUsers, "_id", payload._id);

			if (index !== -1) {
// 				console.log(state.loadedUsers[index]);
				state.loadedUsers[index] = payload.data
// 				$.extend({},state.loadedUsers[index],payload.data);
// 				state.loadedUsers[index].assign(payload.data);
			}
		},
		userSetPermissions(state, payload) {
			var index = findWithAttr(state.loadedUsers, "_id", payload._id);
// 			console.log(payload.data);
			if (index !== -1) {
				state.loadedUsers[index].permissions = payload.data;
			}
// 			console.log(state.loadedUsers[index]);
		},
		usersSetLoaded(state, payload) {
			state.loadedUsers = payload;
		},

		// TOOLTYPE MUTATIONS
		toolTypeCreate(state, payload) {
			state.loadedToolTypes.push(payload);
		},
		toolTypesSetLoaded(state, payload) {
			state.loadedToolTypes = payload;
		},
		toolTypeDelete(state, toolTypeID) {
			state.loadedToolTypes = state.loadedToolTypes.filter(function(value, index, arr){
				return value._id !== toolTypeID;
			});
		},

		// TOOL MUTATIONS
		toolCreate(state, payload) {
			state.loadedTools.push(payload);
// 			console.log(state.loadedTools);
		},
		toolsSetLoaded(state, payload) {
			state.loadedTools = payload;
		},
		toolDelete(state, toolID) {
			state.loadedTools = state.loadedTools.filter(function(value, index, arr){
				return value._id !== toolID;
			});
		},
		toolEdit(state, payload) {
			var index = findWithAttr(state.loadedTools, "_id", payload._id);

			if (index !== -1) {
// 				console.log(state.loadedUsers[index]);
				state.loadedTools[index] = payload.data
// 				$.extend({},state.loadedUsers[index],payload.data);
// 				state.loadedUsers[index].assign(payload.data);
			}
		},

		// BOOKING MUTATIONS
		bookingCreate(state, payload) {
			state.loadedBookings.push(payload);
		},
		bookingsSetLoaded(state, payload) {
			state.loadedBookings = payload;
// 			console.log(state.loadedBookings);
		},
		bookingDelete(state, bookingID) {
			state.loadedBookings = state.loadedBookings.filter(function(value, index, arr){
				return value._id !== bookingID;
			});
		},

		// LOGIN MUTATIONS
		setUser(state, payload) {
			state.user = payload;
		},

		// LOADING MUTATIONS
		setLoading(state, payload) {
			state.loading = payload;
		},

		// ERROR DISPLAY MUTATIONS
		setError(state, payload) {
			state.error = payload;
		},
		clearError(state) {
			state.error = null;
		}
	},
	actions: {
		// Saving here as an example of how to include contextual information to the action, in this case the current user as the generator of the action
// 		createSupplier({ commit, getters }, payload) {
// 			commit('setLoading', true);
// 			commit('clearError');
// 			const supplier = {
// 				name: payload.name,
// 				url: payload.url,
// 				location: payload.location,
// 				description: payload.description,
// 				date: payload.date.toISOString(),
// 				creatorID: getters.user.id
// 			};
		requestPermission({ commit, dispatch }, payload) {
			commit('setLoading', true);
			commit('clearError');

			fetch(BACKEND_ROOT_URL + `users/${payload.userID}/requestPermission`,{
				method: "PUT",
				credentials: 'include',
				body : JSON.stringify(payload.permissionData),
				headers : {
					"Content-Type" : "application/json; charset=utf-8"
				}
			})
			.then((response)=>{
				return response.json();
			}).then((data)=>{
				if (data.error) return Promise.reject(data.error);
				commit('setLoading', false);
				// TODO: change this to a single edit commit
// 				commit('userAddPermission', {id: data._id, permissionData: payload.permissionData});
// 				console.log(data.permissions);
// 				commit('userSetPermissions', {id: data._id, data: data.permissions});
// 				router.push('/users/' + data._id);
				dispatch('loadUsers');
				dispatch('loadToolTypes');
			})
			.catch((error) => {
				commit('setError', error);
				commit('setLoading', false);
			});
		},
		deletePermissionRequest({ commit, dispatch }, payload) {
			commit('setLoading', true);
			commit('clearError');

			fetch(BACKEND_ROOT_URL + `users/${payload.userID}/deletePermissionRequest`,{
				method: "DELETE",
				credentials: 'include',
				body : JSON.stringify(payload.permissionData),
				headers : {
					"Content-Type" : "application/json; charset=utf-8"
				}
			})
			.then((response)=>{
				return response.json();
			}).then((data)=>{
				if (data.error) return Promise.reject(data.error);
				commit('setLoading', false);
				// TODO: change this to a single edit commit
// 				commit('userAddPermission', {id: data._id, permissionData: payload.permissionData});
// 				console.log(data.permissions);
// 				commit('userSetPermissions', {id: data._id, data: data.permissions});
// 				router.push('/users/' + data._id);
				dispatch('loadUsers');
			})
			.catch((error) => {
				commit('setError', error);
				commit('setLoading', false);
			});
		},
		addPermissionToUser({ commit, dispatch }, payload) {
			commit('setLoading', true);
			commit('clearError');

			fetch(BACKEND_ROOT_URL + `users/${payload.userID}/addPermission`,{
				method: "PUT",
				credentials: 'include',
				body : JSON.stringify(payload.permissionData),
				headers : {
					"Content-Type" : "application/json; charset=utf-8"
				}
			})
			.then((response)=>{
				return response.json();
			}).then((data)=>{
				if (data.error) return Promise.reject(data.error);
				commit('setLoading', false);
				// TODO: change this to a single edit commit
// 				commit('userAddPermission', {id: data._id, permissionData: payload.permissionData});
// 				console.log(data.permissions);
				commit('userSetPermissions', {id: data._id, data: data.permissions});
// 				router.push('/users/' + data._id);
				dispatch('loadUsers');
			})
			.catch((error) => {
				commit('setError', error);
				commit('setLoading', false);
			});
		},
		createSupplier({ commit, dispatch }, payload) {
			return dispatch('createObject', {typeString: 'supplier', image: payload.image, objectData: payload.supplierData});
		},
		createTeam({ commit, dispatch }, payload) {
			return dispatch('createObject', {typeString: 'team', image: payload.image, objectData: payload.teamData});
		},
		createUser({ commit, dispatch }, payload) {
			return dispatch('createObject', {typeString: 'user', image: payload.image, objectData: payload.userData});
		},
		createToolType({ commit, dispatch }, payload) {
			return dispatch('createObject', {typeString: 'toolType', image: payload.image, objectData: payload.toolTypeData});
		},
		createTool({ commit, dispatch }, payload) {
			return dispatch('createObject', {typeString: 'tool', objectData: payload.toolData});
		},
		createBooking({ commit, dispatch }, payload) {
			return dispatch('createObject', {typeString: 'booking', objectData: payload.bookingData});
		},
		createObject({ commit, dispatch }, payload) {
			commit('setLoading', true);
			commit('clearError');
// 			let imageURL;
			let returnObjectData;

			fetch(BACKEND_ROOT_URL + payload.typeString + `s/create`,{
				method: "POST",
				credentials: 'include',
				body : JSON.stringify(payload.objectData),
				headers : {
					"Content-Type" : "application/json; charset=utf-8"
				}
			})
			.then((response)=>{
				return response.json();
			})
			.then((data)=>{
				if (data.error) return Promise.reject(data.error, data);
				returnObjectData = data;
// 				if (!payload.image) return Promise.reject(new Error("No Image."));
				if (!payload.image) return data;
				const filename = payload.image.name;
				const ext = filename.slice(filename.lastIndexOf('.'));

				var imageData = new FormData();
				imageData.append(payload.typeString + 'Image', payload.image);
				return fetch(BACKEND_ROOT_URL + payload.typeString + `s/${returnObjectData._id}/uploadImage`,{
					method : 'post',
					credentials: 'include',
					body : imageData,
// 					headers : {
// 						"Content-Type" : "multipart/form-data"
// 					}
				});
			})
			.then((response)=>{
				if (response.json) return response.json();
				return response;
			})
			.then((data)=>{
				if (data.error) return Promise.reject(data.error, data);
				commit(payload.typeString + 'Create', data);
				commit('setLoading', false);
				if (payload.typeString === 'user') {
					dispatch('loginUser');
				} else if (payload.typeString === 'booking'){
					dispatch('loadBookings');
				} else {
					router.push('/' + payload.typeString + 's/' + data._id)
					.catch((err) => {
						console.log(`error is ${err}`);
					});
				}
			})
			.catch((error) => {
				console.log(error);
				commit('setLoading', false);
				commit('setError', error);
// 				if (error.message === "No Image." && returnObjectData) {
// 					commit(payload.typeString + 'Create', returnObjectData);
// 					commit('setLoading', false);
// 					router.push('/' + payload.typeString + 's/' + returnObjectData._id);
// 				} else {
// 					console.log(error);
// 					commit('setLoading', false);
// 					commit('setError', error);
// 				}
			});
		},
		deleteSupplier({ commit, dispatch }, supplierID) {
			return dispatch('deleteObject', {typeString: 'supplier', objectID: supplierID});
		},
		deleteToolType({ commit, dispatch }, toolTypeID) {
			return dispatch('deleteObject', {typeString: 'toolType', objectID: toolTypeID});
		},
		deleteTool({ commit, dispatch }, toolID) {
			return dispatch('deleteObject', {typeString: 'tool', objectID: toolID});
		},
		deleteBooking({ commit, dispatch }, bookingID) {
			return dispatch('deleteObject', {typeString: 'booking', objectID: bookingID});
		},
		deleteUser({ commit, dispatch }, userID) {
			return dispatch('deleteObject', {typeString: 'user', objectID: userID});
		},
		deleteTeam({ commit, dispatch }, teamID) {
			return dispatch('deleteObject', {typeString: 'team', objectID: teamID});
		},
		deleteObject({commit, dispatch}, payload) {
			commit('setLoading', true);
			commit('clearError');
			fetch(BACKEND_ROOT_URL + payload.typeString + `s/${payload.objectID}/delete`,{
				method: "DELETE",
				credentials: 'include',
// 				headers : {
// 					"Content-Type" : "application/json; charset=utf-8"
// 				}
			})
			.then((response)=>{
				if (response.json) return response.json();
				return response;
			})
			.then((data)=>{
				if (data.error) return Promise.reject(data.error);
				commit(payload.typeString + 'Delete', payload.objectID);
				commit('setLoading', false);
				if (payload.typeString === 'booking'){
					dispatch('loadBookings')
				} else {
					router.push('/' + payload.typeString + 's/');
				}
			}).catch((error) => {
				commit('setLoading', false);
				commit('setError', error);
			});
		},
		updateUser({ commit, dispatch }, payload) {
			return dispatch('updateObject', {typeString: 'user', objectID: payload.objectID, objectData: payload.objectData, image: payload.image});
		},
		updateObject({commit}, payload) {
			commit('setLoading', true);
			commit('clearError');
			console.log(`updating object with:`);
			console.log(payload.objectData);
			console.log(BACKEND_ROOT_URL + payload.typeString + `s/${payload.objectID}/update`);
			fetch(BACKEND_ROOT_URL + payload.typeString + `s/${payload.objectID}/update`,{
				method: "PUT",
				credentials: 'include',
				body : JSON.stringify(payload.objectData),
				headers : {
					"Content-Type" : "application/json; charset=utf-8"
				}
			})
			.then((response)=>{
				return response.json();
			})
			.then((data)=>{
				if (data.error) return Promise.reject(data.error, data);
// 				if (!payload.image) return Promise.reject(new Error("No Image."));
				if (!payload.image) return data;
				const filename = payload.image.name;
				const ext = filename.slice(filename.lastIndexOf('.'));

				var imageData = new FormData();
				imageData.append(payload.typeString + 'Image', payload.image);
				return fetch(BACKEND_ROOT_URL + payload.typeString + `s/${data._id}/uploadImage`,{
					method : 'post',
					credentials: 'include',
					body : imageData,
// 					headers : {
// 						"Content-Type" : "multipart/form-data"
// 					}
				});
			})
			.then((response)=>{
				if (response.json) return response.json();
				return response;
			})
			.then((data)=>{
				if (data.error) return Promise.reject(data.error, data);
				commit(payload.typeString + 'Edit', data);
				commit('setLoading', false);
				router.push('/' + payload.typeString + 's/')
			})
			.catch((error) => {
				console.log(error);
				commit('setLoading', false);
				commit('setError', error);
			});
		},
		loadSuppliers({ commit, dispatch }) {
			return dispatch('loadObjects', {typeString: 'supplier'});
		},
		loadToolTypes({ commit, dispatch }) {
			return dispatch('loadObjects', {typeString: 'toolType'});
		},
		loadTools({ commit, dispatch }) {
			return dispatch('loadObjects', {typeString: 'tool'});
		},
		loadBookings({ commit, dispatch }) {
			return dispatch('loadObjects', {typeString: 'booking'});
		},
		loadUsers({ commit, dispatch }) {
			return dispatch('loadObjects', {typeString: 'user'});
		},
		loadTeams({ commit, dispatch }) {
			return dispatch('loadObjects', {typeString: 'team'});
		},
		loadEverything({commit, dispatch}) {
			let typeStrings = ['supplier', 'toolType', 'tool', 'booking', 'user', 'team']
			return typeStrings.map((typeString) => {return dispatch('loadObjects', {typeString: typeString})});
		},
		loadObjects({commit}, payload) {
			return new Promise((resolve, reject) => {
				commit('setLoading', true);
				fetch(BACKEND_ROOT_URL + payload.typeString + 's/getAll',{
					method: "get",
					credentials: 'include'
				})
				.then((response)=>{
					return response.json();
				}).then((data)=>{
					if (data.error) return Promise.reject(data.error);
// 					console.log(`loaded ${payload.typeString}s: `);
// 					console.log(data);
					commit('setLoading', false);
					commit(payload.typeString + 'sSetLoaded', data);
					resolve();
				})
				.catch((error) => {
					commit('setError', error);
					commit('setLoading', false);
					reject();
				});
			});
		},

		checkoutTool ({commit, dispatch, getters}, payload) {
			return new Promise((resolve, reject) => {
				commit('setLoading', true);
				commit('clearError');
				console.log("attempting to checkout");
				console.log(payload);
				fetch(BACKEND_ROOT_URL + `tools/${payload.objectID}/${payload.checkoutNotReturn ? 'checkout' : 'return'}`,{
					method: "post",
					credentials: 'include'
				})
				.then((response)=>{
					return response.json();
				}).then((data)=>{
					if (data.error) return Promise.reject(data.error);
// 					console.log(`loaded ${payload.typeString}s: `);
// 					console.log(data);
					commit('setLoading', false);
					commit('toolEdit', data);
					router.push('/users/' + getters.user._id)
					resolve();
				})
				.catch((error) => {
					commit('setError', error);
					commit('setLoading', false);
					reject();
				});
			});
		},
		loginUser({commit}) {
			commit('setLoading', true);
			commit('clearError');
			console.log("attempting to login");
			// TODO: make this reference to the backendHost general
			window.location.href = `${BACKEND_ROOT_URL}login`;
		},
		getMattermostDetails({commit}) {
			return new Promise((resolve, reject) => {
				commit('setLoading', true);
				commit('clearError');
				fetch(BACKEND_ROOT_URL + 'getMattermostDetails', {
					method: "get",
					credentials: 'include'
				})
				.then((response)=>{
					return response.json();
				}).then((data)=>{
					if (data.error) return Promise.reject(data.error);
// 					console.log("Mattermost details return: ");
// 					console.log(data);
					commit('setMattermostDetails', data);
	// 				return data;
					commit('setLoading', false);
					resolve();
				})
				.catch((error) => {
					console.log(error);
					commit('setError', error);
					commit('setLoading', false);
					reject();
				});
			});
		},
		authorize({commit, dispatch}, next) {
			console.log("authorizing...");
			console.log(BACKEND_ROOT_URL);
			commit('setLoading', true);
			commit('clearError');
// 			console.log("starting auth");
			fetch(BACKEND_ROOT_URL + 'authorize', {
				method: "get",
				credentials: 'include'
			})
			.then((response)=>{
				return response.json();
			}).then((data)=>{
				if (data.error) return Promise.reject(data.error);
// 				console.log("Authorize return: ");
// 				console.log(data);
				// TODO: this is set to check for data._id only because it returns {} if the user isn't authenticated
				// and I couldn't just do "if (data)", I should probably find a better way to do it later.
				if (data._id) {
					commit('setUser', data);
					dispatch('loadEverything');
// 					dispatch('loadSuppliers');
// 					dispatch('loadTeams');
// 					dispatch('loadUsers');
// 					dispatch('loadToolTypes');
// 					dispatch('loadTools');
// 					dispatch('loadBookings');
					console.log("authorization succeeded")
					if (next) next();
				} else if (!data.mattermostImgURL) {
					return dispatch('loginUser');
				}
				commit('setLoading', false);
			})
			.catch((error) => {
				console.log(error);
				commit('setError', error);
				commit('setLoading', false);
			});
		},
		autoLoginUser({commit}, payload) {
			commit('setUser', {id: payload.uid, createdSuppliers: []});
		},
		logoutUser({commit}) {
			commit('setLoading', true);
			commit('clearError');
			fetch(BACKEND_ROOT_URL + 'logout', {
				method: "get",
				credentials: 'include'
			})
			.then((response)=>{
				return response.json();
			}).then((data)=>{
				if (data.error) return Promise.reject(data.error);
				commit('setUser', null);
				commit('setLoading', false);
				// NOTE: putting this catch here just means I'm ignoring all errors which probable isn't the right thing to do
				// but the push throws an error if it's already at the home page when it pushes you to the home page.
				router.push('/').catch(err => {});
			})
			.catch((error) => {
				console.log(error);
				commit('setError', error);
				commit('setLoading', false);
			});
		},
		goToNewMattermostUser({commit}, payload) {
			router.push('/users/newMattermostUser/').catch(err => {});
		},
		clearError({commit}) {
			commit('clearError');
		},
		setError({commit}, message) {
			commit('setError', {message: message})
		}
	},
	getters: {

		mattermostDetails(state) {
			return state.mattermostDetails;
		},

		// TEAM GETTERS
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

		// USER GETTERS
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

		// TOOLTYPE GETTERS
		loadedToolTypes(state) {
			return (includeCategories, includeTools) => {
				let returnList = state.loadedToolTypes.sort((toolTypeA, toolTypeB) => {
					toolTypeA.lastUpdated > toolTypeB.lastUpdated;
				});
				if (includeCategories && includeTools) {
					return returnList;
				} else if (includeCategories) {
					return returnList.filter(toolType => {
						return !toolType.isTool;
					});
				} else if (includeTools) {
					return returnList.filter(toolType => {
						return toolType.isTool;
					});
				} else {
					return [];
				}
			}
		},
		loadedToolTypesTools(state) {
			return state.loadedToolTypes.filter(toolType => {
				return toolType.isTool;
			});
		},
		loadedToolType(state) {
			return toolTypeID => {
				return state.loadedToolTypes.find(toolType => {
					return toolType._id === toolTypeID;
				});
			};
		},
		loadedChildrenToolTypes_tool(state) {
			return toolTypeID => {
				return state.loadedToolTypes.filter(toolType => {
					return (toolType.parent._id === toolTypeID && toolType.isTool);
				});
			}
		},
		loadedChildrenToolTypes_category(state) {
			return toolTypeID => {
				return state.loadedToolTypes.filter(toolType => {
					return (toolType.parent._id === toolTypeID && !(toolType.isTool));
				});
			}
		},

		// TOOL GETTERS
		loadedTools(state) {
			return state.loadedTools.sort((toolA, toolB) => {
				toolA.lastMaintained > toolB.lastMaintained;
			});
		},
		loadedTool(state) {
			return toolID => {
				return state.loadedTools.find(tool => {
					return tool._id === toolID;
				});
			};
		},
		loadedToolsOfType(state) {
			return toolTypeID => {
				return state.loadedTools.filter(tool => {
					return tool.toolType._id === toolTypeID;
				});
			};
		},
		loadedToolsCheckedByUser(state) {
			return userID => {
				return state.loadedTools.filter(tool => {
					if (!(tool.checkedOutBy)) return false;
					return tool.checkedOutBy._id === userID;
				});
			};
		},

		// BOOKING GETTERS
		loadedBookingsToolName(state, getters) {
			return getters.loadedBookingsToolOrUser(false);
		},
		loadedBookingsUserName(state, getters) {
			return getters.loadedBookingsToolOrUser(true);
		},
		loadedBookingsToolOrUser(state, getters) {
			return isToolNotUser => {
				var bookingsVTime = state.loadedBookings;
				bookingsVTime.forEach((val, index, array) => {
					var start = new Date(val.start);
					val.start = start.getFullYear() + "-" + (start.getMonth() + 1) + "-" + start.getDate() + " " + start.getHours() + ":" + start.getMinutes() + ":" + start.getSeconds();
					var end = new Date(val.end);
					val.end = end.getFullYear() + "-" + (end.getMonth() + 1) + "-" + end.getDate() + " " + end.getHours() + ":" + end.getMinutes() + ":" + end.getSeconds();
					if (isToolNotUser) {
						let toolTypeName = getters.loadedToolType(val.tool.toolType).name;
						val.name = `${toolTypeName}: ${val.tool.nameNum}`;
					} else {
						val.name = val.user.name;
					}
				});
				return bookingsVTime;
			}
		},

		loadedBookingsOfTool(state, getters) {
			return toolID => {
				return getters.loadedBookingsToolName.filter(booking => {
					return booking.tool._id === toolID
				});
			};
		},
		loadedBookingsOfUser(state, getters) {
			return userID => {
				return getters.loadedBookingsUserName.filter(booking => {
					return booking.user._id === userID
				});
			};
		},

		// SUPPLIER GETTERS
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
