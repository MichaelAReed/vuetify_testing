import { store } from '@/store'

import router from '@/router'

export default (to, from, next) => {
	if (store.getters.user) {
		if (store.getters.user.isAdmin) {
			next();
		} else {
			router.push(`/users/${store.getters.user._id}`);
		}
	} else {
// 		console.log("attempting authorisation.");
		store.dispatch('authorize', next);
// 		store.dispatch('loginUser');
// 		next('/login');
	}
}
