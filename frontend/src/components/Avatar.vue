<template>
	<div class="flex justify-content-center">
		<Avatar
			class="cursor-pointer"
			label="P"
			@click="toggle"
			aria-haspopup="true"
			aria-controls="overlay_menu"
			shape="circle"
			style="background-color: #2196f3"
			size="large"
		/>
		<Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
		<Toast />
	</div>
</template>

<script setup>
	import { ref } from "vue"
	import { useRouter } from "vue-router"

	const router = useRouter()

	const menu = ref()
	const items = ref([
		{
			label: "Account",
			icon: "pi pi-user",
			command: () => {
				router.push("/account")
			},
		},
		{
			label: "Logout",
			icon: "pi pi-sign-out",
			command: () => {
				router.push("/")
			},
		},
	])

	const toggle = (event) => {
		menu.value.toggle(event)
	}
</script>
