<template>
	<v-container>
		<v-row>
			<v-col cols="12" sm="6" offset-sm="3">
				<h4>Create a New Account</h4>
			</v-col>
		</v-row>f
		<v-row>
			<v-col cols="12" sm="6" offset-sm="3">
				<v-card>
					<v-card-text>
						<v-container>
							<v-form @submit.prevent="onSignUp">
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
								<v-row>
								</v-row>
									<v-col cols="12">
										<v-text-field
										name="confirmPassword"
										label="Confirm Password"
										id="confirmPassword"
										v-model="confirmPassword"
										type="password"
										:rules="[comparePasswords]"
										>
										</v-text-field>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12">
										<v-btn type="submit" :disabled="loading" :loading="loading">
											Sign Up
										</v-btn>
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
			password: '',
			confirmPassword: ''
		}
	},
	computed: {
		comparePasswords() {
			return this.password !== this.confirmPassword ? 'Passwords do not match' : '';
		},
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
		onSignUp() {
			this.$store.dispatch('signUpUser', {email: this.email, password: this.password});
		}
	}
};
</script>
