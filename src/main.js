import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';
import vuetify from './plugins/vuetify';
import dateFilter from './filters/date';
import dateNoTimeFilter from './filters/dateNoTime';
import alertCmp from './components/Alert';
import addUserPermissionDialog from './structures/user/AddUserPermissionDialog';
import addToolDialog from './structures/tool/AddToolDialog';
import addBookingDialog from './structures/tool/AddBookingDialog';
import editSupplierDetailsDialog from './components/editSupplierDetailsDialog';
import editSupplierDateDialog from './components/editSupplierDateDialog';
import editSupplierTimeDialog from './components/editSupplierTimeDialog';
import editUserDialog from './components/editUserDetailsDialog';

import toolBookingCalendar from './structures/tool/toolBookingCalendar';

import chip_user from './components/chip_user';
import chip_team from './components/chip_team';
import chip_toolType from './components/chip_toolType';
import chip_toolTypePermission from './components/chip_toolTypePermission';
import chip_toolStatus from './components/chip_toolStatus';
import chip_toolCheckedStatus from './components/chip_toolCheckedStatus';
import chip_permissionOrBan from './components/chip_permissionOrBan';
import block_permissionRequest from './structures/user/permissionRequestBlock';

// TODO: need to make the backend hostname controlled by an environment variable or something similar.
// const {
// 	NODE_ENV 		= 'production',
// } = process.env
//
// const IN_PROD 			= (NODE_ENV === 'production');
// Vue.prototype.$backendHostname = IN_PROD?'http://localhost:1234':'http://localhost:1234';

// Vue.use(vuetify);
Vue.config.productionTip = false;
Vue.filter('date', dateFilter);
Vue.filter('dateNoTime', dateNoTimeFilter);
Vue.component('app-alert', alertCmp);
Vue.component('app-add-user-permission-dialog', addUserPermissionDialog);
Vue.component('app-add-tool-dialog', addToolDialog);
Vue.component('app-add-booking-dialog', addBookingDialog);

Vue.component('app-edit-supplier-details-dialog', editSupplierDetailsDialog);
Vue.component('app-edit-supplier-date-dialog', editSupplierDateDialog);
Vue.component('app-edit-supplier-time-dialog', editSupplierTimeDialog);
Vue.component('app-edit-user-dialog', editUserDialog);

Vue.component('app-tool-booking-calendar', toolBookingCalendar);

Vue.component('app-chip-user', chip_user);
Vue.component('app-chip-team', chip_team);
Vue.component('app-chip-toolType', chip_toolType);
Vue.component('app-chip-toolTypePermission', chip_toolTypePermission);
Vue.component('app-chip-toolStatus', chip_toolStatus);
Vue.component('app-chip-toolCheckedStatus', chip_toolCheckedStatus);
Vue.component('app-chip-permissionOrBan', chip_permissionOrBan);
Vue.component('app-block-permission-request', block_permissionRequest);

new Vue({
	router,
	vuetify,
	store,
	render: h => h(App),
	created() {
		this.$store.dispatch('authorize');
	}
}).$mount('#app');
