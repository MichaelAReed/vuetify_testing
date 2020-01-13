<template>
	<v-chip
		pill
		class="mt-2 mr-2 ml-2"
		:link="true"
		:to="'/toolTypes/' + permissionOrBan.toolType._id"
		:color="permissionNotBan? '' : 'error'"
	>
		<v-avatar left>
			<v-img :src="permissionOrBan.toolType.imageURL"></v-img>
		</v-avatar>
		{{ permissionOrBan.toolType.name }}
		{{ permissionOrBan.expiry ? " | exp: " : "" }}
		{{ permissionOrBan.expiry | dateNoTime }}
		<v-btn
			v-if="loggedInUser.isAdmin && deletable"
			@click="deletePermission"
			icon
		>
			<v-icon>mdi-delete-forever</v-icon>
		</v-btn>
	</v-chip>
</template>

<script>
export default {
	props: ['permissionOrBan', 'permissionNotBan', 'userID', 'deletable'],
	computed: {
		toolType() {
			return this.$store.getters.loadedToolType(this.permissionOrBan.toolType._id);
		},
		loggedInUser() {
			return this.$store.getters.user;
		}
	},
	methods: {
		deletePermission() {
			this.$store.dispatch('deletePermission', {userID: this.userID, permissionData: {permissionOrBanID: this.permissionOrBan._id}});
		}
	}
}
</script>
