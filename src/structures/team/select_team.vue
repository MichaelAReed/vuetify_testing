<template>
	<v-container>
		<v-row>
			<v-col cols="2">
				<v-avatar>
					<img :src="teamImageURL" />
				</v-avatar>
			</v-col>
			<v-col cols="9" offset="1">
				<v-select
					v-bind="{readonly: readonly}"
					name="Team"
					@input="handleInput"
					:items="teamNamesList"
					:label="label"
					id="team"
					v-model="teamName"
					:rules="teamsListRules"
					required
				></v-select>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	props: ['teamID', 'label', 'defaultTeamID', 'readonly'],
	model: {
		prop: 'teamID',
		event: 'input'
	},
	data() {
		return {
			teamName: null,
			teamNamesList: [],
			teamsDict: {},
			teamsListRules: [
				value =>
					this.teamNamesList.includes(value) ||
					"If you can't find your team, please speak to an admin."
			]
		};
	},
	watch: {
		loadedTeams: 'setTeams'
	},
	methods: {
		handleInput() {
			this.$emit('input', this.teamsDict[this.teamName]);
		},
		setTeams() {
			for (let team of this.loadedTeams) {
				this.teamNamesList.push(team['name']);
				this.teamsDict[team['name']] = team._id;
				if (this.defaultTeamID === team._id) {
					this.teamName = team['name'];
				}
			}
			if (!this.teamName) {
				this.teamName = this.teamNamesList[0];
			}
			this.$emit('input', this.teamsDict[this.teamName]);
			// console.log('Setting teams...');
		}
	},
	created() {
		if (this.label === null || this.label === undefined)
			this.label = 'Team';

		this.setTeams();
	},
	computed: {
		teamImageURL() {
			if (!this.teamName) return '';
			return this.$store.getters.loadedTeam(this.teamsDict[this.teamName])
				.imageURL;
		},
		loadedTeams() {
			return this.$store.getters.loadedTeams;
		}
	}
};
</script>
