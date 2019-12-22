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
									:src="toolType.imageURL"
								>
								</v-img>

							</v-col>
							<v-col  cols="8">
								<v-card-title>
									<h3>{{ toolType.name }}</h3>
									<template v-if="loggedInUser.isAdmin">
										<v-spacer></v-spacer>
										toolTypeEditor component here
									</template>
								</v-card-title>
								{{ toolType.description }}
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="4">
								<app-chip-toolTypePermission :toolTypeID="toolType._id"></app-chip-toolTypePermission>
								<app-chip-toolType v-if="toolType.parent" :toolType="toolType.parent"></app-chip-toolType>
							</v-col>
							<v-col cols="8">
								<v-card-text>
									<div class="info--text">
										Last Updated: {{ toolType.lastUpdated | date }}
									</div>
								</v-card-text>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn v-if="loggedInUser.isAdmin" class="primary" @click="onDeleteToolType">Delete Tool Type</v-btn>
									<app-add-user-permission-dialog
										v-if="!toolType.userHasPermission && !toolType.userHasRequestedPermission"
										:adminView="false" :user="loggedInUser"
										:toolTypeInputID="toolType._id"
									>
									</app-add-user-permission-dialog>
								</v-card-actions>
							</v-col>
						</v-row>
						<v-row v-if="!toolType.isTool">
							<v-col cols="12">
								<v-card>
									<v-card-title>
										Children Tool Types
									</v-card-title>
									<v-card-text>
										Categories:
										<app-chip-toolType
											v-for="childToolType in childrenToolTypes_category"
											:toolType="childToolType"
											:key="childToolType._id"
										>
										</app-chip-toolType>
										<br>
										Tool Types:
										<app-chip-toolType
											v-for="childToolType in childrenToolTypes_tool"
											:toolType="childToolType"
											:key="childToolType._id"
										>
										</app-chip-toolType>
									</v-card-text>
								</v-card>
							</v-col>
						</v-row>
						<v-row v-if="toolType.isTool">
							<v-col cols="12">
								<v-card>
									<v-card-title>
										Tools
									</v-card-title>
									<v-card-text>
										<app-chip-toolStatus
											v-for="tool in tools"
											:key="tool._id"
											:displayName=true
											:tool="tool"
										>
										</app-chip-toolStatus>
									</v-card-text>
									<v-card-actions>
										<app-add-tool-dialog v-if="loggedInUser.isAdmin" :toolType="toolType"></app-add-tool-dialog>
									</v-card-actions>
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
	computed: {
		tools() {
			return this.$store.getters.loadedToolsOfType(this.id);
		},
		toolType() {
			return this.$store.getters.loadedToolType(this.id);
		},
		loading() {
			return this.$store.getters.loading;
		},
		loggedInUser() {
			return this.$store.getters.user;
		},
		childrenToolTypes_tool() {
			return this.$store.getters.loadedChildrenToolTypes_tool(this.id);
		},
		childrenToolTypes_category() {
			return this.$store.getters.loadedChildrenToolTypes_category(this.id);
		}
	},
	methods: {
		onDeleteToolType() {
			this.$store.dispatch('deleteToolType', this.id);
		}
	}
};
</script>
