<template>
	<v-container>
		<v-row>
			<v-col cols="12" sm="6" offset-sm="3" class="primary--text">
				<h2>Welcome! It looks like you're new</h2>
				<br />You should see a popup dialog appear to help you make your account shortly...
				<br />Click the button below to open the dialog again.
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" sm="6" offset-sm="3">
				<app-dialog-add-edit-obj :newMattermostUser="true" typeString="user"></app-dialog-add-edit-obj>
				<!-- <app-block-add-edit-user-form
					:newMattermostUser="true"
					v-on:submit-event="confirmChanges"
					v-on:cancel-event="cancel"
					v-model="userPacket"
				></app-block-add-edit-user-form>-->
			</v-col>
		</v-row>
	</v-container>
</template>


<script>
export default {
	props: [],
	data() {
		return {};
	},
	computed: {
		loading() {
			return this.$store.getters.loading;
		}
	}
};
</script>