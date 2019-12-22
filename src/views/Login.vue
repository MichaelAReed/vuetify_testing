<template>
	<v-container>
		<v-row>
			<v-col cols="12" sm="6" offset-sm="3">
				<v-card>
					<v-card-text>
						<v-container>
							<v-form @submit.prevent="onLogin">
								<v-row>
									<v-col cols="12">
										<v-text-field
										name="email"
										label="Mail"
										id="email"
										v-model="email"
										type="email"
										required
										>
										</v-text-field>
									</v-col>
								<v-row>
								</v-row>
									<v-col cols="12">
										<v-text-field
										name="password"
										label="Password"
										id="password"
										v-model="password"
										type="password"
										required
										>
										</v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="6">
										<v-btn type="submit" :disabled="loading" :loading="loading">
											Login
										</v-btn>
									</v-col>
									<v-col cols="6">
										<v-btn to="/signup">Create New Account</v-btn>
									</v-col>
								</v-row>
							</v-form>
						</v-container>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			email: '',
			password: ''
		}
	},
	computed: {
		user() {
			return this.$store.getters.user;
		},
		loading() {
			return this.$store.getters.loading;
		}
	},
	watch: {
		user(value) {
			if (value !== null && value !== undefined) {
				this.$router.push('/');
			}
		}
	},
	methods: {
		onLogin() {
			this.$store.dispatch('loginUser', {email: this.email, password: this.password});
		}
	}
};
</script>
