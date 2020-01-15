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
									<template v-if="loggedInUser.isAdmin">
										<v-spacer></v-spacer>
										checkoutDeviceEditor component here
										<v-btn
											@click="onDeleteCheckoutDevice"
											icon
										>
											<v-icon>mdi-delete-forever</v-icon>
										</v-btn>
									</template>
									<p>If you just scanned this from a device, press a button on a locker and scan the code it shows.</p>
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
									v-for="receptacle in checkoutDevice.toolReceptacles"
									:toolReceptacle="receptacle"
									:checkoutDevice="checkoutDevice"
									:showDetails="true"
									:key="receptacle._id"
								>
								</app-tool-receptacle-info>
							</v-col>
							<v-col cols="12">
								<app-add-checkout-device-receptacle-dialog
									v-if="loggedInUser.isAdmin"
									:checkoutDevice="checkoutDevice"
								>
								</app-add-checkout-device-receptacle-dialog>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12">
								<app-block-records-list
									:records="records"
								>
								</app-block-records-list>
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
		checkoutDevice() {
			return this.$store.getters.loadedCheckoutDevice(this.id);
		},
		loading() {
			return this.$store.getters.loading;
		},
		loggedInUser() {
			return this.$store.getters.user;
		},
		records() {
			return this.$store.getters.loadedRecordsOfObject(this.id);
		}
	},
	methods: {
		onDeleteCheckoutDevice() {
			this.$store.dispatch('deleteCheckoutDevice', this.id);
		}
	}
};
</script>
