<template>
	<div class="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
		<!-- Futuristic background effects -->
		<div class="fixed inset-0 overflow-hidden pointer-events-none">
			<div class="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
			<div class="absolute bottom-20 right-20 w-96 h-96 bg-chart-1/10 rounded-full blur-3xl animate-pulse delay-1000" />
			<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-chart-2/5 rounded-full blur-3xl animate-pulse delay-2000" />
		</div>

		<!-- Navigation -->
		<TheNavigation />

		<!-- Main content -->
		<main class="relative z-10">
			<slot />
		</main>

		<!-- Footer -->
		<TheFooter />

		<!-- Global loading indicator -->
		<div
			v-if="pending"
			class="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
		>
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
		</div>
	</div>
</template>

<script setup lang="ts">
	const { pending } = useLazyFetch("/api/portfolio/data");
</script>

<style scoped>
	/* Additional futuristic animations */
	@keyframes float {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-20px);
		}
	}

	.animate-float {
		animation: float 6s ease-in-out infinite;
	}
</style>
