<template>
	<v-container>
		<v-row>
			<v-col cols="12" sm="6" offset-sm="3">
				<h2 class="primary--text">Add a New User</h2>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12">
				<form ref="createUserForm" @submit.prevent="onCreateUser">
					<v-row class="mb-0 mt-0">
						<v-col cols="12" sm="6" offset-sm="3">
							<v-text-field
								name="UserName"
								label="Full Name"
								id="user-name"
								v-model="userName"
								:rules="stdRules"
								required
							>
							</v-text-field>
						</v-col>
					</v-row>
					<v-row class="mb-0 mt-0">
						<v-col cols="12" sm="6" offset-sm="3">
							<v-text-field
								name="UserEmail"
								label="Company Email Address"
								id="user-email"
								v-model="userEmail"
								:rules="emailRules"
								required
								type="email"
							>
							</v-text-field>
						</v-col>
					</v-row>
					<v-row class="mb-0 mt-0">
						<v-col cols="12" sm="6" offset-sm="3">
							<v-text-field
								name="UserWechat"
								label="Wechat account ID"
								id="user-wechat"
								v-model="userWechat"
								:rules="stdRules"
								required
							>
							</v-text-field>
						</v-col>
					</v-row>
					<v-row class="mb-0 mt-0">
						<v-col cols="12" sm="6" offset-sm="3">
							<v-text-field
								name="UserMattermost"
								label="Mattermost account ID"
								id="user-mattermost"
								v-model="userMattermost"
								:rules="stdRules"
								required
							>
							</v-text-field>
						</v-col>
					</v-row>
					<v-row class="mb-0 mt-0">
						<v-col cols="12" sm="6" offset-sm="3">
							<v-text-field
								name="UserPhone"
								label="Chinese Phone #"
								id="user-phone"
								v-model="userPhone"
								:rules="phoneRules"
								required
							>
							</v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" sm="6" offset-sm="3">
							<v-select
								name="UserLang"
								:items="availableLangsList"
								label="User Language"
								id="user-lang"
								v-model="userLang"
								:rules="langRules"
								required
							></v-select>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="1" sm="1" offset-sm="3">
							<v-avatar>
								<img :src="teamImageURL"></v-img>
							</v-avatar>
						</v-col>
						<v-col cols="11" sm="5">
							<v-select
								name="UserTeam"
								:items="teamsList"
								label="User Team"
								id="userTeam"
								v-model="userTeam"
								:rules="teamRules"
								chips
								required
							>
							</v-select>
						</v-col>
					</v-row>
					<v-row class="mb-0 mt-0">
						<v-col cols="12" sm="6" offset-sm="3">
							<v-text-field
								name="UserPosition"
								label="Team Position"
								id="user-position"
								v-model="userPosition"
								:rules="stdRules"
								required
							>
							</v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" sm="6" offset-sm="3">
							<v-textarea
								name="UserIntroduction"
								label="Self Introduction"
								id="user-introduction"
								v-model="UserIntroduction"
								hint="A quick introduction about yourself for other HAXers and staff members to see.  eg: 'grew up in Australia, studied nursing in USA, love playing Ultimate frisbee, always keen to chat about web design'."
								:rules="stdRules"
								required
							>
							</v-textarea>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" sm="6" offset-sm="3">
							<v-file-input
								label="User Profile Image"
								filled
								show-size
								chips
								accept="image/*"
								prepend-icon="mdi-camera"
								ref="userImage"
								:rules="imageFileRules"
								:loading="loading"
								@change="onFilePicked"
								required
							></v-file-input>
						</v-col>
					</v-row>
					<v-row v-if="userImageURL">
						<v-col cols="12" sm="6" offset-sm="3">
							<v-card>
								<v-img :src="userImageURL" max-height="300" contain></v-img>
								<v-card-title class="title">{{ userImageName }}</v-card-title>
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
								Create User
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
	props: ['teamID'],
	data() {
		return {
			userName: 'Katie Chen',
			userEmail: 'katie@katie.katie',
			userWechat: 'katie.chen',
			userMattermost: 'uchu_katie.chen',
			userPhone: '13924594140',
			userLang: '中文',
			userTeam: '',
			userPosition: 'User Researcher',
			UserIntroduction: 'Katie is not smelly.',
			userImageURL: '',
			userImage: null,
			userImageName: '',
			teamsList: [],
			teamsListDict: {},
			availableLangsList: ['English', '中文'],
			stdRules: [
				value => !!value || 'Cannot be blank.'
			],
			emailRules: [
				value => {
					const regexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
					return regexp.test(value) || 'Please enter a valid email address.';
				}
			],
			phoneRules: [
				value => !!value || 'Cannot be blank.'
			],
			langRules: [
				value => (this.availableLangsList.includes(value)) || 'Please choose a language from the list.'
			],
			teamRules: [
				value => (this.teamsList.includes(value)) || "If you can't find the team, please make a new team."
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
		teamImageURL() {
			return this.$store.getters.loadedTeam(this.teamsListDict[this.userTeam]).imageURL;
		},
		loading() {
			return this.$store.getters.loading;
		}
	},
	created() {
		for (let team of this.$store.getters.loadedTeams) {
			this.teamsList.push(team['name']);
			this.teamsListDict[team['name']] = team._id;
			if (this.teamID === team._id) {
				this.userTeam = team['name'];
			}
		}
		if (!this.teamID) {
			this.userTeam = this.teamsList[0];
		}
	},
	methods: {
		formIsValid() {
			if (this.$refs.createUserForm && this.$refs.createUserForm.checkValidity) {
				if (this.$refs.userImage && this.$refs.userImage.validate) {
					return this.$refs.createUserForm.checkValidity() && this.$refs.userImage.validate();
				}
			}
			return false;
		},
		onCreateUser() {
			if (!this.formIsValid()) {
				this.$store.dispatch('setError', 'Invalid input information.');
				return;
			}
			const userData = {
				name: this.userName,
				email: this.userEmail,
				wechat: this.userWechat,
				mattermostID: this.userMattermost,
				phoneNum: this.userPhone,
				lang: this.userLang,
				team: this.teamsListDict[this.userTeam],
				position: this.userPosition,
				introduction: this.UserIntroduction
			};
			this.$store.dispatch('createUser', {userData: userData, image: this.userImage, redirect: true});
		},
		onFilePicked(file) {
			if (file) {
				let filename = file.name;
				if (!this.$refs.userImage.validate()) {
					return;
				}
				const fileReader = new FileReader()
				fileReader.addEventListener('load', () => {
					this.userImageURL = fileReader.result;
					this.userImageName = filename;
				})
				fileReader.readAsDataURL(file);
				this.userImage = file;
			} else {
				this.userImageURL = '';
				this.userImage = null;
				this.userImageName = '';
			}
		}
	}
};
</script>
