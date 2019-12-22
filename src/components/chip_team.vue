<template>
	<v-chip
		pill
		:link="true"
		:to="'/teams/' + team._id"
	>
		<v-avatar left>
			<v-img :src="team.imageURL"></v-img>
		</v-avatar>
		{{ team.name }}
		{{ (showCredits ? " | " : "") }}
		{{ (showCredits ? team.credits : "") }}
	</v-chip>
</template>

<script>
export default {
	props: ['team', 'showCredits']
}
</script>
