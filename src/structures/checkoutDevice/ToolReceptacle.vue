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
									height="200px"
									:src="checkoutDevice.imageURL"
								>
								</v-img>

							</v-col>
							<v-col  cols="8">
								<v-card-title>
									<h3>{{ checkoutDevice.name }}</h3>
								</v-card-title>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12">
								<v-card>
									<v-card-title>
										Office Location
									</v-card-title>
									<v-card-text>

										<app-location-img
											:useOfficeMap="true"
											v-model="checkoutDevice.mapLocation"
											:selectable="true"
											style="width: 400px; height: 200px;"
											:radius="10"
										>
										</app-location-img>
									</v-card-text>
								</v-card>
							</v-col>
						</v-row>

						<v-row>
							<v-col cols="12">
								<app-tool-receptacle-info
									:toolReceptacle="toolReceptacle"
									:checkoutDevice="checkoutDevice"
									:showDetails="true"
								>
								</app-tool-receptacle-info>
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
	props: ['checkoutDeviceID', 'toolReceptacleID'],
	computed: {
		checkoutDevice() {
			return this.$store.getters.loadedCheckoutDevice(this.checkoutDeviceID);
		},
		toolReceptacle() {
			return this.$store.getters.loadedCheckoutDevice(this.toolReceptacleID);
		},
		loading() {
			return this.$store.getters.loading;
		},
		loggedInUser() {
			return this.$store.getters.user;
		},
	},
	methods: {
	},
	created() {
		this.$store.dispatch('loadToolTypes');
		this.$store.dispatch('loadTools');
		this.$store.dispatch('loadTeams');
		this.$store.dispatch('loadUsers');
		this.$store.dispatch('loadCheckoutDevices');

		console.log(this.checkoutDeviceID);
		console.log(this.toolReceptacleID);
		console.log(this.checkoutDevice);
	},
	mounted() {
// 		this.$store.dispatch('loadToolTypes');
// 		this.$store.dispatch('loadTools');
// 		this.$store.dispatch('loadTeams');
// 		this.$store.dispatch('loadUsers');
// 		this.$store.dispatch('loadCheckoutDevices');
	},
};
</script>
