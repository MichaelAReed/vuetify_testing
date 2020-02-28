<template>
	<form ref="addEditObjForm" @submit.prevent="submitEvent">
		<v-container>
			<v-row class="mb-0 mt-0">
				<v-col cols="12" class="caption">
					<slot name="note"></slot>
				</v-col>
			</v-row>
			<v-row class="mb-0 mt-0">
				<v-col cols="12" v-for="key in Object.keys(objPacket.objData)" :key="key">
					<slot :name="key + '_input'" :objPacket="objPacket"></slot>
				</v-col>
			</v-row>
			<v-row class="mb-0 mt-0">
				<v-col cols="12">
					<v-file-input
						:label="typeString + ' Image'"
						filled
						show-size
						chips
						accept="image/*"
						prepend-icon="mdi-camera"
						ref="objImageInput"
						:rules="imageFileRules"
						:loading="loading"
						@change="onFilePicked"
						required
					></v-file-input>
				</v-col>
			</v-row>
			<v-row class="mb-0 mt-0" v-if="objImageURL">
				<v-col cols="12">
					<v-card>
						<v-img :src="objImageURL" max-height="300" contain></v-img>
						<v-card-title class="title">{{ objImageName }}</v-card-title>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</form>
</template>

<script>
export default {
	props: [
		'objPacket',
		'setObjPacket',
		'existingObj',
		'adminView',
		'typeString'
	],
	data() {
		return {
			// formIsValid: false,
			objImageURL: '',
			objImageName: '',
			imageFileRules: [
				value => {
					if (value) {
						if (value['type']) {
							if (value['name']) {
								return (
									(value['type'].split('/')[0] === 'image' &&
										value['name'].lastIndexOf('.') > 0) ||
									'Requires a valid image file.'
								);
							}
							return 'File name not found.';
						}
						return 'File type not found.';
					}
					return 'Required.';
				}
			]
		};
	},
	computed: {
		loading() {
			return this.$store.getters.loading;
		}
	},
	created() {
		if (this.existingObj) {
			for (let key of Object.keys(this.objPacket.objData)) {
				this.objPacket.objData[key] = this.existingObj[key];
			}
			this.objImageURL = this.existingObj.imageURL;
		}
	},
	watch: {
		objPacket: {
			handler: 'checkFormValidity',
			deep: true
		}
	},
	methods: {
		checkFormValidity() {
			if (
				this.$refs.addEditObjForm &&
				this.$refs.addEditObjForm.checkValidity
			) {
				if (
					this.objPacket.objImage &&
					this.$refs.objImageInput &&
					this.$refs.objImageInput.validate
				) {
					if (this.$refs.teamImage && this.$refs.teamImage.validate) {
						this.objPacket.isValid =
							this.$refs.teamImage.validate() &&
							this.$refs.createTeamForm.checkValidity();
					}
				} else {
					this.objPacket.isValid = this.$refs.addEditObjForm.checkValidity();
				}
			} else {
				this.objPacket.isValid = false;
			}
			this.setObjPacket(this.objPacket);
		},
		submitEvent() {
			this.$emit('submit-event');
		},
		onFilePicked(file) {
			if (file) {
				let filename = file.name;
				if (!this.$refs.objImageInput.validate()) {
					return;
				}
				const fileReader = new FileReader();
				fileReader.addEventListener('load', () => {
					this.objImageURL = fileReader.result;
					this.objImageName = filename;
				});
				fileReader.readAsDataURL(file);
				this.objPacket.objImage = file;
			} else {
				this.objImageURL = '';
				this.objPacket.objImage = null;
				this.objImageName = '';
			}
		}
	}
};
</script>