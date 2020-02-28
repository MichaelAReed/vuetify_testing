<template>
	<v-chip
		pill
		class="mt-2"
		:link="true"
		:to="'/toolTypes/' + toolTypeID"
		:color="toolType.userHasPermission == true ? 'success' : (toolType.userHasPermission == false ? 'error' : 'warning')"
	>
		<v-icon left>{{ toolType.userHasPermission == true ? "mdi-check-circle-outline" : (toolType.userHasPermission == false ? "mdi-block-helper" : "mdi-checkbox-blank-circle-outline") }}</v-icon>
		{{ toolType.userHasPermission == true ? "Permitted" : (toolType.userHasPermission == false ? "Banned" : (toolType.userHasRequestedPermission ? "Request Pending" : "Not permitted")) }}
	</v-chip>
</template>

<script>
export default {
	props: ['toolTypeID'],
	computed: {
		toolType() {
			return this.$store.getters.loadedToolType(this.toolTypeID);
		}
	},
}
</script>
