<template>
	<v-app dark>
		<v-navigation-drawer v-model="sideNav" absolute temporary>
			<v-list>
				<v-list-item v-if="userIsAuthenticated" :to="{ name: 'user', params: { id: loggedInUser._id }}">
					<v-list-item-avatar>
						<v-img
							:src="loggedInUser.imageURL"
						>
						</v-img>
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-title>{{ loggedInUser.name }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<v-divider></v-divider>
				<v-list-item
					v-for="item in menuItems"
					:key="item.title"
					:to="item.link"
				>
					<v-list-item-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>{{ item.title }}</v-list-item-content>
				</v-list-item>
				<v-list-item v-if="userIsAuthenticated" @click="onLogout">
					<v-list-item-action>
						<v-icon>mdi-exit-to-app</v-icon>
					</v-list-item-action>
					<v-list-item-content>Logout</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar app>
			<v-app-bar-nav-icon
				left
				@click.stop="sideNav = !sideNav"
				class="hidden-sm-and-up"
			>
			</v-app-bar-nav-icon>
			<v-toolbar-title>
				<router-link to="/" tag="span" style="cursor: pointer">
					HAX Console
				</router-link>
			</v-toolbar-title>
			<v-spacer></v-spacer>

			<v-toolbar-items class="hidden-xs-only">
				<v-btn
					text
					v-for="item in menuItems"
					:key="item.title"
					:to="item.link"
				>
					<v-icon left>{{ item.icon }}</v-icon>
					{{ item.title }}
				</v-btn>
			</v-toolbar-items>
			<v-toolbar-items class="hidden-xs-only" v-if="userIsAuthenticated">
				<v-btn text  @click="onLogout">
					<v-icon left>mdi-exit-to-app</v-icon>
					Logout
				</v-btn>
				<v-btn
					text
					left
					:to="{ name: 'user', params: { id: loggedInUser._id }}"
				>
					<v-avatar>
						<v-img :src="loggedInUser.imageURL"></v-img>
					</v-avatar>
				</v-btn>
			</v-toolbar-items>
			<v-toolbar-items class="hidden-xs-only" v-if="!userIsAuthenticated">
				<v-btn text  @click="onLogin">
					<v-icon left>mdi-lock-open</v-icon>
					Login
				</v-btn>
			</v-toolbar-items>
		</v-app-bar>
		<v-snackbar
			v-model="snackBarShown"
			top
			:timeout=6000
			color="error"
			multi-line
		>
			<div v-if="error">
				{{ error.message }}
			</div>
			<v-btn color="error" @click="onDismissed">
				<v-icon>mdi-close-box</v-icon>
			</v-btn>
		</v-snackbar>
		<v-content>
			<router-view></router-view>
		</v-content>
	</v-app>
</template>

<script>
export default {
	data() {
		return {
			sideNav: false,
			snackBarShown: false
		};
	},
	computed: {
		userIsAuthenticated() {
			return (this.loggedInUser !== null && this.loggedInUser !== undefined);
		},
		loggedInUser() {
			return this.$store.getters.user;
		},
		error() {
			let err = this.$store.getters.error;
			this.snackBarShown = (err) ? true : false;
			return this.$store.getters.error;
		},
		menuItems() {
			let menuItems = [];
			if(this.userIsAuthenticated) {
				menuItems = [
					{
						icon: 'mdi-account-tie',
						title: 'Suppliers',
						link: '/suppliers'
					},
					{
						icon: 'mdi-door',
						title: 'Book a Room',
						link: '/bookroom'
					},
					{
						icon: 'mdi-account-multiple',
						title: 'Teams',
						link: '/teams'
					},
					{
						icon: 'mdi-account',
						title: 'Users',
						link: '/users'
					},
					{
						icon: 'mdi-tools',
						title: 'Tools',
						link: '/toolTypes'
					}
				]
			}
			return menuItems;
		}
	},
	methods: {
		onLogin() {
			this.$store.dispatch('loginUser');
		},
		onLogout() {
			this.$store.dispatch('logoutUser');
		},
		onDismissed() {
			 this.$store.dispatch('clearError');
		}
	}
};
</script>
