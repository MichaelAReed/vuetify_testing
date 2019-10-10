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
		<v-row v-if="userIsAdmin && !loading">
			<v-col cols="6" offset-sm="1" offset-md="2">
				<v-btn outlined router to="/users/new" class="primary">
					Add New User
				</v-btn>
			</v-col>
		</v-row>
		<template v-if="!loading">
			<v-row
				justify="space-around"
				v-for="user in users"
				:key="user._id"
				class="mb-2"
			>
				<v-col cols="12" sm="10" md="8">
					<v-card class="secondary">
						<v-container>
							<v-row>
								<v-col cols="5" sm="4" md="3">
									<v-img
										class="white--text"
										height="200px"
										:src="user.imageURL"
									>
									</v-img>
								</v-col>
								<v-col cols="7" sm="8" md="9">
									<v-card-title primary-title>
										<div>
											<h3 class="mb-0">
												{{ user.name }}
											</h3>
											<div>
												<v-chip	pill class="mt-2" :link="true" :to="'/teams/' + user.team._id">
													<v-avatar left>
													<v-img :src="user.team.imageURL"></v-img>
													</v-avatar>
													{{ user.team.name }}
												</v-chip>
											</div>
										</div>
									</v-card-title>
									<v-card-actions>
										<v-btn
											text
											outlined
											:to="'/users/' + user._id"
										>
											<v-icon left>mdi-arrow-right</v-icon>
											View Details
										</v-btn>
									</v-card-actions>
								</v-col>
							</v-row>
						</v-container>
					</v-card>
				</v-col>
			</v-row>
		</template>
	</v-container>
</template>

<script>
export default {
	computed: {
		users() {
			return this.$store.getters.loadedUsers;
		},
		userIsAuthenticated() {
			return this.$store.getters.user !== null && this.$store.getters.user !== undefined;
		},
		userIsAdmin() {
			if (!this.userIsAuthenticated) {
				return false;
			}
			return true;
		},
		loading() {
			return this.$store.getters.loading;
		},
		error() {
			return this.$store.getters.error;
		}
	}
};
</script>
