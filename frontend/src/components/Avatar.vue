<template>
	<div class="flex justify-content-center">
		<Avatar :image="`http://localhost:3000/${store.userImage.replace(/\\/g, '/')}`" @click="toggle" class="mr-2 cursor-pointer" size="large" shape="circle" />
		<Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
		<Toast />
	</div>
</template>

<script setup>
	import { ref } from "vue"
	import { useRouter } from "vue-router"
	import { userStore } from "../stores/userStore"

	// import Pinia Store
	const store = userStore()

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
