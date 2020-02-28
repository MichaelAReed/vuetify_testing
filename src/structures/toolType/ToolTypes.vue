<template>
	<v-container>
		<v-row>
			<v-col offset-sm="1" offset-md="0" offset-lg="1" cols="12" sm="10" md="12" lg="10">
				<v-container>
					<v-row v-if="loading">
						<v-col cols="12" class="text-center">
							<v-progress-circular indeterminate class="primary--text" :width="7" :size="70"></v-progress-circular>
						</v-col>
					</v-row>
					<v-row v-if="!loading">
						<v-col v-if="loggedInUser.isAdmin">
							<app-dialog-add-edit-obj typeString="toolType"></app-dialog-add-edit-obj>
						</v-col>
						<v-col>
							<v-switch v-model="includeCategories" label="Include Categories"></v-switch>
						</v-col>
						<v-col>
							<v-switch v-model="includeTools" label="Include Tools"></v-switch>
						</v-col>
					</v-row>
					<v-row v-if="!loading">
						<v-col cols="12" md="6" v-for="toolType in toolTypes" :key="toolType._id">
							<v-card class="secondary" height="100%">
								<v-container>
									<v-row>
										<v-col cols="5">
											<v-img class="white--text" height="200px" :src="toolType.imageURL"></v-img>
										</v-col>
										<v-col cols="7">
											<v-card-title primary-title>
												<h4 class="mb-0">{{ toolType.name }}</h4>
											</v-card-title>
											<v-card-text>
												<h5>Permission:</h5>
												<app-chip-toolTypePermission :toolTypeID="toolType._id"></app-chip-toolTypePermission>
												<h5>Category:</h5>
												<app-chip-toolType v-if="toolType.parent" :toolType="toolType.parent"></app-chip-toolType>
												<h5>Hazards:</h5>
												<div v-if="toolType.hazards">
													<app-chip-hazard
														v-for="hazardDef in toolType.hazards"
														:key="hazardDef.hazard._id"
														:hazard="hazardDef.hazard"
														:classVal="hazardDef.classVal"
													></app-chip-hazard>
												</div>
												<div v-if="onlyRooms">
													<app-chip-toolStatus
														v-for="tool in $store.getters.loadedToolsOfType(toolType._id)"
														:key="tool._id"
														:displayName="true"
														:tool="tool"
													></app-chip-toolStatus>
												</div>
											</v-card-text>
											<v-card-actions>
												<v-btn text outlined :to="'/toolTypes/' + toolType._id">
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
	props: ['onlyRooms'],
	data() {
		return {
			includeCategories: false,
			includeTools: true
		};
	},
	computed: {
		toolTypes() {
			if (this.onlyRooms) {
				let rootMeetingRoomToolType = this.$store.getters.rootMeetingRoomToolType();
				let returnList = this.getChildrenToolTypes(
					rootMeetingRoomToolType._id
				).filter(toolType => {
					return (
						(this.includeTools && toolType.isTool) ||
						(this.includeCategories && !toolType.isTool)
					);
				});
				// 				console.log(returnList);
				return returnList;
			} else {
				return this.$store.getters.loadedToolTypes(
					this.includeCategories,
					this.includeTools
				);
			}
		},
		loggedInUser() {
			return this.$store.getters.user;
		},
		loading() {
			return this.$store.getters.loading;
		}
	},
	created() {
		this.$store.dispatch('loadToolTypes');
		this.$store.dispatch('loadTools');
	},
	methods: {
		getChildrenToolTypes(toolTypeID) {
			let tempList = this.$store.getters.loadedChildrenToolTypes_tool(
				toolTypeID
			);
			tempList = tempList.concat(
				this.$store.getters.loadedChildrenToolTypes_category(toolTypeID)
			);
			let returnList = tempList;
			for (let toolType of tempList) {
				returnList = returnList.concat(
					this.getChildrenToolTypes(toolType._id)
				);
			}
			return returnList;
		}
	}
};
</script>
