<template>
	<v-dialog width="400px" persistent v-model="editDialog">
		<template v-slot:activator="{ on }">
			<v-btn v-on="on" class="info">
				{{ adminView ? "Add Permission" : "Request Permission" }}
			</v-btn>
		</template>
		<v-card>
			<form ref="requestPermissionForm" @submit.prevent="approveRequest">
				<v-container>
					<v-row>
						<v-col cols="1">
							<v-avatar>
								<img :src="user.imageURL"></v-img>
							</v-avatar>
						</v-col>
						<v-col cols="10" offset="1">
							<v-card-title>{{ toolTypeInput ? toolTypeInput.name : "" }} {{ adminView ? "Add Permission" : "Permission Request" }}</v-card-title>
						</v-col>
					</v-row>
					<v-row v-if="loading">
						<v-col cols="12" class="text-center">
							<v-progress-circular
								indeterminate
								class="primary--text"
								:width="7"
								:size="70"
							>
							</v-progress-circular>
						</v-col>
					</v-row>
					<v-divider></v-divider>
					<v-card-text>
						<v-row>
							<v-col cols="1">
								<v-avatar>
									<img :src="toolTypeImageURL"></v-img>
								</v-avatar>
							</v-col>
							<v-col cols="10" offset="1">
								<v-select
									name="ToolType"
									:items="toolTypesList"
									label="Tool Type/Category"
									id="toolType"
									v-model="toolType"
									:rules="toolTypeRules"
									chips
									required
								>
								</v-select>
							</v-col>
						</v-row>
						<v-row v-if="adminView">
							<v-col cols="12">
								<v-switch
									v-model="permittedNotBanned"
									:label="permittedNotBannedString"
								>
								</v-switch>
							</v-col>
						</v-row>
						<v-row v-if="adminView">
							<v-col cols="12">
								<v-switch
									v-model="hasExpiration"
									label="Set Expiry Date"
								>
								</v-switch>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12">
								<v-date-picker
									v-if="hasExpiration"
									v-model="expirationDate"
									format="24hr"
								></v-date-picker>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12">
								<v-text-field
									name="permissionExplanation"
									label="Permission Explanation"
									id="permission-explanation"
									v-model="permissionExplanation"
									:rules="stdRules"
									required
								>
								</v-text-field>
							</v-col>
						</v-row>
					</v-card-text>
					<v-divider></v-divider>
					<v-row>
						<v-col cols="12">
							<v-card-actions>
								<v-btn @click="onSaveChanges"> {{ adminView ? "Save" : "Request" }}</v-btn>
								<v-btn @click="editDialog = false">Cancel</v-btn>
							</v-card-actions>
						</v-col>
					</v-row>
				</v-container>
			</form>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: ['user', 'adminView', 'toolTypeInputID'],
	data() {
		return {
			editDialog: 		false,
			permittedNotBanned: true,
			toolType: 			'',
			hasExpiration: 		false,
			expirationDate: 	new Date().toISOString().substr(0, 10),
			permissionExplanation: 	'',

			stdRules: [
				value => !!value || 'Cannot be blank.'
			],

			toolTypesList: [],
			toolTypesListDict: {},
			toolTypeRules: [
				value => (this.toolTypesList.includes(value)) || "If you can't find the tool type, please make a new one first."
			],
		};
	},
// 	watch: {
// 		toolType: 				'checkFormValidity',
// 		permittedNotBanned: 	'checkFormValidity',
// 		hasExpiration:			'checkFormValidity',
// 		expirationDate:			'checkFormValidity',
// 		permissionExplanation:	'checkFormValidity'
// 	},
	computed: {
		loading() {
			return this.$store.getters.loading;
		},
		toolTypeImageURL() {
			return this.$store.getters.loadedToolType(this.toolTypesListDict[this.toolType]).imageURL;
		},
		toolTypeInput() {
			if (this.toolTypeInputID) return this.$store.getters.loadedToolType(this.toolTypeInputID);
			return null;

		},
// 		formIsValid() {
// 			console.log("computing form is valid.");
// // 			return true;
// 			if (this.$refs.requestPermissionForm && this.$refs.requestPermissionForm.checkValidity) {
// 				console.log(this.$refs.requestPermissionForm.checkValidity());
// 				return this.$refs.requestPermissionForm.checkValidity();
// 			}
// 			console.log("they don't now?");
// 			return false;
// 		},
		permittedNotBannedString() {
			if (this.permittedNotBanned) return "Add Permission";
			return "Add Ban."
		},
// 		currentPermission() {
// 			let permission = this.user.permissions.find((permission) => {permission.toolType._id == this.toolType})
// 			if (permission) {
// 				return permission.permittedNotBanned;
// 			} else {
// 				return null;
// 			}
// 		}
	},
	methods: {
		checkFormValidity() {
// 			return true;
			if (this.$refs.requestPermissionForm && this.$refs.requestPermissionForm.checkValidity) {
				return this.$refs.requestPermissionForm.checkValidity();
			}
			return false;
		},
		onSaveChanges() {
			if (!this.checkFormValidity()) {
				return;
			}
			this.editDialog = false;
			if (!this.hasExpiration) this.expirationDate = null;
			const permissionData = {
				toolType: 			this.toolTypesListDict[this.toolType],
				permittedNotBanned: this.permittedNotBanned,
				expiry: 			this.expirationDate,
				explanation: 		this.permissionExplanation
			};

			if (this.adminView) {
				this.$store.dispatch('addPermissionToUser', {userID: this.user._id, permissionData: permissionData});
			} else {
				this.$store.dispatch('requestPermission', {userID: this.user._id, permissionData: permissionData});
			}
		}
	},
	created() {
		if (this.toolTypeInput) {
			let currentToolType = this.toolTypeInput;
			while (currentToolType.parent._id !== currentToolType._id) {
				if (!currentToolType.userHasPermission && !currentToolType.userHasRequestedPermission) {
					this.toolTypesList.push(currentToolType['name']);
					this.toolTypesListDict[currentToolType['name']] = currentToolType._id;
				}
				currentToolType = this.$store.getters.loadedToolType(currentToolType.parent._id);
			}
			this.toolType = this.toolTypesList[0];
		} else {
			for (let toolType of this.$store.getters.loadedToolTypes(true, true)) {
				if (!toolType.userHasPermission && !toolType.userHasRequestedPermission) {
					this.toolTypesList.push(toolType['name']);
					this.toolTypesListDict[toolType['name']] = toolType._id;
				}
	// 			if (this.toolTypeID === toolType._id) {
	// 				console.log("here");
	// 				this.toolType = toolType['name'];
	// 			}
			}
			if (!this.toolType) this.toolType = this.toolTypesList[0];
		}
	}
}
</script>
