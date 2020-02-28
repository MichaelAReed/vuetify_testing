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
							<app-dialog-add-edit-obj typeString="typeString"></app-dialog-add-edit-obj>
						</v-col>
					</v-row>
					<v-row v-if="!loading">
						<v-col cols="12" sm="6" v-for="object in objects" :key="object._id">
							<v-card class="secondary" height="100%">
								<v-container>
									<v-row>
										<v-col cols="5">
											<v-img class="white--text" height="200px" :src="team.imageURL"></v-img>
										</v-col>
										<v-col cols="7">
											<v-card-title primary-title>
												<div>
													<h4 class="mb-0">{{ team.name }}</h4>
												</div>
											</v-card-title>
											<v-card-text>
												<div>{{ team.description }}</div>
												<div>
													<app-chip-user v-for="user in team.users" :user="user" :key="user._id"></app-chip-user>
												</div>
											</v-card-text>
											<v-card-actions>
												<v-btn text outlined :to="'/teams/' + team._id">
													<v-icon left>mdi-arrow-right</v-icon>View Details
												</v-btn>
											</v-card-actions>
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
	props: ['typeString'],
	data() {
		return {
			dialogShown: false,
			objPacket: 'tits'
		};
	},
	computed: {
		objects() {
			if (this.typeString === 'team')
				return this.$store.getters.loadedTeams;
			if (this.typeString === 'user')
				return this.$store.getters.loadedUsers;
			if (this.typeString === 'toolType')
				return this.$store.getters.loadedToolTypes;
		},
		loggedInUser() {
			return this.$store.getters.user;
		},
		loading() {
			return this.$store.getters.loading;
		}
	},
	created() {
		this.$store.dispatch('teamsLoad');
	}
};
</script>
