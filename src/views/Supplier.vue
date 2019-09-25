<template>
	<v-container>
		<v-row>
			<v-col cols="12" class="text-center">
				<v-progress-circular
					indeterminate
					class="primary--text"
					:width="7"
					:size="70"
					v-if="loading"
				>
				</v-progress-circular>
			</v-col>
		</v-row>
		<v-row justify="space-around" v-if="!loading">
			<v-col cols="12" sm="10" md="8">
				<v-card>
					<v-card-title>
						<h3>{{ supplier.name }}</h3>
					</v-card-title>
					<v-img
						class="white--text"
						height="400px"
						:src="supplier.imageURL"
					>
					</v-img>
					<v-card-text>
						<div class="info--text">
							Location: {{ supplier.location }}
						</div>
						<div class="info--text">
							Last Reviewed: {{ supplier.date | date}}
						</div>
						<div>
							{{ supplier.description }}
						</div>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn class="primary">Provide a Review</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	props: ['id'],
	computed: {
		supplier() {
			return this.$store.getters.loadedSupplier(this.id);
		},
		loading() {
			return this.$store.getters.loading;
		}
	}
};
</script>
