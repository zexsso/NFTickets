<template>
	<div class="card flex justify-content-center">
		<Toast />
	</div>
	<RouterView />
</template>

<script setup>
	import { RouterLink, RouterView } from "vue-router"
</script>
