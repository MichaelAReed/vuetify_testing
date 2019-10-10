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
							<v-col cols="5">
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
							<v-col  cols="7">
								<v-card-title>
									<h3>{{ team.name }}</h3>
									<template v-if="userInTeam">
										<v-spacer></v-spacer>
										teamEditor component here
									</template>
									<p>{{ team.description }}</p>
								</v-card-title>
							</v-col>
						</v-row>
						<v-row>
							<v-col align="center">
								<v-chip	pill  v-for="user in team.users" class="mt-2 mr-2 ml-2" :link="true" :to="'/users/' + user._id">
									<v-avatar left>
									<v-img :src="user.imageURL"></v-img>
									</v-avatar>
									{{ user.name }}
								</v-chip>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn v-if="userIsAdmin" class="primary" :to="'/users/new/' + team._id">Add a Team Member</v-btn>
									<v-btn v-if="userIsAdmin" class="primary">Delete Team</v-btn>
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
		userIsAuthenticated() {
			return this.$store.getters.user !== null && this.$store.getters.user !== undefined;
		},
		userInTeam() {
			if (!this.userIsAuthenticated) {
				return false;
			}
			return true;
		},
		userIsAdmin() {
			if (!this.userIsAuthenticated) {
				return false;
			}
			return true;
		}
	}
};
</script>
