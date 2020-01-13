<template>
	<v-dialog width="400px" persistent v-model="newToolReceptacleDialog">
		<template v-slot:activator="{ on }">
			<v-btn v-on="on">
				Add Tool Receptacle
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
						<h2 class="primary--text">Add a New Tool Receptacle to {{ checkoutDevice.name }}</h2>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12">
						<form ref="createToolReceptacleForm" @submit.prevent="onCreateToolReceptacle">
							<v-row>
								<v-col cols="12" md="8" offset-sm="2">
									<v-select
										name="LockType"
										:items="availableLockTypeList"
										label="Lock Type"
										id="lock-type"
										v-model="lockType"
										:rules="lockTypeRules"
										required
									></v-select>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12" md="8" offset-sm="2">
									<v-text-field
										name="ctrlHardwareRev"
										label="Revision of hardware system (eg: '0.1.14')"
										id="ctrl-hardware-rev"
										v-model="ctrlHardwareRev"
										:rules="revNumRules"
										required
									>
									</v-text-field>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12" md="8" offset-sm="2">
									<v-text-field
										name="ctrlFirmwareRev"
										label="Revision of firmware system (eg: '0.1.14')"
										id="ctrl-firmware-rev"
										v-model="ctrlFirmwareRev"
										:rules="revNumRules"
										required
									>
									</v-text-field>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12" md="8" offset-sm="2">
									<app-location-img
										:imageURL="checkoutDevice.imageURL"
										v-model="internalPos"
										:selectable="true"
										:radius="25"
										style="width: 200px; height: 200px;"
									>
									</app-location-img>
								</v-col>
							</v-row>
							<!--<v-row>
								<v-col cols="12" md="8" offset-sm="2">
									<v-text-field
										name="internalPosX"
										label="Checkout Device x pos"
										id="internal-x-pos"
										v-model="internalPos.x"
										:rules="intRules"
										required
									>
									</v-text-field>
									<v-text-field
										name="internalPosY"
										label="Checkout Device y pos"
										id="internal-y-pos"
										v-model="internalPos.y"
										:rules="intRules"
										required
									>
									</v-text-field>
								</v-col>
							</v-row>-->
							<v-row>
								<v-col cols="12" md="8" offset-sm="2">
									<v-text-field
										name="dimensionX"
										label="Receptacle Width"
										id="dimension-x"
										v-model="dimensionX"
										:rules="intRules"
										required
									>
									</v-text-field>
									<v-text-field
										name="dimensionY"
										label="Receptacle Height"
										id="dimension-y"
										v-model="dimensionY"
										:rules="intRules"
										required
									>
									</v-text-field>
									<v-text-field
										name="dimensionZ"
										label="Receptacle Depth"
										id="dimension-z"
										v-model="dimensionZ"
										:rules="intRules"
										required
									>
									</v-text-field>
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
										Create Tool Receptacle
									</v-btn>
									<v-btn @click="newToolReceptacleDialog = false">Cancel</v-btn>
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
	props: ['checkoutDevice'],
	data() {
		return {
			newToolReceptacleDialog: 		false,
			availableLockTypeList: 			['locker', 'chain', 'powerSwitch'],

			lockType: 						'',
			dimensionX:						null,
			dimensionY:						null,
			dimensionZ:						null,
			internalPos:					{x: null, y: null},
			internalPosX:					null,
			internalPosY:					null,
			ctrlFirmwareRev:				null,
			ctrlHardwareRev:				null,

			stdRules: [
				value => !!value || 'Cannot be blank.'
			],
			lockTypeRules: [
				value => (this.availableLockTypeList.includes(value)) || 'Please choose a lock type from the list.'
			],
			revNumRules: [
				// TODO: validate the revision number properly
				value => true
			],
			intRules: [
				value => Number.isInteger(parseInt(value)) || 'Please input an integer number.'
			],
		};
	},
	computed: {
		loading() {
			return this.$store.getters.loading;
		}
	},
	methods: {
		formIsValid() {
			if (this.$refs.createToolReceptacleForm && this.$refs.createToolReceptacleForm.checkValidity) {
				return this.$refs.createToolReceptacleForm.checkValidity();
			}
			return false;
		},
		onCreateToolReceptacle() {
			if (!this.formIsValid()) {
				this.$store.dispatch('setError', 'Invalid input information.');
				return;
			}
			const toolReceptacleData = {
				lockType: 		this.lockType,
				dimensions: 	{
					x:			parseInt(this.dimensionX),
					y:			parseInt(this.dimensionY),
					z: 			parseInt(this.dimensionZ)
				},
				internalPos: 	{
					x:			parseInt(this.internalPos.x),
					y:			parseInt(this.internalPos.y)
				},
				ctrlFirmwareRev:this.ctrlFirmwareRev,
				ctrlHardwareRev:this.ctrlHardwareRev
			};
			this.$store.dispatch('addToolReceptacleToCheckoutDevice', {checkoutDeviceID: this.checkoutDevice._id, toolReceptacleData: toolReceptacleData});
		}
	}
};
</script>
