<template>
	<v-container>
		<v-row>
			<v-col cols="12" sm="6" offset-sm="3">
				<h2 class="primary--text">Add a New Checkout Device</h2>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12">
				<form ref="createCheckoutDeviceForm" @submit.prevent="onCreateCheckoutDevice">
					<v-row class="mb-0 mt-0">
						<v-col cols="12" sm="6" offset-sm="3">
							<v-text-field
								name="CheckoutDeviceName"
								label="Name of Checkout Device (ie. Electronics Lab Consumables)"
								id="checkout-device-name"
								v-model="checkoutDeviceName"
								:rules="stdRules"
								required
							>
							</v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" sm="6" offset-sm="3">
							<select-tool
								v-model="roomID"
								label="Which Room is it Located?"
								:followTree="true"
								:onlyRooms="true"
							>
							</select-tool>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" sm="6" offset-sm="3">
							<app-location-img
								:useOfficeMap="true"
								v-model="mapLocation"
								:selectable="true"
								style="width: 400px; height: 200px;"
								:radius="10"
							>
							</app-location-img>
						</v-col>
					</v-row>
					<v-row class="mb-0 mt-0">
						<v-col cols="12" sm="6" offset-sm="3">
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
					<v-row class="mb-0 mt-0">
						<v-col cols="12" sm="6" offset-sm="3">
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
						<v-col cols="12" sm="6" offset-sm="3">
							<v-file-input
								label="Checkout Device Image"
								filled
								show-size
								chips
								accept="image/*"
								prepend-icon="mdi-camera"
								ref="checkoutDeviceImage"
								:rules="imageFileRules"
								:loading="loading"
								@change="onFilePicked"
								required
							></v-file-input>
						</v-col>
					</v-row>
					<v-row v-if="checkoutDeviceImageURL">
						<v-col cols="12" sm="6" offset-sm="3">
							<v-card>
								<v-img :src="checkoutDeviceImageURL" max-height="300" contain></v-img>
								<v-card-title class="title">{{ checkoutDeviceImageName }}</v-card-title>
							</v-card>
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
								Create Checkout Device
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
	props: ['parentID'],
	data() {
		return {
			deleteMe:				null,
			checkoutDeviceName: 	'',
			roomID:					null,
			mapLocation:			null,
			ctrlHardwareRev: 		'',
			ctrlFirmwareRev: 		'',

			checkoutDeviceImage: 	null,
			checkoutDeviceImageName:'',
			checkoutDeviceImageURL:	'',

			stdRules: [
				value => !!value || 'Cannot be blank.'
			],
			revNumRules: [
				// TODO: validate the revision number properly
				value => true
			],
			imageFileRules: [
				value => {
					if (value) {
						if (value["type"]) {
							if (value["name"]) {
								return (value["type"].split('/')[0] === 'image' && value["name"].lastIndexOf('.') > 0) || 'Requires a valid image file.';
							}
							return "File name not found.";
						}
						return "File type not found.";
					}
					return 'Required.';
				}
			]
		};
	},
	computed: {
		locationRoomImageURL() {
			if (this.$store.getters.loadedTool(this.roomsListDict[this.locationRoom])) {
				return this.$store.getters.loadedTool(this.roomsListDict[this.locationRoom]).toolType.imageURL;
			}
			return '';
		},
		loading() {
			return this.$store.getters.loading;
		},
		isAToolString() {
			if (this.toolTypeIsTool) return "Is a Tool";
			return "Is a Tool Category"
		}
	},
	methods: {
		formIsValid() {
			if (this.$refs.createCheckoutDeviceForm && this.$refs.createCheckoutDeviceForm.checkValidity) {
				if (this.$refs.checkoutDeviceImage && this.$refs.checkoutDeviceImage.validate) {
					return this.$refs.createCheckoutDeviceForm.checkValidity() && this.$refs.checkoutDeviceImage.validate();
				}
			}
			return false;
		},
		onCreateCheckoutDevice() {
			if (!this.formIsValid()) {
				this.$store.dispatch('setError', 'Invalid input information.');
				return;
			}
			const checkoutDeviceData = {
				name: 				this.checkoutDeviceName,
				mapLocation: {
					roomNum: 		this.roomID,
					x:				parseInt(this.mapLocation.x),
					y:				parseInt(this.mapLocation.y)
				},
				ctrlFirmwareRev:	this.ctrlFirmwareRev,
				ctrlHardwareRev:	this.ctrlHardwareRev,
			};
			this.$store.dispatch('createCheckoutDevice', {checkoutDeviceData: checkoutDeviceData, image: this.checkoutDeviceImage, redirect: true});
		},
		onFilePicked(file) {
			if (file) {
				let filename = file.name;
				if (!this.$refs.checkoutDeviceImage.validate()) {
					return;
				}
				const fileReader = new FileReader()
				fileReader.addEventListener('load', () => {
					this.checkoutDeviceImageURL = fileReader.result;
					this.checkoutDeviceImageName = filename;
				})
				fileReader.readAsDataURL(file);
				this.checkoutDeviceImage = file;
			} else {
				this.checkoutDeviceImageURL = '';
				this.checkoutDeviceImage = null;
				this.checkoutDeviceImageName = '';
			}
		}
	}
};
</script>
