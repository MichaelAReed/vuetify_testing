<template>
	<v-container>
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
		<v-row align="center" v-if="!loading">
			<v-col cols="12" sm="10" md="8" offset-sm="1" offset-md="2">
				<v-card>
					<v-container>
						<v-row>
							<v-col cols="4">
								<v-img
									class="white--text"
									width="200px"
									:src="team.imageURL"
								>
								</v-img>
								<div>
									<v-card-text>
										<div class="info--text">
											Last Updated: {{ team.lastUpdated | date }}
										</div>
										<div class="info--text">
											Status: {{ team.status }}
										</div>
									</v-card-text>
								</div>
							</v-col>
							<v-col  cols="8">
								<v-card-title>
									<h3>{{ team.name }}</h3>
									<template v-if="userInTeam || loggedInUser.isAdmin">
										<v-spacer></v-spacer>
										teamEditor component here
									</template>
								</v-card-title>
								<p>{{ team.description }}</p>
							</v-col>
						</v-row>
						<v-row>
							<v-col align="center">
								<app-chip-user
									v-for="user in team.users"
									:user="user"
								>
								</app-chip-user>
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
			return this.loggedInUser !== null && this.loggedInUser !== undefined;
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
			if (!(this.loggedInUser.isAdmin)) {
				return false;
			}
			return true;
		}
	},
	created() {
		this.$store.dispatch('loadTeams');
	},
	methods: {
		onDeleteTeam() {
			this.$store.dispatch('deleteTeam', this.id);
		},
	}
};
</script>
