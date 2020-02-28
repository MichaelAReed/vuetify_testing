<template>
	<v-container>
		<v-row v-if="loading">
			<v-col cols="12" class="text-center">
				<v-progress-circular indeterminate class="primary--text" :width="7" :size="70"></v-progress-circular>
			</v-col>
		</v-row>
		<v-row align="center" v-if="!loading">
			<v-col cols="12" sm="10" md="8" offset-sm="1" offset-md="2">
				<v-card>
					<v-container>
						<v-row>
							<v-col cols="4">
								<v-img class="white--text" width="200px" height="200px" :src="team.imageURL"></v-img>
								<br />
								<app-chip-team :team="team" :showCredits="true"></app-chip-team>
							</v-col>
							<v-col cols="8">
								<v-card-title>
									<h3>{{ team.name }}</h3>
									<template v-if="userInTeam || loggedInUser.isAdmin">
										<v-spacer></v-spacer>
										<app-dialog-add-edit-obj :currentObj="team" typeString="team"></app-dialog-add-edit-obj>
									</template>
								</v-card-title>
								<p>{{ team.description }}</p>
								<v-card-text>
									<v-container>
										<v-row class="mt-n6 mb-n6">
											<v-col cols="5" class="info--text">Available Credits:</v-col>
											<v-col cols="7">{{ team.credits }}</v-col>
										</v-row>
										<v-row class="mt-n6 mb-n6">
											<v-col cols="5" class="info--text">Website:</v-col>
											<v-col cols="7">
												<a :href="team.url">{{team.name}} Link</a>
											</v-col>
										</v-row>
										<v-row class="mt-n6 mb-n6">
											<v-col cols="5" class="info--text">Last Updated:</v-col>
											<v-col cols="7">{{ team.lastUpdated | date }}</v-col>
										</v-row>
										<v-row class="mt-n6 mb-n6">
											<v-col cols="5" class="info--text">Status:</v-col>
											<v-col cols="7">{{ team.status }}</v-col>
										</v-row>
									</v-container>
								</v-card-text>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12">
								<h5>Team Members:</h5>
								<app-chip-user v-for="user in team.users" :user="user" :key="user._id"></app-chip-user>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn v-if="userIsAdmin" class="primary" :to="'/users/new/' + team._id">Add a Team Member</v-btn>
									<v-btn v-if="userIsAdmin" class="primary" @click="onDeleteTeam">Delete Team</v-btn>
								</v-card-actions>
							</v-col>
						</v-row>
					</v-container>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	props: ['id'],
	computed: {
		team() {
			return this.$store.getters.loadedTeam(this.id);
		},
		loading() {
			return this.$store.getters.loading;
		},
		loggedInUser() {
			return this.$store.getters.user;
		},
		userIsAuthenticated() {
			return (
				this.loggedInUser !== null && this.loggedInUser !== undefined
			);
		},
		userInTeam() {
			if (!this.userIsAuthenticated) {
				return false;
			}
			if (this.loggedInUser.team != this.id) {
				return false;
			}
			return true;
		},
		userIsAdmin() {
			if (!this.userIsAuthenticated) {
				return false;
			}
			if (!this.loggedInUser.isAdmin) {
				return false;
			}
			return true;
		}
	},
	created() {
		this.$store.dispatch('teamsLoad');
	},
	methods: {
		onDeleteTeam() {
			this.$store.dispatch('deleteTeam', this.id);
		}
	}
};
</script>
