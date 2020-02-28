<template>
	<app-block-add-edit-obj-form
		:existingObj="existingObj"
		:adminView="adminView"
		:objPacket="emptyObjPacket"
		typeString="Team"
		@submit-event="submitEvent"
		:setObjPacket="setObjPacket"
	>
		<template v-slot:note>NOTE: Only an admin can change your credits... you sneaky little so and so.</template>
		<template v-slot:name_input="slotProps">
			<v-text-field
				name="TeamName"
				label="Team Name Test"
				id="team-name"
				v-model="slotProps.objPacket.objData.name"
				:rules="nameRules"
				required
			></v-text-field>
		</template>
		<template v-slot:url_input="slotProps">
			<v-text-field
				name="TeamURL"
				label="Team URL"
				id="team-url"
				v-model="slotProps.objPacket.objData.url"
				:rules="urlRules"
				required
			></v-text-field>
		</template>
		<template v-slot:credits_input="slotProps">
			<v-text-field
				name="TeamCredits"
				label="Team Credits"
				id="team-credits"
				v-model="slotProps.objPacket.objData.credits"
				v-bind:readonly="creditsIsReadOnly"
				type="number"
				prefix="¥"
				suffix="RMB"
				:rules="creditsRules"
				required
			></v-text-field>
		</template>
		<template v-slot:description_input="slotProps">
			<v-textarea
				name="TeamDescription"
				label="Team Description"
				id="team-description"
				v-model="slotProps.objPacket.objData.description"
				hint="This should be a description of the company that we can share with partners, investors and other external entities."
				:rules="descriptionRules"
				required
			></v-textarea>
		</template>
		<template v-slot:status_input="slotProps">
			<v-select
				name="TeamStatus"
				:items="teamStatusList"
				label="Team Status"
				id="team-status"
				v-model="slotProps.objPacket.objData.status"
				:rules="statusRules"
				required
			></v-select>
		</template>
	</app-block-add-edit-obj-form>
</template>

<script>
// NOTE that right now there isn't API level protection against someone changing their team credits, just a naive guard of only admins being able to access the 'adminView' of this element.
export default {
	props: ['setObjPacket', 'existingObj', 'adminView'],
	data() {
		return {
			formIsValid: false,
			creditsIsReadOnly: true,

			emptyObjPacket: {
				objData: {
					name: '',
					url: '',
					description: '',
					credits: 1000,
					status: ''
				},
				objImage: null,
				isValid: null
			},

			teamStatusList: [
				'Commenced program',
				'App submitted',
				'DD',
				'Accepted',
				'Alumni'
			],
			statusRules: [
				value =>
					this.teamStatusList.includes(value) ||
					'Please choose a status from the list.'
			],
			nameRules: [value => !!value || 'Please enter a Team name.'],
			urlRules: [
				value => {
					const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
					return regexp.test(value) || 'Must be a valid URL.';
				}
			],
			descriptionRules: [value => !!value || 'Team needs a description.'],
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
			]
		};
	},
	computed: {
		loading() {
			return this.$store.getters.loading;
		}
	},
	created() {
		if (this.adminView) {
			this.creditsIsReadOnly = false;
		} else {
			console.log('not admin access');
		}
	},
	methods: {
		submitEvent() {
			this.$emit('submit-event');
		}
	}
};
</script>