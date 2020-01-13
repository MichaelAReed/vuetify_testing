<template>
	<v-card>
		<v-card-title>
			Records
		</v-card-title>
		<v-card-text>
			<v-container>
				<v-row v-for="record in records" class="mt-n5 mb-n5">
					<v-col cols="12">
					<span>
						{{ record.interactedType }} {{ record.interaction }} at {{ record.dateTime | date }} by {{ getInteractorName(record.interactorID) }}
					</span>
					<span v-if="record.interactionInfo.name">
						, Name: {{ record.interactionInfo.name }}
					</span>
					</v-col>
				</v-row>
			</v-container>
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	props: ['records'],
	computed: {
	},
	methods: {
		getInteractorName(interactorID) {
			var user = this.$store.getters.loadedUser(interactorID)
			if (user) return user.name;
			return "Auto Admin";
		}
	},
}
</script>
