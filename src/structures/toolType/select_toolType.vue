<template>
	<v-container>
		<v-row>
			<v-col cols="2">
				<v-avatar>
					<img :src="toolTypeImageURL"></v-img>
				</v-avatar>
			</v-col>
			<v-col cols="9" offset="1">
				<v-select
					name="ToolType"
					@input="handleInput"
					:items="toolTypeNamesList"
					:label="label"
					id="tool-type"
					v-model="toolTypeName"
					:rules="toolTypesListRules"
					required
				></v-select>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	props: ['toolTypeID', 'label', 'defaultToolTypeID', 'wantCategories', 'wantTools'],
	model: {
		prop: 'toolTypeID',
		event: 'input'
	},
	data () {
		return {
// 			content: 			this.toolTypeID,
			toolTypeName:		null,
			toolTypeNamesList:	[],
			toolTypesDict: 		{},
			toolTypesListRules: [
				value => (this.toolTypeNamesList.includes(value)) || 'Please choose a tool type from the list.'
			],
		}
	},
	methods: {
		handleInput (e) {
			this.$emit('input', this.toolTypesDict[this.toolTypeName]);
		}
	},
	created() {
		if (this.label === null || this.label === undefined) this.label = 'Tool Type';
		for (let toolType of this.$store.getters.loadedToolTypes(this.wantCategories, this.wantTools)) {
			this.toolTypeNamesList.push(toolType['name']);
			this.toolTypesDict[toolType['name']] = toolType._id;
			if (this.defaultToolTypeID === toolType._id) {
				this.toolTypeName = toolType['name'];
			}
		}
		if (!this.toolTypeName) {
			this.toolTypeName = this.toolTypeNamesList[0];
		}
		this.$emit('input', this.toolTypesDict[this.toolTypeName]);
	},
	computed: {
		toolTypeImageURL() {
			return this.$store.getters.loadedToolType(this.toolTypesDict[this.toolTypeName]).imageURL;
		}
	},
}
</script>
