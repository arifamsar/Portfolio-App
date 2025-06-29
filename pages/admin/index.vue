<template>
	<div class="min-h-screen flex items-center justify-center">
		<div class="text-center">
			<Loader2 class="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
			<p class="text-muted-foreground">Redirecting to admin dashboard...</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Loader2 } from "lucide-vue-next";

	definePageMeta({
		layout: false,
	});

	// Redirect to dashboard
	onMounted(() => {
		navigateTo("/admin/dashboard");
	});
</script>
