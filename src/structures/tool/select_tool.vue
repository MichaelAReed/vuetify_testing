<template>
	<v-container>
		<v-row>
			<v-col cols="2">
				<v-avatar>
					<img :src="toolImageURL"></v-img>
				</v-avatar>
			</v-col>
			<v-col cols="10">
				<v-select
					name="Tool"
					@input="handleInput"
					:items="toolNamesList"
					:label="label"
					id="tool"
					v-model="toolName"
					:rules="toolsListRules"
					required
				></v-select>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	props: ['toolID', 'label', 'followTree', 'toolTypeID', 'defaultToolID', 'onlyRooms', 'onlyUncontainedTools'],
	model: {
		prop: 'toolID',
		event: 'input'
	},
	data () {
		return {
// 			content: 			this.toolTypeID,
			toolName:			null,
			toolNamesList:		[],
			toolsDict:			{},
			toolsListRules:		[
				value => (this.toolNamesList.includes(value)) || 'Please choose a tool from the list.'
			],
		}
	},
	watch: {
		toolTypeID: 				'setToolsLists',
	},
	methods: {
		handleInput (e) {
			this.$emit('input', this.toolsDict[this.toolName]);
		},
		setToolsLists() {
			let toolList = [];
			this.toolNamesList = [];
			this.toolsDict = {};
			var localToolTypeID = this.toolTypeID;
			if (this.onlyRooms) {
				localToolTypeID = this.$store.getters.rootRoomToolType()._id;
			}
			if (localToolTypeID) {
				if (this.followTree) {
					let toolTypeList = this.getChildrenToolTypes(localToolTypeID);
					toolTypeList.push(this.$store.getters.loadedToolType(localToolTypeID));
					for (let toolType of toolTypeList) {
						toolList = toolList.concat(this.$store.getters.loadedToolsOfType(toolType._id));
					}
				} else {
					toolList = this.$store.getters.loadedToolsOfType(localToolTypeID);
				}
			} else {
				toolList = this.$store.getters.loadedTools;
			}
			if (this.onlyUncontainedTools) {
				let containedToolIDs = this.$store.getters.loadedAllContainedToolIDs;
				toolList = toolList.filter(tool => !containedToolIDs.includes(tool._id));
			}
			if (toolList.length > 0) {
				for (let tool of toolList) {
					this.toolNamesList.push(tool['name']);
					this.toolsDict[tool['name']] = tool._id;
					if (this.defaultToolID === tool._id) {
						this.toolName = tool['name'];
					}
				}
				if (!this.defaultToolID) {
					this.toolName = this.toolNamesList[0];
				}
				this.$emit('input', this.toolsDict[this.toolName]);
// 				console.log(this.toolNamesList);
// 				console.log(this.toolsDict);
			}
		},
		getChildrenToolTypes(toolTypeID) {
			let tempList = this.$store.getters.loadedChildrenToolTypes_tool(toolTypeID);
			tempList = tempList.concat(this.$store.getters.loadedChildrenToolTypes_category(toolTypeID));
			var toolType;
			let returnList = tempList;
			for (toolType of tempList) {
				returnList = returnList.concat(this.getChildrenToolTypes(toolType._id));
			}
			return returnList;
		},
	},
	created() {
		if (this.label === null || this.label === undefined) this.label = 'Select Tool';
		this.setToolsLists();
	},
	computed: {
		toolImageURL() {
			if (this.toolNamesList.length > 0) {
				return this.$store.getters.loadedTool(this.toolsDict[this.toolName]).toolType.imageURL;
			} else {
				return "";
			}
		}
	},
}
</script>
