<template>
	<v-dialog width="400px" persistent v-model="newToolDialog">
		<template v-slot:activator="{ on }">
			<v-btn v-on="on">
				Add New Tool of This Type
			</v-btn>
		</template>
		<v-card>
			<v-container>
				<v-row>
					<v-col cols="1">
						<v-avatar>
							<img :src="toolTypeImageURL"></v-img>
						</v-avatar>
					</v-col>
					<v-col cols="10" offset="1">
						<h2 class="primary--text">Add a New {{ toolTypeName }} Tool</h2>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12">
						<form ref="createToolForm" @submit.prevent="onCreateTool">
							<v-row>
								<v-col cols="12" md="8" offset-sm="2">
									<v-switch
										v-model="hasUniqueName"
										label="Add UniqueName"
									>
									</v-switch>
									<v-text-field
										v-if="hasUniqueName"
										name="ToolUniqueName"
										label="Name of Tool"
										id="tool-unique-name"
										v-model="toolUniqueName"
									>
									</v-text-field>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12" md="8" offset-sm="2">
									<v-select
										name="ToolStatus"
										:items="availableToolStatusList"
										label="Tool Status"
										id="tool-status"
										v-model="toolStatus"
										:rules="statusRules"
										required
									></v-select>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12" md="8" offset-sm="2">
									<v-btn
										class="primary"
										:disabled="!formIsValid() || loading"
										:loading="loading"
										type="submit"
									>
										Create Tool
									</v-btn>
									<v-btn @click="newToolDialog = false">Cancel</v-btn>
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
	props: ['toolTypeID', 'redirect'],
	data() {
		return {
			newToolDialog: 		false,
			toolStatus:			'',
			availableToolStatusList: ['ready', 'broken', 'repairing'],
			hasUniqueName:		false,
			toolUniqueName: 	'',
			statusRules: [
				value => (this.availableToolStatusList.includes(value)) || 'Please choose a status from the list.'
			],
		};
	},
	computed: {
		toolType() {
			return (this.toolTypeID ? this.$store.getters.loadedToolType(this.toolTypeID) : null);
		},
		toolTypeImageURL() {
			return this.toolType ? this.toolType.imageURL : "";
		},
		toolTypeName() {
			return this.toolType ? this.toolType.name : "";
		},
		loading() {
			return this.$store.getters.loading;
		}
	},
	methods: {
		formIsValid() {
			if (this.$refs.createToolForm && this.$refs.createToolForm.checkValidity) {
				return this.$refs.createToolForm.checkValidity();
			}
			return false;
		},
		onCreateTool() {
			if (!this.formIsValid()) {
				this.$store.dispatch('setError', 'Invalid input information.');
				return;
			}
			const toolData = {
				toolType: this.toolType,
				status: this.toolStatus
			};
			if (this.hasUniqueName) toolData["name"] = this.toolUniqueName
			this.$store.dispatch('createTool', {toolData: toolData, redirect: this.redirect});
		}
	}
};
</script>
