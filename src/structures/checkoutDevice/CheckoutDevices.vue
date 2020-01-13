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
		<v-row v-if="loggedInUser.isAdmin">
			<v-col offset-sm="1" offset-md="2">
				<v-btn outlined router to="/CheckoutDevices/new" class="primary">
					Add Checkout Device
				</v-btn>
			</v-col>
		</v-row>
		<template v-if="!loading">
			<v-row
				justify="space-around"
				v-for="checkoutDevice in checkoutDevices"
				:key="checkoutDevice._id"
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
										:src="checkoutDevice.imageURL"
									>
									</v-img>
								</v-col>
								<v-col cols="7" sm="8" md="9">
									<v-card-title primary-title>
										<div>
											<h3 class="mb-0">
												{{ checkoutDevice.name }}
											</h3>
										</div>
									</v-card-title>
									<v-card-text>
										<app-tool-receptacle-info
											v-for="receptacle in checkoutDevice.toolReceptacles"
											:toolReceptacle="receptacle"
											:showDetails="false"
											:key="receptacle._id"
										>
										</app-tool-receptacle-info>
									</v-card-text>
									<v-card-actions>
										<v-btn
											text
											outlined
											:to="'/checkoutDevices/' + checkoutDevice._id"
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
	props: ['onlyRooms'],
	data() {
		return {
			includeCategories: 	false,
			includeTools: 		true
		}
	},
	computed: {
		checkoutDevices() {
			return this.$store.getters.loadedCheckoutDevices;
		},
		loggedInUser() {
			return this.$store.getters.user;
		},
		loading() {
			return this.$store.getters.loading;
		}
	},
	created() {
		this.$store.dispatch('loadCheckoutDevices');
		this.$store.dispatch('loadTools');
	},
	methods: {
	}
};
</script>
