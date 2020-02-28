<template>
	<app-block-add-edit-obj-form
		:existingObj="existingObj"
		:adminView="adminView"
		:objPacket="emptyObjPacket"
		typeString="Tool Type"
		@submit-event="submitEvent"
		:setObjPacket="setObjPacket"
	>
		<template v-slot:name_input="slotProps">
			<v-text-field
				name="ToolTypeName"
				label="Name of Tool/Category"
				id="tool-type-name"
				v-model="slotProps.objPacket.objData.name"
				:rules="stdRules"
				required
			></v-text-field>
		</template>
		<template v-slot:chineseName_input="slotProps">
			<v-text-field
				name="ToolTypeChineseName"
				label="Chinese Name of Tool/Category"
				id="tool-type-chinese-name"
				v-model="slotProps.objPacket.objData.chineseName"
				:rules="stdRules"
				required
			></v-text-field>
		</template>
		<template v-slot:parent_input="slotProps">
			<select-tool-type
				v-model="slotProps.objPacket.objData.parent"
				label="Select Tool Type"
				:wantCategories="true"
				:wantTools="true"
				:defaultToolTypeID="defaultParentID ? defaultParentID : null"
			></select-tool-type>
		</template>
		<template v-slot:cost_input="slotProps">
			<v-text-field
				name="ToolTypeCost"
				label="Cost of Tool"
				id="tool-type-cost"
				v-model="slotProps.objPacket.objData.cost"
				type="number"
				prefix="¥"
				suffix="RMB"
				:rules="costRules"
				required
			></v-text-field>
		</template>
		<template v-slot:isTool_input="slotProps">
			<v-switch
				v-model="slotProps.objPacket.objData.isTool"
				:label="slotProps.objPacket.objData.isTool ? 'Tool' : 'Tool Category'"
			></v-switch>
		</template>
		<template v-slot:description_input="slotProps">
			<v-textarea
				name="ToolTypeDescription"
				label="Tool Type Description"
				id="tool-type-description"
				v-model="slotProps.objPacket.objData.description"
				hint="Example: The T12 is a cheap and high quality soldering iron with integrated temperature sensors in the consumable tip, this means the iron can reach 450C within 10-20 seconds and consistently apply good heat transfer to boards/components during soldering."
				:rules="stdRules"
				required
			></v-textarea>
		</template>
		<template v-slot:instructionsURL_input="slotProps">
			<v-text-field
				name="ToolTypeInstructionsURL"
				label="Instructions/Details URL"
				id="tool-type-instructions-url"
				v-model="slotProps.objPacket.objData.instructionsURL"
				:rules="urlRules"
				required
			></v-text-field>
		</template>
	</app-block-add-edit-obj-form>
</template>

<script>
// NOTE that right now there isn't API level protection against someone changing their team credits, just a naive guard of only admins being able to access the 'adminView' of this element.
export default {
	props: ['setObjPacket', 'existingObj', 'adminView', 'defaultParentID'],
	data() {
		return {
			formIsValid: false,

			emptyObjPacket: {
				objData: {
					name: '',
					chineseName: '',
					parent: '',
					cost: 0,
					isTool: '',
					description: '',
					instructionsURL: ''
				},
				objImage: null,
				isValid: null
			},

			stdRules: [value => !!value || 'Cannot be blank.'],
			urlRules: [
				value => {
					const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
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
		loading() {
			return this.$store.getters.loading;
		}
	},
	methods: {
		submitEvent() {
			this.$emit('submit-event');
		}
	}
};
</script>