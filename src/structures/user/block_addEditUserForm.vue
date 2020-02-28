<template>
	<app-block-add-edit-obj-form
		:existingObj="existingObj"
		:adminView="adminView"
		:objPacket="emptyObjPacket"
		typeString="User"
		@submit-event="submitEvent"
		:setObjPacket="setObjPacket"
	>
		<template v-slot:note>
			<div v-if="newMattermostUser">
				It looks like you're new here - welcome!
				<br />Please fill out these details and your account will be ready to go straight away. If you can't find your team - please go and speak to Mike Reed now!
			</div>
			<div v-if="!newMattermostUser">NOTE: Only an admin can change your Mattermost GUID and team.</div>
		</template>
		<template v-slot:name_input="slotProps">
			<v-text-field
				v-bind="{readonly: userNameIsReadOnly}"
				name="UserName"
				label="Full Name"
				id="user-name"
				v-model="slotProps.objPacket.objData.name"
				:rules="stdRules"
				required
			></v-text-field>
		</template>
		<template v-slot:email_input="slotProps">
			<v-text-field
				v-bind="{readOnly: emailIsReadOnly}"
				name="UserEmail"
				label="Company Email Address"
				id="user-email"
				v-model="slotProps.objPacket.objData.email"
				:rules="emailRules"
				required
				type="email"
			></v-text-field>
		</template>
		<template v-slot:wechat_input="slotProps">
			<v-text-field
				name="UserWechat"
				label="Wechat account ID"
				id="user-wechat"
				v-model="slotProps.objPacket.objData.wechat"
				:rules="stdRules"
				required
			></v-text-field>
		</template>
		<template v-slot:mattermostID_input="slotProps">
			<v-text-field
				v-bind="{readonly: mattermostIsReadOnly}"
				name="UserMattermost"
				label="Mattermost account GUID"
				id="user-mattermost"
				v-model="slotProps.objPacket.objData.mattermostID"
				:rules="stdRules"
				required
			></v-text-field>
		</template>
		<template v-slot:phoneNum_input="slotProps">
			<v-text-field
				name="UserPhone"
				label="Chinese Phone #"
				id="user-phone"
				v-model="slotProps.objPacket.objData.phoneNum"
				:rules="phoneRules"
				required
			></v-text-field>
		</template>
		<template v-slot:lang_input="slotProps">
			<v-select
				name="UserLang"
				:items="availableLangsList"
				label="User Language"
				id="user-lang"
				v-model="slotProps.objPacket.objData.lang"
				:rules="langRules"
				required
			></v-select>
		</template>
		<template v-slot:team_input="slotProps">
			<select-team
				v-model="slotProps.objPacket.objData.team"
				v-bind:readonly="teamIsReadOnly"
				label="Select Team"
				:defaultTeamID="(existingObj ? existingObj.team._id : null)"
			></select-team>
		</template>
		<template v-slot:position_input="slotProps">
			<v-text-field
				v-bind="{readonly: positionIsReadOnly}"
				name="UserPosition"
				label="Team Position"
				id="user-position"
				v-model="slotProps.objPacket.objData.position"
				:rules="stdRules"
				required
			></v-text-field>
		</template>
		<template v-slot:introduction_input="slotProps">
			<v-textarea
				name="UserIntroduction"
				label="Self Introduction"
				id="user-introduction"
				v-model="slotProps.objPacket.objData.introduction"
				hint="A quick introduction about yourself for other HAXers and staff members to see.  eg: 'grew up in Australia, studied nursing in USA, love playing Ultimate frisbee, always keen to chat about web design'."
				:rules="stdRules"
				required
			></v-textarea>
		</template>
	</app-block-add-edit-obj-form>
</template>

<script>
// NOTE that right now there isn't API level protection against someone changing their team credits, just a naive guard of only admins being able to access the 'adminView' of this element.
export default {
	props: ['setObjPacket', 'existingObj', 'adminView', 'newMattermostUser'],
	data() {
		return {
			formIsValid: false,

			emptyObjPacket: {
				objData: {
					name: '',
					email: '',
					wechat: '',
					mattermostID: '',
					phoneNum: '',
					lang: 'English',
					team: '',
					position: '',
					introduction: ''
				},
				objImage: null,
				isValid: null
			},

			teamIsReadOnly: false,
			availableLangsList: ['English', '中文'],
			userNameIsReadOnly: false,
			emailIsReadOnly: false,
			positionIsReadOnly: false,
			mattermostIsReadOnly: false,
			stdRules: [value => !!value || 'Cannot be blank.'],
			emailRules: [
				value => {
					const regexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
					return (
						regexp.test(value) ||
						'Please enter a valid email address.'
					);
				}
			],
			phoneRules: [value => !!value || 'Cannot be blank.'],
			langRules: [
				value =>
					this.availableLangsList.includes(value) ||
					'Please choose a language from the list.'
			]
		};
	},
	computed: {
		loading() {
			return this.$store.getters.loading;
		},
		mattermostDetails() {
			return this.$store.getters.mattermostDetails;
		}
	},
	created() {
		if (!this.adminView) {
			console.log('not admin access');
			this.mattermostIsReadOnly = true;
			this.teamIsReadOnly = true;
		}

		// this.mattermostIsReadOnly = true;
		if (this.newMattermostUser) {
			this.teamIsReadOnly = false;
			this.$store.dispatch('getMattermostDetails').then(() => {
				if (
					this.mattermostDetails.first_name &&
					this.mattermostDetails.last_name
				) {
					this.emptyObjPacket.objData.name =
						this.mattermostDetails.first_name +
						' ' +
						this.mattermostDetails.last_name;
					this.userNameIsReadOnly = true;
				}
				if (this.mattermostDetails.email) {
					this.emptyObjPacket.objData.email = this.mattermostDetails.email;
					this.emailIsReadOnly = true;
				}
				if (this.mattermostDetails.position) {
					this.emptyObjPacket.objData.position = this.mattermostDetails.position;
					this.positionIsReadOnly = true;
				}
				if (this.mattermostDetails.locale === 'zh-CN') {
					this.emptyObjPacket.objData.lang = '中文';
				}
				if (this.mattermostDetails.mattermostImgURL) {
					// TODO: fix passing this in
					// this.userImageURL = this.mattermostDetails.mattermostImgURL;
				}
				if (this.mattermostDetails.id) {
					this.emptyObjPacket.objData.mattermostID = this.mattermostDetails.id;
					this.mattermostIsReadOnly = true;
				}
				return this.$store.dispatch('loadTeams');
			});
		}

		if (this.userLang === 'english') {
			this.userLang = 'English';
		} else if (this.userLang === 'chinese') {
			this.userLang = '中文';
		}
	},
	methods: {
		submitEvent() {
			this.$emit('submit-event');
		}
	}
};
</script>