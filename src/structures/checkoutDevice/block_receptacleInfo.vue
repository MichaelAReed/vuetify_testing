<template>
	<v-card>
		<v-card-text
			class="mt-3 mb-3 mr-3 ml-0"
		>
			<v-container v-if="showDetails">
				<v-row>
					<v-col cols="6">
						<v-row class="mt-n6 mb-n6">
							<v-col cols="5" class="info--text">
								Receptacle #:
							</v-col>
							<v-col cols="7">
								{{ toolReceptacle.nameNum }}
							</v-col>
						</v-row>
						<v-row class="mt-n6 mb-n6">
							<v-col cols="5" class="info--text">
								Lock Type:
							</v-col>
							<v-col cols="7">
								{{ toolReceptacle.lockType }}
							</v-col>
						</v-row>
						<v-row class="mt-n6 mb-n6">
							<v-col cols="5" class="info--text">
								Dimensions:
							</v-col>
							<v-col cols="7">
								{{ toolReceptacle.dimensions.x }}x{{ toolReceptacle.dimensions.y }}x{{ toolReceptacle.dimensions.z }}mm
							</v-col>
						</v-row>
						<v-row class="mt-n6 mb-n6">
							<v-col cols="5" class="info--text">
								Last Accessed:
							</v-col>
							<v-col cols="7">
								{{ toolReceptacle.lastAccessed | date }}
							</v-col>
						</v-row>
						<v-row class="mt-n6 mb-n6">
							<v-col cols="5" class="info--text">
								Firmware Rev:
							</v-col>
							<v-col cols="7">
								{{ toolReceptacle.ctrlFirmwareRev}}
							</v-col>
						</v-row>
						<v-row class="mt-n6 mb-n6">
							<v-col cols="5" class="info--text">
								Hardware Rev:
							</v-col>
							<v-col cols="7">
								{{ toolReceptacle.ctrlHardwareRev}}
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="2">
								<v-btn
									@click="deleteToolReceptacle"
									icon
								>
									<v-icon>mdi-delete-forever</v-icon>
								</v-btn>
							</v-col>
							<v-col cols="10">
								<app-dialog-assign-tool
									:checkoutDevice="checkoutDevice"
									:toolReceptacle="toolReceptacle"
								>
								</app-dialog-assign-tool>
							</v-col>
						</v-row>
						<v-row v-if="toolReceptacle.containedTool">
							<v-col cols="12">
								<v-btn
									@click="deassignToolToReceptacle"
								>
									Remove Tool
								</v-btn>
							</v-col>
						</v-row>
					</v-col>
					<v-col cols="6">
						<app-location-img
							:imageURL="checkoutDevice.imageURL"
							v-model="internalPos"
							:radius="25"
							style="width: 200px; height: 200px;"
						>
						</app-location-img>
					</v-col>
				</v-row>
			</v-container>
			<div v-if="!showDetails">
				# {{ toolReceptacle.nameNum }}:
			</div>
			<app-chip-toolStatus
				v-if="toolReceptacle.containedTool"
				:key="toolReceptacle.containedTool._id"
				:displayName=true
				:tool="containedTool"
			>
			</app-chip-toolStatus>
			<div v-else>
				<div v-if="!showDetails">
					No Stored Tool
				</div>
			</div>
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	props: ['checkoutDevice', 'toolReceptacle', 'showDetails'],
	computed: {
		toolTypeName() {
			if (this.tool.toolType.name) return this.tool.toolType.name;
			return this.$store.getters.loadedToolType(this.tool.toolType).name;
		},
		containedTool() {
			return this.$store.getters.loadedTool(this.toolReceptacle.containedTool._id);
		},
		internalPos() {
			return {x: this.toolReceptacle.internalPos.x, y: this.toolReceptacle.internalPos.y};
		}
	},
	methods: {
		deleteToolReceptacle() {
			const toolReceptacleData = {
				toolReceptacleID: 	this.toolReceptacle._id
			};
			this.$store.dispatch('deleteToolReceptacleFromCheckoutDevice', {checkoutDeviceID: this.checkoutDevice._id, toolReceptacleData: toolReceptacleData});
		},
		deassignToolToReceptacle() {
			this.$store.dispatch('deassignToolToReceptacle', {checkoutDeviceID: this.checkoutDevice._id, toolReceptacleID: this.toolReceptacle._id});
		}
	},
}
</script>
