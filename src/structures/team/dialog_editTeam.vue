<template>
	<v-dialog width="350px" persistent v-model="editDialog">
		<template v-slot:activator="{ on }">
			<v-btn fab accent v-on="on">
				<v-icon>mdi-square-edit-outline</v-icon>
			</v-btn>
		</template>
		<v-card>
			<v-container>
				<v-row>
					<v-col cols="1">
						<v-avatar>
							<img :src="team.imageURL" />
						</v-avatar>
					</v-col>
					<v-col cols="10" offset="1">
						<h2 class="primary--text">Editing Team:</h2>
						<h3>{{ team.name }}</h3>
					</v-col>
				</v-row>
				<v-divider></v-divider>
				<v-row>
					<v-col cols="10" offset="1">
						<app-block-add-edit-team-form
							:existingTeam="team"
							:adminView="loggedInUser.isAdmin"
							v-on:submit-event="confirmChanges"
							v-on:cancel-event="editDialog = false"
							v-model="teamPacket"
						></app-block-add-edit-team-form>
					</v-col>
				</v-row>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: ['team'],
	data() {
		return {
			editDialog: false,
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
			this.$store.dispatch('updateTeam', {
				objectData: this.teamPacket.teamData,
				image: this.teamPacket.image,
				objectID: this.team._id
			});
		}
	}
};
</script>
