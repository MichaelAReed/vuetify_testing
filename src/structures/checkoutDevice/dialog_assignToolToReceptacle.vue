<template>
	<v-dialog width="400px" persistent v-model="assignToolDialog">
		<template v-slot:activator="{ on }">
			<v-btn v-on="on">
				Assign New Tool
			</v-btn>
		</template>
		<v-card>
			<v-container>
				<v-row>
					<v-col cols="1">
						<v-avatar>
							<img :src="checkoutDevice.imageURL"></v-img>
						</v-avatar>
					</v-col>
					<v-col cols="10" offset="1">
						<h2 class="primary--text">
							{{ checkoutDevice.name }}
							</br>
							Assign Tool to Rec. #{{ toolReceptacle.nameNum }}
						</h2>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12">
						<form ref="assignToolForm" @submit.prevent="onAssignTool">
							<v-row>
								<v-col cols="12">
									<select-tool-type
										v-model="toolTypeID"
										label="Select Tool Type"
										:wantCategories="true"
										:wantTools="true"
									>
									</select-tool-type>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12">
									<select-tool
										v-model="toolID"
										label="Select Tool"
										:followTree="true"
										:toolTypeID="toolTypeID"
										:onlyUncontainedTools="true"
									>
									</select-tool>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="10" offset-sm="2">
									<app-add-tool-dialog
										:toolTypeID="toolTypeID"
										:redirect="false"
									>
									</app-add-tool-dialog>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="10" offset-sm="2">
									<v-btn
										class="primary"
										:disabled="!formIsValid() || loading"
										:loading="loading"
										type="submit"
									>
										Assign Tool
									</v-btn>
									<v-btn @click="assignToolDialog = false">Cancel</v-btn>
								</v-col>
							</v-row>
						</form>
					</v-col>
				</v-row>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: ['checkoutDevice', 'toolReceptacle'],
	data() {
		return {
			assignToolDialog: 	false,
			toolTypeID:			null,
			toolID:				null,
		};
	},
	computed: {
		loading() {
			return this.$store.getters.loading;
		}
	},
	methods: {
		formIsValid() {
			if (this.$refs.assignToolForm && this.$refs.assignToolForm.checkValidity) {
				return this.$refs.assignToolForm.checkValidity();
			}
			return false;
		},
		onAssignTool() {
			if (!this.formIsValid()) {
				this.$store.dispatch('setError', 'Invalid input information.');
				return;
			}
			const toolData = {
				toolType: this.toolType,
				status: this.toolStatus
			};
			this.$store.dispatch('assignToolToReceptacle', {checkoutDeviceID: this.checkoutDevice._id, toolReceptacleID: this.toolReceptacle._id, assignmentData: {toolID: this.toolID}});
		}
	}
};
</script>
