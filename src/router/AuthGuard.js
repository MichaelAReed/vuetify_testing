import { store } from '@/store'

export default (to, from, next) => {
	if (store.getters.user) {
		next();
	} else {
		console.log("to params: ");
		console.log(to.params);
// 		console.log("attempting authorisation.");
		localStorage.setItem("LAST_ROUTE", to.name);
		localStorage.setItem("LAST_ROUTE_ID", to.params.id);
		store.dispatch('authorize', next);
// 		store.dispatch('loginUser');
// 		next('/login');
	}
}
