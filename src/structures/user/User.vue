<template>
	<v-container>
		<v-row v-if="loading">
			<v-col cols="12" class="text-center">
				<v-progress-circular indeterminate class="primary--text" :width="7" :size="70"></v-progress-circular>
			</v-col>
		</v-row>
		<v-row justify="space-around" align="center" v-if="!loading">
			<v-col cols="12" sm="10" md="8">
				<v-card>
					<v-container>
						<v-row>
							<v-col cols="4">
								<v-img class="white--text mb-10" width="200px" height="200px" :src="user.imageURL"></v-img>
								<app-chip-team :team="user.team" class="mb-2"></app-chip-team>
								<br />
								<app-chip-team :team="user.team" :showCredits="true"></app-chip-team>
							</v-col>
							<v-col cols="8">
								<v-card-title>
									<h3>{{ user.name }}</h3>
									<template v-if="loggedInUser._id === id || loggedInUser.isAdmin">
										<v-spacer></v-spacer>
										<app-dialog-add-edit-obj :currentObj="user" typeString="user"></app-dialog-add-edit-obj>
									</template>
								</v-card-title>
								<v-card-text>
									<p>{{ user.introduction }}</p>
									<v-container>
										<v-row class="mt-n6 mb-n6">
											<v-col cols="5" class="info--text">Last Updated:</v-col>
											<v-col cols="7">{{ user.lastUpdated | date }}</v-col>
										</v-row>
										<v-row class="mt-n6 mb-n6">
											<v-col cols="5" class="info--text">Position:</v-col>
											<v-col cols="7">{{ user.position }}</v-col>
										</v-row>
										<v-row class="mt-n6 mb-n6">
											<v-col cols="5" class="info--text">Email:</v-col>
											<v-col cols="7">{{ user.email }}</v-col>
										</v-row>
										<v-row class="mt-n6 mb-n6">
											<v-col cols="5" class="info--text">Wechat:</v-col>
											<v-col cols="7">{{ user.wechat }}</v-col>
										</v-row>
										<v-row class="mt-n6 mb-n6">
											<v-col cols="5" class="info--text">Phone #:</v-col>
											<v-col cols="7">{{ user.phoneNum }}</v-col>
										</v-row>
										<v-row class="mt-n6 mb-n6">
											<v-col cols="5" class="info--text">Lang:</v-col>
											<v-col cols="7">{{ user.lang }}</v-col>
										</v-row>
									</v-container>
								</v-card-text>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12">
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn v-if="loggedInUser.isAdmin" class="error" @click="onDeleteUser">Delete User</v-btn>
								</v-card-actions>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12">
								<v-card>
									<v-card-title>Checked Out Tools</v-card-title>
									<v-card-text>
										Total value: {{ totalToolsValue }}
										<br />
										<app-chip-toolStatus
											v-for="tool in checkedOutTools"
											:key="tool._id"
											:displayName="true"
											:tool="tool"
										></app-chip-toolStatus>
									</v-card-text>
								</v-card>
								<v-card>
									<v-card-title>Bans</v-card-title>
									<v-card-text>
										<app-chip-permissionOrBan
											v-for="ban in user.bans"
											:key="ban._id"
											:permissionOrBan="ban"
											:permissionNotBan="false"
											:userID="user._id"
											:deletable="true"
										></app-chip-permissionOrBan>
									</v-card-text>
								</v-card>
								<v-card>
									<v-card-title>Permissions</v-card-title>
									<v-card-text>
										<app-chip-permissionOrBan
											v-for="permission in user.permissions"
											:key="permission._id"
											:permissionOrBan="permission"
											:permissionNotBan="true"
											:userID="user._id"
											:deletable="true"
										></app-chip-permissionOrBan>
									</v-card-text>
								</v-card>
								<v-card>
									<v-card-title>Permission Requests</v-card-title>
									<v-card-text>
										<app-block-permission-request
											v-for="permissionRequest in user.permRequests"
											:key="permissionRequest._id"
											:permissionRequest="permissionRequest"
											:requestingUserID="user._id"
										></app-block-permission-request>
									</v-card-text>
									<v-card-actions>
										<app-add-user-permission-dialog
											v-if="(loggedInUser._id === id) || loggedInUser.isAdmin"
											:adminView="loggedInUser.isAdmin"
											:user="user"
										></app-add-user-permission-dialog>
									</v-card-actions>
								</v-card>
								<v-card>
									<v-card-title>Bookings</v-card-title>
									<v-card-text>
										<app-tool-booking-calendar :inputBookings="bookings"></app-tool-booking-calendar>
									</v-card-text>
								</v-card>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12">
								<app-block-records-list :records="records"></app-block-records-list>
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
		loggedInUser() {
			return this.$store.getters.user;
		},
		checkedOutTools() {
			return this.$store.getters.loadedToolsCheckedByUser(this.id);
		},
		totalToolsValue() {
			let sum = 0;
			for (let i = 0; i < this.checkedOutTools.length; i++) {
				sum += this.checkedOutTools[i].toolType.cost;
			}
			return sum;
		},
		bookings() {
			return this.$store.getters.loadedBookingsOfUser(this.id);
		},
		records() {
			return this.$store.getters.loadedRecordsOfUser(this.id);
		}
	},
	created() {
		this.$store.dispatch('loadToolTypes');
		this.$store.dispatch('loadTools');
		this.$store.dispatch('teamsLoad');
		this.$store.dispatch('loadUsers');
	},
	methods: {
		onDeleteUser() {
			this.$store.dispatch('deleteUser', this.id);
		}
	}
};
</script>
