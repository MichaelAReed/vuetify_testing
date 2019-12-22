import { store } from '@/store'

export default (to, from, next) => {
	if (store.getters.user) {
		next();
	} else {
// 		console.log("attempting authorisation.");
		store.dispatch('authorize', next);
// 		store.dispatch('loginUser');
// 		next('/login');
	}
}
