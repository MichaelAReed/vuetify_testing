import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';
import vuetify from './plugins/vuetify';
import dateFilter from './filters/date';
import alertCmp from './components/Alert';
import editSupplierDetailsDialog from './components/editSupplierDetailsDialog';
import editSupplierDateDialog from './components/editSupplierDateDialog';
import editSupplierTimeDialog from './components/editSupplierTimeDialog';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase";

// Vue.use(vuetify);
Vue.config.productionTip = false;
Vue.filter('date', dateFilter);
Vue.component('app-alert', alertCmp);
Vue.component('app-edit-supplier-details-dialog', editSupplierDetailsDialog);
Vue.component('app-edit-supplier-date-dialog', editSupplierDateDialog);
Vue.component('app-edit-supplier-time-dialog', editSupplierTimeDialog);

new Vue({
	router,
	vuetify,
	store,
	render: h => h(App),
	created() {
		firebase.initializeApp({
			apiKey: "AIzaSyCcU9Y9LLLBOzNJR8KDBQmkk_k-bbon8rQ",                             // Auth / General Use
			authDomain: "https://hax-supplier-database.firebaseapp.com/",         // Auth with popup/redirect
			databaseURL: "https://hax-supplier-database.firebaseio.com", // Realtime Database
			storageBucket: "gs://hax-supplier-database.appspot.com",          // Storage
			messagingSenderId: "123456789"                  // Cloud Messaging
		});
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.$store.dispatch('autoLoginUser', user);
			}
		});
		this.$store.dispatch('loadSuppliers');
		this.$store.dispatch('loadTeamsNode');
		this.$store.dispatch('loadUsersNode');
	}
}).$mount('#app');

// new Vue({
// 	router,
// 	store,
// 	vuetify,
// 	render: h => h(App)
// }).$mount('#app');
