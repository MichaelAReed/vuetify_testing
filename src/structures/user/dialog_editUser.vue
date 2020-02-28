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
					<v-col cols="1">
						<v-avatar>
							<img :src="user.imageURL" />
						</v-avatar>
					</v-col>
					<v-col cols="10" offset="1">
						<h2 class="primary--text">Editing User:</h2>
						<h3>{{ user.name }}</h3>
					</v-col>
				</v-row>
				<v-divider></v-divider>
				<v-row>
					<v-col cols="10" offset="1">
						<app-block-add-edit-user-form
							:existingUser="user"
							:newMattermostUser="false"
							:adminView="loggedInUser.isAdmin"
							v-on:submit-event="confirmChanges"
							v-on:cancel-event="editDialog = false"
							v-model="userPacket"
						></app-block-add-edit-user-form>
					</v-col>
				</v-row>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: ['user'],
	data() {
		return {
			editDialog: false,
			userPacket: null
		};
	},
	computed: {
		loading() {
			return this.$store.getters.loading;
		},
		loggedInUser() {
			return this.$store.getters.user;
		}
	},
	methods: {
		confirmChanges() {
			this.$store.dispatch('updateUser', {
				objectData: this.userPacket.userData,
				image: this.userPacket.image,
				objectID: this.user._id
			});
		}
	}
};
</script>
