import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: () => import("../views/HomeView.vue"),
		},
		{
			path: "/explore",
			name: "Explore",
			component: () => import("../views/ExploreView.vue"),
		},
		{
			path: "/marketplace",
			name: "MarketplacePage",
			component: () => import("../views/MarketplaceView.vue"),
		},
		{
			path: "/create-event",
			name: "CreateEventPage",
			component: () => import("../views/CreateEventView.vue"),
		},
		{
			path: "/account",
			name: "AccountPage",
			component: () => import("../views/AccountView.vue"),
		}
	],
})

export default router
