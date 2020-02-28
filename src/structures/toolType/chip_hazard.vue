<template>
	<v-chip
		pill
		class="mt-2"
		:link="true"
		:to="'/hazards/' + hazard._id"
		:color="((classVal == 1) ? 'red darken-1' : (classVal === 2 ? 'red darken-2' : 'red darken-4'))"
	>
		<v-icon left>{{ hazard.mdiIcon }}</v-icon>
		{{ hazard.name }}
	</v-chip>
</template>

<script>
export default {
	props: ['hazard', 'classVal']
	// :color="(classVal === 1) ? 'success' : (classVal === 2' ? 'warning' : 'error')"
};
</script>
