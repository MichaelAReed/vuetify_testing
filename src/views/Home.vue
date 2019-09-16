<template>
	<div>
		<h1>Home</h1>
		<div>
			<router-link to="/members">Go to secure members page</router-link>
		</div>
		<HelloWorld />
	</div>
</template>

<script>
import HelloWorld from '../components/HelloWorld';

export default {
	components: {
		HelloWorld
	}
};
</script>
