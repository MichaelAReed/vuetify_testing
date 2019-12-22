<template>
	<v-chip
		pill
		class="mt-2"
		:color="tool.checkedOutBy ? 'error' : 'success'"
	>
		<v-avatar v-if="tool.checkedOutBy" left>
			<v-img :src="tool.checkedOutBy.imageURL"></v-img>
		</v-avatar>
		<v-icon v-else left>{{ 'mdi-check-circle-outline' }}</v-icon>
		<div v-if="tool.checkedOutBy">
			{{ tool.checkedOutBy.name }}
		</div>
		<div v-else>
			Not checked out
		</div>
	</v-chip>
</template>

<script>
export default {
	props: ['tool']
}
</script>
