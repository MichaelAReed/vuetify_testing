<template>
	<v-container>
		<v-row>
			<v-col offset-md="1" cols="12" md="10">
				<v-container>
					<v-row v-if="loading">
						<v-col cols="12" class="text-center">
							<v-progress-circular indeterminate class="primary--text" :width="7" :size="70"></v-progress-circular>
						</v-col>
					</v-row>
					<v-row v-if="loggedInUser.isAdmin && !loading">
						<v-col cols="6">
							<app-dialog-add-edit-obj typeString="user"></app-dialog-add-edit-obj>
						</v-col>
					</v-row>
					<v-row v-if="!loading">
						<v-col cols="12" sm="6" v-for="user in users" :key="user ? user._id : ''">
							<v-card class="secondary" height="100%">
								<v-container>
									<v-row>
										<v-col cols="5">
											<v-img class="white--text" height="200px" :src="user ? user.imageURL : ''"></v-img>
										</v-col>
										<v-col cols="7">
											<v-card-title primary-title>
												<div>
													<h4 class="mb-0">{{ user ? user.name : ''}}</h4>
													<div>
														<v-chip pill class="mt-2" :link="true" :to="'/teams/' + (user ? user.team._id : '')">
															<v-avatar left>
																<v-img :src="user ? user.team.imageURL: ''"></v-img>
															</v-avatar>
															{{ user ? user.team.name : '' }}
														</v-chip>
													</div>
												</div>
											</v-card-title>
											<v-card-actions>
												<v-btn text outlined :to="'/users/' + (user ?user._id : '')">
													<v-icon left>mdi-arrow-right</v-icon>View Details
												</v-btn>
											</v-card-actions>
											<v-card v-if="loggedInUser.isAdmin && user.permRequests.length > 0">
												<v-card-title>Permission Requests</v-card-title>
												<v-card-text>
													<app-block-permission-request
														v-for="permissionRequest in user.permRequests"
														:key="permissionRequest._id"
														:permissionRequest="permissionRequest"
														:requestingUserID="user._id"
													></app-block-permission-request>
												</v-card-text>
											</v-card>
										</v-col>
									</v-row>
								</v-container>
							</v-card>
						</v-col>
					</v-row>
				</v-container>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	computed: {
		users() {
			return this.$store.getters.loadedUsers;
		},
		loggedInUser() {
			return this.$store.getters.user;
		},
		loading() {
			return this.$store.getters.loading;
		}
	},
	created() {
		this.$store.dispatch('loadUsers');
	}
};
</script>
