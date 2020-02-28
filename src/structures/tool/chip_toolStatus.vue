<template>
	<v-chip
		pill
		class="mt-2"
		:link="true"
		:to="'/tools/' + tool._id"
		:color="(tool.status === 'ready' && !(tool.checkedOutBy)) ? 'success' : (tool.status === 'broken' ? 'error' : 'warning')"
	>
		<v-icon left>{{ tool.checkedOutBy ? "mdi-checkbox-blank-circle-outline" : (tool.status === 'ready' ? 'mdi-check-circle-outline' : (tool.status === 'repairing' ? 'mdi-tools' : 'mdi-alert-circle')) }}</v-icon>
		<div v-if="displayName">
			{{ tool.name }} -
		</div>
		{{ tool.checkedOutBy ? "Checked Out" : tool.status }}
	</v-chip>
</template>

<script>
export default {
	props: ['tool', 'displayName'],
	computed: {
		toolTypeName() {
			if (this.tool.toolType.name) return this.tool.toolType.name;
			return this.$store.getters.loadedToolType(this.tool.toolType).name;
		}
	}
}
</script>
