<template>
	<v-container fluid>
		<v-row wrap class="mb-4">
			<v-col cols="6" class="text-center text-sm-right">
				<v-btn outlined router to="/suppliers" class="primary">
					Explore Suppliers
				</v-btn>
			</v-col>
			<v-col cols="6" class="text-center text-sm-left">
				<v-btn outlined router to="/suppliers/new" class="primary">
					Add New Supplier
				</v-btn>
			</v-col>
		</v-row>
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
		<v-row v-if="!loading">
			<v-col cols="12" sm="10" offset-sm="1">
				<v-carousel cycle style="cursor: pointer">
					<v-carousel-item
						v-for="supplier in suppliers"
						:src="supplier.imageURL"
						:key="supplier.id"
						@click="onLoadSupplier(supplier.id)"
					>
						<v-row class="fill-height" align="center" justify="center">
							<div class="carousel-title">{{ supplier.name }}</div>
						</v-row>
					</v-carousel-item>
				</v-carousel>
			</v-col>
		</v-row>
		<v-row class="mt-4">
			<v-col xs12 class="text-center">
				<p>Welcome to the HAX Dash!</p>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	computed: {
		suppliers() {
			return this.$store.getters.featuredSuppliers;
		},
		loading() {
			return this.$store.getters.loading;
		}
	},
	methods: {
		onLoadSupplier(id) {
			this.$router.push('/suppliers/' + id);
		}
	}
};
</script>

<style scoped>
.carousel-title {
	background-color: rgba(0, 0, 0, 0.5);
	color: white;
	font-size: 2em;
	padding: 20px;
}
</style>
