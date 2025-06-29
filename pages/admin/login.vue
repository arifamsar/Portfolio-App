<template>
	<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted">
		<div class="absolute inset-0 bg-gradient-cyber opacity-5" />

		<!-- Floating particles background -->
		<div class="absolute inset-0 overflow-hidden">
			<div
				v-for="i in 20"
				:key="i"
				class="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
				:style="{
					left: Math.random() * 100 + '%',
					top: Math.random() * 100 + '%',
					animationDelay: Math.random() * 6 + 's',
				}"
			/>
		</div>

		<div class="relative z-10 w-full max-w-md p-8">
			<!-- Logo/Title -->
			<div class="text-center mb-8">
				<h1 class="text-4xl font-bold text-gradient mb-2">Admin Portal</h1>
				<p class="text-muted-foreground">Enter your credentials to access the dashboard</p>
			</div>

			<!-- Login Card -->
			<Card class="glass-morphism border-primary/20 glow-primary">
				<CardHeader class="text-center pb-4">
					<CardTitle class="text-2xl font-bold">Login</CardTitle>
				</CardHeader>

				<CardContent>
					<form
						class="space-y-6"
						@submit.prevent="handleLogin"
					>
						<!-- Username Field -->
						<div class="space-y-2">
							<Label
								for="username"
								class="text-sm font-medium"
								>Username</Label
							>
							<Input
								id="username"
								v-model="form.username"
								type="text"
								placeholder="Enter your username"
								required
								class="bg-background/50 border-primary/30 focus:border-primary/60 focus:ring-primary/30"
							/>
						</div>

						<!-- Password Field -->
						<div class="space-y-2">
							<Label
								for="password"
								class="text-sm font-medium"
								>Password</Label
							>
							<Input
								id="password"
								v-model="form.password"
								type="password"
								placeholder="Enter your password"
								required
								class="bg-background/50 border-primary/30 focus:border-primary/60 focus:ring-primary/30"
							/>
						</div>

						<!-- Error Message -->
						<div
							v-if="error"
							class="p-3 rounded-lg bg-destructive/10 border border-destructive/20"
						>
							<p class="text-destructive text-sm">{{ error }}</p>
						</div>

						<!-- Login Button -->
						<Button
							type="submit"
							class="w-full bg-gradient-cyber hover:opacity-90 transition-all duration-300 glow-primary"
							:disabled="loading"
						>
							<Loader2
								v-if="loading"
								class="w-4 h-4 mr-2 animate-spin"
							/>
							{{ loading ? "Logging in..." : "Login" }}
						</Button>
					</form>
				</CardContent>
			</Card>

			<!-- Demo Credentials -->
			<div class="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
				<p class="text-sm text-muted-foreground text-center mb-2">Demo Credentials:</p>
				<div class="text-xs space-y-1 text-center">
					<p><strong>Username:</strong> admin</p>
					<p><strong>Password:</strong> admin123</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
	import { Input } from "~/components/ui/input";
	import { Label } from "~/components/ui/label";
	import { Button } from "~/components/ui/button";
	import { Loader2 } from "lucide-vue-next";
	import { useToast } from "~/composables/useToast";

	definePageMeta({
		layout: false,
		title: "Admin Login",
	});

	const { login } = useAuth();
	const { toast } = useToast();
	const router = useRouter();

	const form = reactive({
		username: "",
		password: "",
	});

	const loading = ref(false);
	const error = ref("");

	const handleLogin = async () => {
		loading.value = true;
		error.value = "";

		try {
			const result = login(form.username, form.password);

			if (result.success) {
				toast.success("Login successful! Redirecting...");
				await router.push("/admin/dashboard");
			} else {
				error.value = result.message;
				toast.error("Login failed", result.message);
			}
		} catch {
			error.value = "An error occurred during login";
			toast.error("Login error", "An unexpected error occurred");
		} finally {
			loading.value = false;
		}
	};

	// Redirect if already authenticated
	onMounted(() => {
		if (import.meta.client) {
			const isAuthenticated = localStorage.getItem("admin-authenticated") === "true";
			if (isAuthenticated) {
				router.push("/admin/dashboard");
			}
		}
	});
</script>
