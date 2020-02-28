<template>
	<v-chip
		pill
		class="mt-2"
		:link="true"
		:to="'/users/' + user._id"
	>
		<v-avatar left>
		<v-img :src="user.imageURL"></v-img>
		</v-avatar>
		{{ user.name }}
	</v-chip>
</template>

<script>
export default {
	props: ['user']
}
</script>
