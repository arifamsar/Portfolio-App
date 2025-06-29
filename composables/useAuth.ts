export const useAuth = () => {
	const isAuthenticated = ref(false);

	const checkAuth = () => {
		if (import.meta.client) {
			isAuthenticated.value = localStorage.getItem("admin-authenticated") === "true";
		}
	};

	const login = (username: string, password: string) => {
		// Simple authentication - in production use proper authentication
		const validCredentials = username === "admin" && password === "admin123";

		if (validCredentials) {
			if (import.meta.client) {
				localStorage.setItem("admin-authenticated", "true");
			}
			isAuthenticated.value = true;
			return { success: true, message: "Login successful" };
		} else {
			return { success: false, message: "Invalid credentials" };
		}
	};

	const logout = () => {
		if (import.meta.client) {
			localStorage.removeItem("admin-authenticated");
		}
		isAuthenticated.value = false;
	};

	// Initialize auth state on mount
	onMounted(() => {
		checkAuth();
	});

	return {
		isAuthenticated: readonly(isAuthenticated),
		login,
		logout,
		checkAuth,
	};
};
