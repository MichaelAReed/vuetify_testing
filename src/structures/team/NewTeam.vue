<template>
	<v-container>
		<v-row>
			<v-col cols="12" sm="6" offset-sm="3">
				<h2 class="primary--text">Add a New Team</h2>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" sm="6" offset-sm="3">
				<app-block-add-edit-team-form
					:adminView="loggedInUser.isAdmin"
					v-on:submit-event="confirmChanges"
					v-on:cancel-event="cancel"
					v-model="teamPacket"
				></app-block-add-edit-team-form>
			</v-col>
		</v-row>
	</v-container>
</template>


<script>
export default {
	props: ['user'],
	data() {
		return {
			teamPacket: null
		};
	},
	computed: {
		loading() {
			return this.$store.getters.loading;
		},
		loggedInUser() {
			return this.$store.getters.user;
		}
	},
	methods: {
		confirmChanges() {
			this.$store.dispatch('createTeam', {
				teamData: this.teamPacket.teamData,
				image: this.teamPacket.image,
				redirect: true
			});
		},
		cancel() {
			router.push({ name: 'home' });
		}
	}
};
</script>