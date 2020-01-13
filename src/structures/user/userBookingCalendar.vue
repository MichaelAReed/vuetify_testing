<template>
	<v-card>
		<v-container>
			<v-row>
				<v-col cols="1">
					<v-avatar>
						<img :src="tool.toolType.imageURL"></v-img>
					</v-avatar>
				</v-col>
				<v-col cols="10" offset="1">
					<v-card-title>{{ tool.name }} - New Booking </v-card-title>
				</v-col>
			</v-row>
			<v-row v-if="loading">
				<v-col cols="12" class="text-center">
					<v-progress-circular
						indeterminate
						class="primary--text"
						:width="7"
						:size="70"
					>
					</v-progress-circular>
				</v-col>
			</v-row>
			<v-row>
				<v-divider></v-divider>
				<v-btn
					fab
					outlined
					small
					absolute
					left
					color="primary"
					@click="prev"
				>
					<v-icon dark>mdi-chevron-left</v-icon>
				</v-btn>
				<v-btn
					fab
					outlined
					small
					absolute
					right
					color="primary"
					@click="next"
				>
					<v-icon dark>mdi-chevron-right</v-icon>
				</v-btn>
				<br>
			</v-row>
			<v-row>
				<v-card-text>
					<v-sheet height="400" >
						<v-calendar
							ref="calendar"
							v-model="displayStartDay"
							:events="bookings"
							color="primary"
							type="4day"
							event-color="primary"
							@click:event="showEvent"
						>
						</v-calendar>
						<v-menu
							v-model="selectedOpen"
							:close-on-content-click="false"
							:activator="selectedElement"
							full-width
							offset-x
						>
							<v-card
								color="grey lighten-4"
								min-width="250px"
								flat
							>
								<v-toolbar
								:color="selectedEvent.color"
								dark
								>
									<v-btn
										v-if="loggedInUser.name === selectedEvent.name || loggedInUser.isAdmin"
										@click="deleteBooking"
										icon
									>
										<v-icon>mdi-delete-forever</v-icon>
									</v-btn>
									<v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
									<v-spacer></v-spacer>
								</v-toolbar>
								<v-card-text class="black--text">
									<app-chip-user
										:user="selectedEvent.user"
									>
									</app-chip-user>
									<br>
									<app-chip-toolStatus
										:displayName=true
										:tool="selectedEvent.tool"
									>
									</app-chip-toolStatus>
									<br>
									<span>Start: {{ selectedEvent.start }}</span>
									<br>
									<span>End: {{ selectedEvent.end }}</span>
								</v-card-text>
							</v-card>
						</v-menu>
					</v-sheet>
				</v-card-text>
			</v-row>
			<v-divider></v-divider>
			<v-row>
				<v-col cols="12">
					<v-card-actions>
						<v-btn v-if="newStart" @click="onSaveChanges">Save New Booking</v-btn>
					</v-card-actions>
				</v-col>
			</v-row>
		</v-container>
	</v-card>
</template>

<script>
export default {
	props: ['tool'],
	data() {
		return {
			editDialog: 		false,
			displayStartDay: 	new Date().toISOString().substring(0,10),
			newStart:			null,
			newEnd:				null,
			trackingEnd:		false,
			selectedOpen: 		false,
			selectedEvent: 		{},
			selectedElement: 	null,
		};
	},
	computed: {
		loading() {
			return this.$store.getters.loading;
		},
		bookings() {
			let array = this.$store.getters.loadedBookingsOfTool(this.tool._id);
			if (this.newStart && this.newEnd) array.push({start: this.newStart, end: this.newEnd, name: "New Booking"});
			return array;
		},
		loggedInUser() {
			return this.$store.getters.user;
		}
	},
	methods: {
		onSaveChanges() {
			const bookingData = {
				start: 			new Date(this.newStart),
				end: 			new Date(this.newEnd),
				toolID:			this.tool._id
			};
			this.$store.dispatch('createBooking', {bookingData: bookingData});
		},
		deleteBooking() {
// 			console.log(this.selectedEvent._id);
			this.$store.dispatch('deleteBooking', this.selectedEvent._id);
		},
		showEvent ({ nativeEvent, event }) {
			const open = () => {
				this.selectedEvent = event
				this.selectedElement = nativeEvent.target
				setTimeout(() => this.selectedOpen = true, 10)
			}

			if (this.selectedOpen) {
			this.selectedOpen = false
			setTimeout(open, 10)
			} else {
			open()
			}
			nativeEvent.stopPropagation()
		},
		prev() {
			this.$refs.calendar.prev();
		},
		next() {
			this.$refs.calendar.next();
		},
	},
	mounted () {
		if (this.$refs.calendar) this.$refs.calendar.scrollToTime('08:00');
	},
}
</script>
