<template>
	<v-dialog width="400px" persistent v-model="editDialog">
		<template v-slot:activator="{ on }">
			<v-btn v-on="on">
				Add Booking
			</v-btn>
		</template>
		<v-card>
			<v-container>
				<v-row>
					<v-col cols="1">
						<v-avatar>
							<img :src="tool.toolType.imageURL"></v-img>
						</v-avatar>
					</v-col>
					<v-col cols="10" offset="1">
						<v-card-title>{{ tool.toolType.name }} # {{ tool.nameNum }} - New Booking </v-card-title>
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
								@mousedown:time="calendarMouseDown"
								@contextmenu:time="calendarMouseDown"
								@mousemove:time="calendarMouseMove"
								@mouseup:time="calendarMouseUp"
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
										<span>Start: {{ selectedEvent.start }}</span>
										<br>
										<span>End: {{ selectedEvent.end }}</span>
									</v-card-text>
									<v-card-actions>
										<v-btn
											text
											color="secondary"
											@click="selectedOpen = false"
										>
											Cancel
										</v-btn>
									</v-card-actions>
								</v-card>
							</v-menu>
						</v-sheet>
					</v-card-text>
				</v-row>
				<v-divider></v-divider>
				<v-row>
					<v-col cols="12">
						<v-card-actions>
							<v-btn @click="onSaveChanges">Save</v-btn>
							<v-btn @click="editDialog = false">Cancel</v-btn>
						</v-card-actions>
					</v-col>
				</v-row>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: ['tool', 'user'],
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
		formIsValid() {
			return true;
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
			if (!this.formIsValid) {
				return;
			}
			this.editDialog = false;
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
		calendarMouseDown(event) {
			this.trackingEnd = true;
			if (event.minute < 15) event.minute = 0;
			else if (event.minute < 45) event.minute = 30;
			else {
				event.minute = 0;
				event.hour++;
			}
			this.newStart = event.year + "-" + event.month + "-" + event.day + " " + event.hour + ":" + event.minute + ":00";
// 			this.newEnd = event.year + "-" + event.month + "-" + event.day + " " + (event.hour+1) + ":" + event.minute + ":00";
// 			this.newStart = new Date(event.year, event.month, event.day, event.hour, event.minute, 0, 0)
		},
		calendarMouseMove(event) {
			if (this.trackingEnd) {
				if (event.minute < 15) event.minute = 0;
				else if (event.minute < 45) event.minute = 30;
				else {
					event.minute = 0;
					event.hour++;
				}
				this.newEnd = event.year + "-" + event.month + "-" + event.day + " " + event.hour + ":" + event.minute + ":00";
				let startDate = new Date(this.newStart);
				let endDate = new Date(this.newEnd);
				if (startDate > endDate) {
					let swapBuffer = this.newStart;
					this.newStart = this.newEnd;
					this.newEnd = swapBuffer;
				}
			}
// 			this.newEnd = new Date(event.year, event.month, event.day, event.hour, event.minute, 0, 0)
		},
		calendarMouseUp(event) {
			this.trackingEnd = false;
		},
		calendarClicked(event) {
			let calendar = this.$refs.calendar
// 			console.log(calendar.intervalMinutes * event.offsetY / calendar.intervalHeight);
			console.log(event);
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
	}
}
</script>
