import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';
import vuetify from './plugins/vuetify';


// GENERAL USE COMPONENTS
import block_recordsList from './components/block_recordsList';
import dateFilter from './filters/date';
import dateNoTimeFilter from './filters/dateNoTime';
import alertCmp from './components/Alert';
import block_addEditObjForm from './components/block_addEditObjForm';
import dialog_addEditObj from './components/dialog_addEditObj';

// SUPPLIER ELEMENTS
import editSupplierDetailsDialog from './structures/supplier/editSupplierDetailsDialog';
import editSupplierDateDialog from './structures/supplier/editSupplierDateDialog';
import editSupplierTimeDialog from './structures/supplier/editSupplierTimeDialog';

// USER ELEMENTS
import dialog_editUser from './structures/user/dialog_editUser';
import chip_user from './structures/user/chip_user';
import chip_permissionOrBan from './structures/user/chip_permissionOrBan';
import addUserPermissionDialog from './structures/user/AddUserPermissionDialog';
import block_permissionRequest from './structures/user/block_permissionRequest';
import block_addEditUserForm from './structures/user/block_addEditUserForm';

// TEAM ELEMENTS
import dialog_editTeam from './structures/team/dialog_editTeam';
import block_addEditTeamForm from './structures/team/block_addEditTeamForm';
import chip_team from './structures/team/chip_team';
import select_team from './structures/team/select_team';


// TOOLTYPE ELEMENTS
import chip_toolType from './structures/toolType/chip_toolType';
import chip_toolTypePermission from './structures/toolType/chip_toolTypePermission';
import chip_hazard from './structures/toolType/chip_hazard';
import select_toolType from './structures/toolType/select_toolType';
import block_addEditToolTypeForm from './structures/toolType/block_addEditToolTypeForm';

// TOOL ELEMENTS
import chip_toolStatus from './structures/tool/chip_toolStatus';
import chip_toolCheckedStatus from './structures/tool/chip_toolCheckedStatus';
import select_tool from './structures/tool/select_tool';
import toolBookingCalendar from './structures/tool/toolBookingCalendar';
import dialog_addTool from './structures/tool/dialog_addTool';

// CHECKOUTDEVICE ELEMENTS
import block_toolReceptacleInfo from './structures/checkoutDevice/block_receptacleInfo';
import block_locationImg from './structures/checkoutDevice/block_locationImg';
import dialog_assignToolToReceptacle from './structures/checkoutDevice/dialog_assignToolToReceptacle';
import dialog_addToolReceptacle from './structures/checkoutDevice/dialog_addToolReceptacle';


// TODO: need to make the backend hostname controlled by an environment variable or something similar.
// const {
// 	NODE_ENV 		= 'production',
// } = process.env
//
// const IN_PROD 			= (NODE_ENV === 'production');
// Vue.prototype.$backendHostname = IN_PROD?'http://localhost:1234':'http://localhost:1234';

// Vue.use(vuetify);
Vue.config.productionTip = false;

// GENERAL USE COMPONENTS
Vue.filter('date', dateFilter);
Vue.filter('dateNoTime', dateNoTimeFilter);
Vue.component('app-alert', alertCmp);
Vue.component('app-block-records-list', block_recordsList);
Vue.component('app-block-add-edit-obj-form', block_addEditObjForm);
Vue.component('app-dialog-add-edit-obj', dialog_addEditObj);

// SUPPLIER ELEMENTS
Vue.component('app-edit-supplier-details-dialog', editSupplierDetailsDialog);
Vue.component('app-edit-supplier-date-dialog', editSupplierDateDialog);
Vue.component('app-edit-supplier-time-dialog', editSupplierTimeDialog);

// USER ELEMENTS
Vue.component('app-edit-user-dialog', dialog_editUser);
Vue.component('app-add-user-permission-dialog', addUserPermissionDialog);
Vue.component('app-chip-user', chip_user);
Vue.component('app-chip-permissionOrBan', chip_permissionOrBan);
Vue.component('app-block-permission-request', block_permissionRequest);
Vue.component('app-block-add-edit-user-form', block_addEditUserForm);

// TEAM ELEMENTS
Vue.component('app-edit-team-dialog', dialog_editTeam);
Vue.component('app-block-add-edit-team-form', block_addEditTeamForm);
Vue.component('app-chip-team', chip_team);
Vue.component('select-team', select_team);

// TOOLTYPE ELEMENTS
Vue.component('app-chip-toolType', chip_toolType);
Vue.component('app-chip-toolTypePermission', chip_toolTypePermission);
Vue.component('app-chip-hazard', chip_hazard);
Vue.component('select-tool-type', select_toolType);
Vue.component('app-block-add-edit-tool-type-form', block_addEditToolTypeForm);

// TOOL ELEMENTS
Vue.component('app-chip-toolStatus', chip_toolStatus);
Vue.component('app-chip-toolCheckedStatus', chip_toolCheckedStatus);
Vue.component('app-tool-booking-calendar', toolBookingCalendar);
Vue.component('app-add-tool-dialog', dialog_addTool);
Vue.component('select-tool', select_tool);

// CHECKOUTDEVICE ELEMENTS
Vue.component('app-add-checkout-device-receptacle-dialog', dialog_addToolReceptacle);
Vue.component('app-tool-receptacle-info', block_toolReceptacleInfo);
Vue.component('app-dialog-assign-tool', dialog_assignToolToReceptacle);
Vue.component('app-location-img', block_locationImg);



// Vue.component('app-add-booking-dialog', addBookingDialog);


new Vue({
	router,
	vuetify,
	store,
	render: h => h(App),
	created() {
		this.$store.dispatch('authorize');
	}
}).$mount('#app');
