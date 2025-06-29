export default defineNuxtRouteMiddleware((_to, _from) => {
	// Check if we're on client side
	if (import.meta.client) {
		const isAuthenticated = localStorage.getItem("admin-authenticated") === "true";

		if (!isAuthenticated) {
			return navigateTo("/admin/login");
		}
	}
});
