<template>
	<v-container>
		<v-row>
			<v-col cols="12" sm="6" offset-sm="3">
				<h2 class="primary--text">Add a New Tool</h2>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12">
				<form ref="createToolForm" @submit.prevent="onCreateTool">
					<v-row>
						<v-col cols="12" sm="6" offset-sm="3">
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
						<v-col cols="1" sm="1" offset-sm="3">
							<v-avatar>
								<img :src="toolTypeImageURL"></v-img>
							</v-avatar>
						</v-col>
						<v-col cols="11" sm="5">
							<v-select
								name="ToolType"
								:items="toolTypesList"
								label="Tool Type"
								id="toolType"
								v-model="toolType"
								:rules="toolTypeRules"
								chips
								required
							>
							</v-select>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" sm="6" offset-sm="3">
							<v-btn
								class="primary"
								:disabled="!formIsValid() || loading"
								:loading="loading"
								type="submit"
							>
								Create Tool
							</v-btn>
						</v-col>
					</v-row>
				</form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	props: ['toolTypeID'],
	data() {
		return {
			toolType: 			'',
			toolTypesList: 		[],
			toolTypesListDict: 	{},
			toolStatus: 		'',
			availableToolStatusList: ['ready', 'broken', 'repairing'],
			statusRules: [
				value => (this.availableToolStatusList.includes(value)) || 'Please choose a status from the list.'
			],
			toolTypeRules: [
				value => (this.toolTypesList.includes(value)) || "If you can't find the tool type, please make a new one first."
			],
		};
	},
	computed: {
		toolTypeImageURL() {
			return this.$store.getters.loadedToolType(this.toolTypesListDict[this.toolType]).imageURL;
		},
		loading() {
			return this.$store.getters.loading;
		}
	},
	created() {
		for (let toolType of this.$store.getters.loadedToolTypesTools) {
			this.toolTypesList.push(toolType['name']);
			this.toolTypesListDict[toolType['name']] = toolType._id;
			if (this.toolTypeID === toolType._id) {
				this.toolType = toolType['name'];
			}
		}
		if (this.toolType === '') {
			this.toolType = this.toolTypesList[0];
		}

// 		this.toolStatus = this.availableToolStatusList[0];
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
			this.$store.dispatch('createTool', {toolData: toolData});
		}
	}
};
</script>
