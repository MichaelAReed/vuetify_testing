<template>
	<v-container>
		<v-row>
			<v-col cols="12" sm="6" offset-sm="3">
				<h2 class="primary--text">Add a New Team</h2>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12">
				<form ref="createTeamForm" @submit.prevent="onCreateTeam">
					<v-row class="mb-0 mt-0">
						<v-col cols="12" sm="6" offset-sm="3">
							<v-text-field
								name="TeamName"
								label="Team Name"
								id="team-name"
								v-model="teamName"
								:rules="nameRules"
								required
							>
							</v-text-field>
						</v-col>
					</v-row>
					<v-row class="mb-0 mt-0">
						<v-col cols="12" sm="6" offset-sm="3">
							<v-text-field
								name="TeamURL"
								label="Team URL"
								id="team-url"
								v-model="teamURL"
								:rules="urlRules"
								required
							>
							</v-text-field>
						</v-col>
					</v-row>
					<v-row class="mb-0 mt-0">
						<v-col cols="6" sm="3" offset-sm="3">
							<v-text-field
								name="TeamCredits"
								label="Team Credits"
								id="team-credits"
								v-model="teamCredits"
								type="number"
								prefix="¥"
								suffix="RMB"
								:rules="creditsRules"
								required
							>
							</v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" sm="6" offset-sm="3">
							<v-textarea
								name="TeamDescription"
								label="Team Description"
								id="team-description"
								v-model="teamDescription"
								hint="This should be a description of the company that we can share with partners, investors and other external entities."
								:rules="descriptionRules"
								required
							>
							</v-textarea>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" sm="6" offset-sm="3">
							<v-select
								name="TeamStatus"
								:items="teamStatusList"
								label="Team Status"
								id="team-status"
								v-model="teamStatus"
								:rules="statusRules"
								required
							></v-select>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" sm="6" offset-sm="3">
							<v-file-input
								label="Team Logo/Image"
								filled
								show-size
								chips
								accept="image/*"
								prepend-icon="mdi-camera"
								ref="teamImage"
								:rules="imageFileRules"
								:loading="loading"
								@change="onFilePicked"
								required
							></v-file-input>
						</v-col>
					</v-row>
					<v-row v-if="teamImageURL">
						<v-col cols="12" sm="6" offset-sm="3">
							<v-card>
								<v-img :src="teamImageURL" max-height="300" contain></v-img>
								<v-card-title class="title">{{ teamImageName }}</v-card-title>
							</v-card>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" sm="6" offset-sm="3">
							<v-btn
								class="primary"
								:disabled="!formIsValid() || loading"
								:loading="loading"
								type="submit"
							>
								Create Team
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
			teamName: '',
			teamURL: '',
			teamDescription: '',
			teamImageURL: '',
			teamImage: null,
			teamImageName: '',
			teamCredits: 1000,
			teamStatus: '',
			teamStatusList: ['Commenced program', 'App submitted', 'DD', 'Accepted', 'Alumni'],
			statusRules: [
				value => (this.teamStatusList.includes(value)) || 'Please choose a status from the list.'
			],
			nameRules: [
				value => !!value || 'Please enter a Team name.'
			],
			urlRules: [
				value => {
					const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
					return regexp.test(value) || 'Must be a valid URL.';
				}
			],
			descriptionRules: [
				value => !!value || 'Team needs a description.'
			],
			creditsRules: [
				value => {
					if (value) {
						if (value >= 0) {
							return true;
						}
						return 'Must be a positive number';
					}
					return 'Needs an initial value. 0 is valid.';
				}
			],
			imageFileRules: [
				value => {
					if (value) {
						if (value["type"]) {
							if (value["name"]) {
								return (value["type"].split('/')[0] === 'image' && value["name"].lastIndexOf('.') > 0) || 'Requires a valid image file.';
							}
							return "File name not found.";
						}
						return "File type not found.";
					}
					return 'Required.';
				}
			]
		};
	},
	computed: {
		loading() {
			return this.$store.getters.loading;
		}
	},
	methods: {
		formIsValid() {
			if (this.$refs.createTeamForm && this.$refs.createTeamForm.checkValidity) {
				if (this.$refs.teamImage && this.$refs.teamImage.validate) {
// 					console.log(this.$refs.createTeamForm.checkValidity() && this.$refs.teamImage.validate());
					return this.$refs.createTeamForm.checkValidity() && this.$refs.teamImage.validate();
				}
			}
			return false;
		},
		onCreateTeam() {
			if (!this.formIsValid()) {
				this.$store.dispatch('setError', 'Invalid input information.');
				return;
			}
			const teamData = {
				name: this.teamName,
				url: this.teamURL,
				description: this.teamDescription,
				credits: this.teamCredits,
				status: this.teamStatus
			};
			this.$store.dispatch('createTeam', {teamData: teamData, image: this.teamImage});
		},
		onFilePicked(file) {
			if (file) {
				let filename = file.name;
				if (!this.$refs.teamImage.validate()) {
					return;
				}
				const fileReader = new FileReader()
				fileReader.addEventListener('load', () => {
					this.teamImageURL = fileReader.result;
					this.teamImageName = filename;
				})
				fileReader.readAsDataURL(file);
				this.teamImage = file;
			} else {
				this.teamImageURL = '';
				this.teamImage = null;
				this.teamImageName = '';
			}
		}
	}
};
</script>
