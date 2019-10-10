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
		<v-row justify="space-around" align="center" v-if="!loading">
			<v-col cols="12" sm="10" md="8">
				<v-card>
					<v-container>
						<v-row>
							<v-col cols="6">
								<v-img
									class="white--text mb-10"
									width="200px"
									:src="user.imageURL"
								>
								</v-img>
								<v-chip	pill :link="true" :to="'/teams/' + user.team._id">
									<v-avatar left>
									<v-img :src="user.team.imageURL"></v-img>
									</v-avatar>
									{{ user.team.name }}
								</v-chip>
							</v-col>
							<v-col  cols="6">
								<v-card-title>
									<h3>{{ user.name }}</h3>
									<template v-if="userInTeam">
										<v-spacer></v-spacer>
										userEditor component here
									</template>
									<p>{{ user.introduction }}</p>
								</v-card-title>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12">
								<v-card-text>
									<div class="info--text">
										Last Updated: {{ user.lastUpdated | date }}
									</div>
									<div class="info--text">
										position: {{ user.position }}
									</div>
								</v-card-text>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn v-if="userIsAdmin" class="primary" @click="onDeleteUser">Delete User</v-btn>
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
		user() {
			return this.$store.getters.loadedUser(this.id);
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
	},
	methods: {
		onDeleteUser() {
			this.$store.dispatch('deleteUser', this.id);
		},
	}
};
</script>
