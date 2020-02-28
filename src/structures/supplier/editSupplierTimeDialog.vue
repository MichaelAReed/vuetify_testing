<template>
	<v-dialog width="350px" persistent v-model="editDialog">
		<template v-slot:activator="{ on }">
			<v-btn accent v-on="on">
				Edit Time
			</v-btn>
		</template>
		<v-card>
			<v-container>
				<v-row>
					<v-col cols="12">
						<v-card-title>Edit Supplier Time</v-card-title>
					</v-col>
				</v-row>
				<v-divider></v-divider>
				<v-row>
					<v-col cols="12">
						<v-time-picker v-model="editableTime" full-width format="24hr">
							<v-btn @click="onSaveChanges">Save</v-btn>
							<v-btn @click="editDialog = false">Cancel</v-btn>
						</v-time-picker>
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
			editableTime: null
		};
	},
	computed: {
		formIsValid() {
			return true
		}
	},
	created () {
 		//this.editableTime = new Date(this.supplier.date).toTimeString();
		this.editableTime = new Date(this.supplier.date).getHours() + ':' + new Date(this.supplier.date).getMinutes();
	},
	methods: {
		onSaveChanges() {
			if (!this.formIsValid) {
				return;
			}
			this.editDialog = false;
			const newDate = new Date(this.supplier.date);
			const newHours = this.editableTime.match(/(\d+)/)[1];
			const newMinutes = this.editableTime.match(/:(\d+)/)[1];
			newDate.setHours(newHours);
			newDate.setMinutes(newMinutes);
			this.$store.dispatch('updateSupplierData', {
				id: this.supplier.id,
				date: newDate
			});
		}
	}
};
</script>
