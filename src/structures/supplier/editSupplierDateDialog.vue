<template>
	<v-dialog width="350px" persistent v-model="editDialog">
		<template v-slot:activator="{ on }">
			<v-btn accent v-on="on">
				Edit Date
			</v-btn>
		</template>
		<v-card>
			<v-container>
				<v-row>
					<v-col cols="12">
						<v-card-title>Edit Supplier Date</v-card-title>
					</v-col>
				</v-row>
				<v-divider></v-divider>
				<v-row>
					<v-col cols="12">
						<v-date-picker v-model="editableDate" full-width>
							<v-btn @click="onSaveChanges">Save</v-btn>
							<v-btn @click="editDialog = false">Cancel</v-btn>
						</v-date-picker>
					</v-col>
				</v-row>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: ['supplier'],
	data() {
		return {
			editDialog: false,
			editableDate: null
		};
	},
	computed: {
		formIsValid() {
			return true
		}
	},
	created () {
		this.editableDate = new Date(this.supplier.date).toJSON().substr(0, 10);
	},
	methods: {
		onSaveChanges() {
			if (!this.formIsValid) {
				return;
			}
			this.editDialog = false;
			const newDate = new Date(this.supplier.date);
			const newDay = new Date(this.editableDate).getUTCDate();
			const newMonth = new Date(this.editableDate).getUTCMonth();
			const newYear = new Date(this.editableDate).getUTCFullYear();
			newDate.setUTCDate(newDay);
			newDate.setUTCMonth(newMonth);
			newDate.setUTCFullYear(newYear);
			this.$store.dispatch('updateSupplierData', {
				id: this.supplier.id,
				date: newDate
			});
		}
	}
}
</script>
