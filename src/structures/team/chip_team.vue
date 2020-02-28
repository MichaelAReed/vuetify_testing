<template>
	<v-chip pill :link="true" :to="'/teams/' + team._id">
		<v-avatar left>
			<v-img v-if="!showCredits" :src="team.imageURL"></v-img>
			<v-icon v-if="showCredits">mdi-currency-cny</v-icon>
		</v-avatar>
		{{ (showCredits ? `${team.credits}RMB` : team.name) }}
	</v-chip>
</template>

<script>
export default {
	props: ['team', 'showCredits']
};
</script>
