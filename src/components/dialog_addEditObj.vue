<template>
	<v-dialog scrollable max-width="350px" persistent v-model="dialogShown">
		<template v-slot:activator="{ on }">
			<v-btn fab accent v-on="on">
				<v-icon v-if="currentObj">mdi-square-edit-outline</v-icon>
				<v-icon v-if="!currentObj">mdi-shape-rectangle-plus</v-icon>
				<!-- <div v-if="!currentObj">Add New Team</div> -->
			</v-btn>
		</template>
		<v-card>
			<v-card-title>
				<v-container>
					<v-row>
						<v-col cols="2">
							<v-avatar class="mr-2">
								<img v-if="currentObj" :src="currentObj.imageURL" />
								<v-icon v-if="!currentObj">mdi-shape-rectangle-plus</v-icon>
							</v-avatar>
						</v-col>
						<v-col cols="9" offset="1">
							<div v-if="currentObj">
								Editing {{typeString}}:
								<br />
								{{ currentObj.name }}
							</div>
							<div v-if="!currentObj">New {{typeString}}</div>
						</v-col>
					</v-row>
				</v-container>
			</v-card-title>
			<v-divider></v-divider>
			<v-card-text>
				<app-block-add-edit-team-form
					v-if="typeString === 'team'"
					:existingObj="currentObj"
					:adminView="loggedInUser.isAdmin"
					v-on:submit-event="confirmChanges"
					:setObjPacket="setObjPacket"
				></app-block-add-edit-team-form>
				<app-block-add-edit-tool-type-form
					v-if="typeString === 'toolType'"
					:existingObj="currentObj"
					:adminView="loggedInUser.isAdmin"
					v-on:submit-event="confirmChanges"
					:setObjPacket="setObjPacket"
				></app-block-add-edit-tool-type-form>
				<app-block-add-edit-user-form
					v-if="typeString === 'user'"
					:existingObj="currentObj"
					:adminView="loggedInUser && loggedInUser.isAdmin"
					v-on:submit-event="confirmChanges"
					:setObjPacket="setObjPacket"
					:newMattermostUser="newMattermostUser"
				></app-block-add-edit-user-form>
				<!-- <slot
					name="block_addEdit"
					:confirmChanges="confirmChanges"
					:setObjPacket="setObjPacket"
					:currentObj="currentObj"
				></slot>-->
			</v-card-text>
			<v-card-actions>
				<v-btn
					class="primary"
					:disabled="loading || !objPacket || !objPacket.isValid"
					:loading="loading"
					@click="confirmChanges"
				>Save {{typeString}}</v-btn>
				<v-btn @click="cancel">Cancel</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: ['currentObj', 'typeString', 'newMattermostUser'],
	data() {
		return {
			dialogShown: false,
			objPacket: 'tits'
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
			// this.objPacket = event;
			if (this.currentObj) {
				this.objPacket.objID = this.currentObj._id;
				this.$store.dispatch(
					`${this.typeString}Update`,
					this.objPacket
				);
			} else {
				this.objPacket.redirect = true;
				this.$store.dispatch(
					`${this.typeString}Create`,
					this.objPacket
				);
			}
		},
		setObjPacket(packet) {
			this.objPacket = packet;
		},
		cancel() {
			this.dialogShown = false;
		},
		printObjPacket() {
			console.log(this.objPacket);
		}
	},
	created() {
		if (this.newMattermostUser) {
			this.dialogShown = true;
		}
	}
};
</script>
