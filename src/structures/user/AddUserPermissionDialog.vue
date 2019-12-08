<template>
	<v-dialog width="400px" persistent v-model="editDialog">
		<template v-slot:activator="{ on }">
			<v-btn v-on="on">
				Add Permission
			</v-btn>
		</template>
		<v-card>
			<v-container>
				<v-row>
					<v-col cols="1">
						<v-avatar>
							<img :src="user.imageURL"></v-img>
						</v-avatar>
					</v-col>
					<v-col cols="10" offset="1">
						<v-card-title>{{ user.name }} - New Permission</v-card-title>
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
								label="Tool Type"
								id="toolType"
								v-model="toolType"
								:rules="toolTypeRules"
								chips
								required
							>
							</v-select>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12">
							<v-switch
								v-model="permittedNotBanned"
								:label="permittedNotBannedString"
							>
							</v-switch>
						</v-col>
					</v-row>
					<v-row>
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
				</v-card-text>
				<v-divider></v-divider>
				<v-row>
					<v-col cols="12">
						<v-card-actions>
							<v-btn @click="onSaveChanges">Save</v-btn>
							<v-btn @click="editDialog = false">Cancel</v-btn>
						</v-card-actions>
					</v-col>
				</v-row>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: ['user'],
	data() {
		return {
			editDialog: 		false,
			permittedNotBanned: true,
			toolType: 			'',
			hasExpiration: 		false,
			expirationDate: 	new Date().toISOString().substr(0, 10),

			toolTypesList: [],
			toolTypesListDict: {},
			toolTypeRules: [
				value => (this.toolTypesList.includes(value)) || "If you can't find the tool type, please make a new one first."
			],
		};
	},
	computed: {
		loading() {
			return this.$store.getters.loading;
		},
		toolTypeImageURL() {
			return this.$store.getters.loadedToolType(this.toolTypesListDict[this.toolType]).imageURL;
		},
		formIsValid() {
			return true;
		},
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
		onSaveChanges() {
			if (!this.formIsValid) {
				return;
			}
			this.editDialog = false;
			if (!this.hasExpiration) this.expirationDate = null;
			const permissionData = {
// 				userID:				this.user._id,
				toolType: 			this.toolTypesListDict[this.toolType],
				permittedNotBanned: this.permittedNotBanned,
				expiry: 			this.expirationDate,
// 				switchBack: 		(this.currentPermission != null)
			};
			this.$store.dispatch('addPermissionToUser', {userID: this.user._id, permissionData: permissionData});
		}
	},
	created() {
		for (let toolType of this.$store.getters.loadedToolTypes(true, true)) {
			this.toolTypesList.push(toolType['name']);
			this.toolTypesListDict[toolType['name']] = toolType._id;
			if (this.toolTypeID === toolType._id) {
				this.toolType = toolType['name'];
			}
		}
		this.toolType = this.toolTypesList[0];
	}
}
</script>
