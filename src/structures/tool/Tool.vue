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
							<v-col cols="4">
								<v-img
									class="white--text mb-10"
									width="200px"
									:src="tool.toolType.imageURL"
								>
								</v-img>
							</v-col>
							<v-col  cols="8">
								<v-card-title>
									<h3>{{ tool.toolType.name + ' #' + tool.nameNum }}</h3>
									<v-spacer></v-spacer>
									<template v-if="loggedInUser.isAdmin">
										<v-spacer></v-spacer>
										toolEditor component here
									</template>
								</v-card-title>
								<p>{{ tool.toolType.description }}</p>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="4">
								<app-chip-toolStatus
									:displayName=false
									:tool="tool"
								>
								</app-chip-toolStatus>

								<app-chip-toolTypePermission
									:toolTypeID="tool.toolType._id"
								>
								</app-chip-toolTypePermission>

								<app-chip-toolCheckedStatus
									:tool="tool"
								>
								</app-chip-toolCheckedStatus>

								<app-chip-toolType
									:toolType="tool.toolType"
								>
								</app-chip-toolType>
							</v-col>
							<v-col cols="8">
								<v-card-text>
									<div class="info--text">
										<div>
											Last Checked Out: {{ tool.lastCheckedOut | date }}
										</div>
										<div>
											Last Maintained: {{ tool.lastMaintained | date }}
										</div>
									</div>
								</v-card-text>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn v-if="loggedInUser.isAdmin" class="primary" @click="onDeleteTool">Delete Tool</v-btn>
									<app-add-user-permission-dialog
										v-if="!toolType.userHasPermission && !toolType.userHasRequestedPermission"
										:adminView="false" :user="loggedInUser"
										:toolTypeInputID="tool.toolType._id"
									>
									</app-add-user-permission-dialog>
									<v-btn class="primary"
										@click="attemptCheckout"
										v-if="toolType.userHasPermission"
									>
										{{ tool.checkedOutBy ? (loggedInUser._id === tool.checkedOutBy._id ? "Return Tool" : "Request Return") : "Checkout Tool" }}
									</v-btn>
								</v-card-actions>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12">
								<v-card>
									<v-card-title>
										Bookings
									</v-card-title>
									<v-card-text>
										<app-tool-booking-calendar
											:inputBookings="bookings"
											:toolID="tool._id"
										>
										</app-tool-booking-calendar>
									</v-card-text>
								</v-card>
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
	data() {
		return {
		};
	},
	computed: {
		tool() {
			return this.$store.getters.loadedTool(this.id);
		},
		// NOTE: almost all of this information is already stored in the tool type EXCEPT the toolType.userHasPermission value which is why I retrieve all the information again here.
		toolType() {
			return this.$store.getters.loadedToolType(this.tool.toolType._id);
		},
		loading() {
			return this.$store.getters.loading;
		},
		loggedInUser() {
			return this.$store.getters.user;
		},
		bookings() {
			return this.$store.getters.loadedBookingsOfTool(this.id);
		},
	},
	methods: {
		attemptCheckout() {
			if (this.tool.checkedOutBy) {
				if (this.loggedInUser._id === this.tool.checkedOutBy._id) {
					return this.$store.dispatch('checkoutTool', {objectID: this.id, checkoutNotReturn: false});
				}
				// Request for return goes here
				return;
			}
			return this.$store.dispatch('checkoutTool', {objectID: this.id, checkoutNotReturn: true});
		},
		onDeleteTool() {
			this.$store.dispatch('deleteTool', this.id);
		}
	},
	created() {
		this.$store.dispatch('loadBookings');
	}
};
</script>