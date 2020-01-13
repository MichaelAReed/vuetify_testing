<template>
	<v-container>
		<v-row>
			<v-col cols="12" sm="6" offset-sm="3">
				<h2 class="primary--text">Add a New Supplier</h2>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12">
				<form @submit.prevent="onCreateSupplier">
					<v-row class="mb-0 mt-0">
						<v-col cols="12" sm="6" offset-sm="3">
							<v-text-field
								name="supplierName"
								label="Supplier Name"
								id="supplier-name"
								v-model="supplierName"
								required
							>
							</v-text-field>
						</v-col>
					</v-row>
					<v-row class="mb-0 mt-0">
						<v-col cols="12" sm="6" offset-sm="3">
							<v-text-field
								name="supplierURL"
								label="Supplier URL"
								id="supplier-url"
								v-model="supplierURL"
								required
							>
							</v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" sm="6" offset-sm="3">
							<v-text-field
								name="supplierLocation"
								label="Supplier Location"
								id="supplier-location"
								v-model="supplierLocation"
								required
							>
							</v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" sm="6" offset-sm="3">
							<v-textarea
								name="supplierDescription"
								label="Supplier Description"
								id="supplier-description"
								v-model="supplierDescription"
								hint="Describe the services the supplier provides as well as any important information like 'Can accept USD payments'"
								clearable
								required
							>
							</v-textarea>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" sm="6" offset-sm="3">
							<v-file-input
								label="Supplier Main Image"
								filled
								show-size
								chips
								accept="image/*"
								prepend-icon="mdi-camera"
								@change="onFilePicked"
							></v-file-input>
						</v-col>
					</v-row>
					<v-row v-if="supplierImageURL">
						<v-col cols="12" sm="6" offset-sm="3">
							<v-card>
								<v-img :src="supplierImageURL" max-height="300" contain></v-img>
								<v-card-title class="title">{{ supplierImageName }}</v-card-title>
							</v-card>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" sm="6" offset-sm="3">
							tags, url, description, private/public,
							Contact people -> name, position, email, phone, wechat,
							requires introduction
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" sm="6" offset-sm="3">
							<h4>Choose a Date and Time</h4>
						</v-col>
					</v-row>
					<v-row class="mb-2">
						<v-col cols="12" sm="6" offset-sm="3">
							<v-date-picker v-model="date" format="24hr"></v-date-picker>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" sm="6" offset-sm="3">
							<v-time-picker v-model="time"></v-time-picker>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" sm="6" offset-sm="3">
							<v-btn
								class="primary"
								:disabled="!formIsValid || loading"
								:loading="loading"
								type="submit"
							>
								Create Supplier
							</v-btn>
						</v-col>
					</v-row>
				</form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			supplierName: '',
			supplierURL: '',
			supplierLocation: '',
			supplierDescription: '',
			supplierImageURL: '',
			supplierImage: null,
			supplierImageName: '',
			date: new Date().toISOString().substr(0, 10),
			time: new Date()
		};
	},
	computed: {
		formIsValid() {
			return (
				this.supplierName.trim() !== '' &&
				this.supplierURL.trim() !== '' &&
				this.supplierLocation.trim() !== '' &&
				this.supplierDescription.trim() !== '' &&
				this.supplierImageURL.trim() !== ''
			);
		},
		submittableDateTime() {
			const date = new Date(this.date);
			let hours = 0;
			let minutes = 0;
			if (typeof this.time === 'string') {
				hours = this.time.match(/(\d+)/)[1];
				minutes = this.time.match(/:(\d+)/)[1];
			} else {
				hours = this.time.getHours();
				minutes = this.time.getMinutes();
			}
			date.setHours(hours);
			date.setMinutes(minutes);
			return date;
		},
		loading() {
			return this.$store.getters.loading;
		},
	},
	methods: {
		onCreateSupplier() {
			if (!this.formIsValid) {
				this.$store.dispatch('setError', 'Invalid input information.');
				return;
			}
			if (!this.supplierImage) {
				this.$store.dispatch('setError', 'No image input.');
				return;
			}
			const supplierData = {
				name: 			this.supplierName,
				url: 			this.supplierURL,
				location: 		this.supplierLocation,
				description: 	this.supplierDescription,
				lastUpdated: 	this.submittableDateTime
			};
			this.$store.dispatch('createSupplier', {supplierData: supplierData, image: this.supplierImage, redirect: true});
		},
		onFilePicked(file) {
			let filename = file.name;
			if (filename.lastIndexOf('.') <= 0) {
				return alert('Please add a valid file!');
			}
			const fileReader = new FileReader()
			fileReader.addEventListener('load', () => {
				this.supplierImageURL = fileReader.result;
				this.supplierImageName = filename;
			})
			fileReader.readAsDataURL(file);
			this.supplierImage = file;
		}
	}
};
</script>
