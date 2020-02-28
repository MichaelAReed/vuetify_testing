<template>
	<form ref="approvePermissionForm" @submit.prevent="approveRequest">
		<app-chip-permissionOrBan
			:permissionOrBan="permissionRequest"
			:permissionNotBan="true"
			:userID="requestingUserID"
			:deletable="false"
		></app-chip-permissionOrBan>
		Submitted: {{ permissionRequest.created | date }}
		<v-text-field
			v-if="loggedInUser.isAdmin"
			label="Explanation"
			id="perm-explanation"
			v-model="permExplanation"
			:rules="stdRules"
			required
		></v-text-field>
		<v-btn class="mb-2 mt-2 ml-2" v-if="loggedInUser.isAdmin" @click="approveRequest">Approve Request</v-btn>
		<v-btn
			class="error mb-2 mt-2 ml-2"
			v-if="loggedInUser.isAdmin"
			@click="deleteRequest"
		>Delete Request</v-btn>
	</form>
</template>

<script>
export default {
	props: ['permissionRequest', 'requestingUserID'],
	data() {
		return {
			permExplanation: this.permissionRequest.explanation,
			stdRules: [value => !!value || 'Cannot be blank.']
		};
	},
	computed: {
		toolType() {
			return this.$store.getters.loadedToolType(this.toolTypeID);
		},
		loggedInUser() {
			return this.$store.getters.user;
		},
		formIsValid() {
			if (
				this.$refs.approvePermissionForm &&
				this.$refs.approvePermissionForm.checkValidity
			) {
				return this.$refs.approvePermissionForm.checkValidity();
			}
			return false;
		}
	},
	methods: {
		approveRequest() {
			if (!this.formIsValid) {
				return;
			}
			console.log(`tooltypeID: ${this.permissionRequest.toolType}`);
			console.log(`userID: ${this.permissionRequest.toolType}`);
			if (!this.hasExpiration) this.expirationDate = null;
			const permissionData = {
				toolType: this.permissionRequest.toolType._id,
				permittedNotBanned: true,
				//expiry: 			this.expirationDate,
				explanation: this.permExplanation
			};
			this.$store.dispatch('addPermissionToUser', {
				userID: this.requestingUserID,
				permissionData: permissionData
			});
			// 			this.$store.dispatch('deletePermissionRequest', {userID: this.requestingUserID, permissionData: {toolTypeID: this.permissionRequest.toolType._id}});
		},
		deleteRequest() {
			this.$store.dispatch('deletePermissionRequest', {
				userID: this.requestingUserID,
				permissionData: {
					toolTypeID: this.permissionRequest.toolType._id
				}
			});
		}
	}
};
</script>
