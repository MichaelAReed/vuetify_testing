<template>
	<v-container>
		<v-row>
			<v-col cols="12" sm="6" offset-sm="3">
				<h2 class="primary--text">Add a Tool Type</h2>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12">
				<form ref="createToolTypeForm" @submit.prevent="onCreateToolType">
					<v-row class="mb-0 mt-0">
						<v-col cols="12" sm="6" offset-sm="3">
							<v-text-field
								name="ToolTypeName"
								label="Name of Tool/Category"
								id="tool-type-name"
								v-model="toolTypeName"
								:rules="stdRules"
								required
							>
							</v-text-field>
						</v-col>
					</v-row>
					<v-row class="mb-0 mt-0">
						<v-col cols="12" sm="6" offset-sm="3">
							<v-text-field
								name="ToolTypeChineseName"
								label="Chinese Name of Tool/Category"
								id="tool-type-chinese-name"
								v-model="toolTypeChineseName"
								:rules="stdRules"
								required
							>
							</v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="1" sm="1" offset-sm="3">
							<v-avatar>
								<img :src="parentToolTypeImageURL"></v-img>
							</v-avatar>
						</v-col>
						<v-col cols="11" sm="5">
							<v-select
								name="ToolTypeParentType"
								:items="parentsList"
								label="Parent Tool Type"
								id="tool-type-parent"
								v-model="toolTypeParentType"
								:rules="parentRules"
								required
							></v-select>
						</v-col>
					</v-row>
					<v-row class="mb-0 mt-0">
						<v-col cols="6" sm="3" offset-sm="3">
							<v-text-field
								name="ToolTypeCost"
								label="Cost of Tool"
								id="tool-type-cost"
								v-model="toolTypeCost"
								type="number"
								prefix="¥"
								suffix="RMB"
								:rules="costRules"
								required
							>
							</v-text-field>
						</v-col>
					</v-row>
					<v-row class="mb-0 mt-0">
						<v-col cols="6" sm="3" offset-sm="3">
							<v-switch
								v-model="toolTypeIsTool"
								:label="isAToolString"
							>
							</v-switch>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" sm="6" offset-sm="3">
							<v-textarea
								name="ToolTypeDescription"
								label="Tool Type Description"
								id="tool-type-description"
								v-model="toolTypeDescription"
								hint="Example: The T12 is a cheap and high quality soldering iron with integrated temperature sensors in the consumable tip, this means the iron can reach 450C within 10-20 seconds and consistently apply good heat transfer to boards/components during soldering."
								:rules="stdRules"
								required
							>
							</v-textarea>
						</v-col>
					</v-row>
					<v-row class="mb-0 mt-0">
						<v-col cols="12" sm="6" offset-sm="3">
							<v-text-field
								name="ToolTypeInstructionsURL"
								label="Instructions/Details URL"
								id="tool-type-instructions-url"
								v-model="toolTypeInstructionsURL"
								:rules="urlRules"
								required
							>
							</v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" sm="6" offset-sm="3">
							<v-file-input
								label="Tool Type Image"
								filled
								show-size
								chips
								accept="image/*"
								prepend-icon="mdi-camera"
								ref="toolTypeImage"
								:rules="imageFileRules"
								:loading="loading"
								@change="onFilePicked"
								required
							></v-file-input>
						</v-col>
					</v-row>
					<v-row v-if="toolTypeImageURL">
						<v-col cols="12" sm="6" offset-sm="3">
							<v-card>
								<v-img :src="toolTypeImageURL" max-height="300" contain></v-img>
								<v-card-title class="title">{{ toolTypeImageName }}</v-card-title>
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
								Create Tool Type
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
			toolTypeName: 			'',
			toolTypeChineseName: 	'',
			toolTypeParentType:		'root',
			toolTypeCost: 			0,
			toolTypeIsTool: 		true,
			toolTypeDescription: 	'',
			toolTypeInstructionsURL:'',
			toolTypeImageURL:		'',

			toolTypeImage: 			null,
			toolTypeImageName: 		'',

			parentsList: 			[],
			parentsListDict: 		{},

			stdRules: [
				value => !!value || 'Cannot be blank.'
			],
			parentRules: [
				value => (this.parentsList.includes(value)) || 'Please choose a parent tool type from the list.'
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
			],
			urlRules: [
				value => {
					const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
					return regexp.test(value) || 'Must be a valid URL.';
				}
			],
			costRules: [
				value => {
					if (value) {
						if (value >= 0) {
							return true;
						}
						return 'Must be a positive number';
					}
					return 'Needs an initial value. 0 is valid.';
				}
			]
		};
	},
	computed: {
		parentToolTypeImageURL() {
			if (this.$store.getters.loadedToolType(this.parentsListDict[this.toolTypeParentType])) {
				return this.$store.getters.loadedToolType(this.parentsListDict[this.toolTypeParentType]).imageURL;
			} else {
				return '';
			}
		},
		loading() {
			return this.$store.getters.loading;
		},
		isAToolString() {
			if (this.toolTypeIsTool) return "Is a Tool";
			return "Is a Tool Category"
		}
	},
	created() {
		for (let toolType of this.$store.getters.loadedToolTypes(true, false)) {
			this.parentsList.push(toolType['name']);
			this.parentsListDict[toolType['name']] = toolType._id;
			if (this.parentID === toolType._id) {
				this.toolTypeParentType = toolType['name'];
			}
		}
		if (!this.parentID) {
			this.toolTypeParentType = this.parentsList[0];
		}
	},
	methods: {
		formIsValid() {
			if (this.$refs.createToolTypeForm && this.$refs.createToolTypeForm.checkValidity) {
				if (this.$refs.toolTypeImage && this.$refs.toolTypeImage.validate) {
					return this.$refs.createToolTypeForm.checkValidity() && this.$refs.toolTypeImage.validate();
				}
			}
			return false;
		},
		onCreateToolType() {
			if (!this.formIsValid()) {
				this.$store.dispatch('setError', 'Invalid input information.');
				return;
			}
			const toolTypeData = {
				name:			this.toolTypeName,
				chineseName: 	this.toolTypeChineseName,
				parent:			this.parentsListDict[this.toolTypeParentType],
				cost: 			this.toolTypeCost,
				isTool:			this.toolTypeIsTool,
				description: 	this.toolTypeDescription,
				instructionsURL:this.toolTypeInstructionsURL
			};
			this.$store.dispatch('createToolType', {toolTypeData: toolTypeData, image: this.toolTypeImage});
		},
		onFilePicked(file) {
			if (file) {
				let filename = file.name;
				if (!this.$refs.toolTypeImage.validate()) {
					return;
				}
				const fileReader = new FileReader()
				fileReader.addEventListener('load', () => {
					this.toolTypeImageURL = fileReader.result;
					this.toolTypeImageName = filename;
				})
				fileReader.readAsDataURL(file);
				this.toolTypeImage = file;
			} else {
				this.toolTypeImageURL = '';
				this.toolTypeImage = null;
				this.toolTypeImageName = '';
			}
		}
	}
};
</script>
