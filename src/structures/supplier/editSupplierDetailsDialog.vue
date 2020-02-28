<template>
	<v-dialog width="350px" persistent v-model="editDialog">
		<template v-slot:activator="{ on }">
			<v-btn fab accent v-on="on">
				<v-icon>mdi-square-edit-outline</v-icon>
			</v-btn>
		</template>
		<v-card>
			<v-container>
				<v-row>
					<v-col cols="12">
						<v-card-title>Edit Supplier</v-card-title>
					</v-col>
				</v-row>
				<v-divider></v-divider>
				<v-row>
					<v-col cols="12">
						<v-card-text>
							<v-text-field
								name="supplierName"
								label="Supplier Name"
								id="supplier-name"
								v-model="editedSupplierName"
								required
							>
							</v-text-field>
							<v-text-field
								name="supplierURL"
								label="Supplier URL"
								id="supplier-url"
								v-model="editedSupplierURL"
								required
							>
							</v-text-field>
							<v-text-field
								name="supplierLocation"
								label="Supplier Location"
								id="supplier-location"
								v-model="editedSupplierLocation"
								required
							>
							</v-text-field>
							<v-textarea
								name="supplierDescription"
								label="Supplier Description"
								id="supplier-description"
								v-model="editedSupplierDescription"
								hint="Describe the services the supplier provides as well as any important information like 'Can accept USD payments'"
								clearable
								required
							>
							</v-textarea>
						</v-card-text>
					</v-col>
				</v-row>
				<v-divider></v-divider>
				<v-row>
					<v-col cols="12">
						<v-card-actions>
							<v-btn @click="onSaveChanges">Save</v-btn>
							<v-btn @click="editDialog = false">Cancel</v-btn>
						</v-card-actions>
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
			editedSupplierName: this.supplier.name,
			editedSupplierURL: this.supplier.url,
			editedSupplierLocation: this.supplier.location,
			editedSupplierDescription: this.supplier.description
		};
	},
	computed: {
		formIsValid() {
			return (
				this.editedSupplierName.trim() !== '' &&
				this.editedSupplierURL.trim() !== '' &&
				this.editedSupplierLocation.trim() !== '' &&
				this.editedSupplierDescription.trim() !== ''
			);
		}
	},
	methods: {
		onSaveChanges() {
			if (!this.formIsValid) {
				return;
			}
			this.editDialog = false;
			const supplierData = {
				id: this.supplier.id,
				name: this.editedSupplierName,
				url: this.editedSupplierURL,
				location: this.editedSupplierLocation,
				description: this.editedSupplierDescription
			};
			console.log(supplierData);
			this.$store.dispatch('updateSupplierData', supplierData);
		}
	}
}
</script>
