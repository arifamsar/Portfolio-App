<template>
	<nav class="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
		<div class="container mx-auto px-4">
			<div class="flex items-center justify-between h-16">
				<!-- Logo/Brand -->
				<NuxtLink
					to="/"
					class="flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent hover:scale-105 transition-transform"
				>
					<div class="w-8 h-8 bg-gradient-to-br from-primary to-chart-1 rounded-lg flex items-center justify-center">
						<span class="text-white text-sm font-bold">A</span>
					</div>
				</NuxtLink>

				<!-- Desktop Navigation -->
				<div class="hidden md:flex items-center space-x-8">
					<NuxtLink
						v-for="item in navigation"
						:key="item.name"
						:to="item.href"
						class="relative px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-300 group hover:scale-105"
						:class="{ 'text-primary': $route.path === item.href }"
					>
						{{ item.name }}
						<div class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-chart-1 group-hover:w-full transition-all duration-300" />
					</NuxtLink>
				</div>

				<!-- Theme Toggle & Mobile Menu -->
				<div class="flex items-center space-x-4">
					<!-- Theme Toggle -->
					<Button
						v-if="isClient"
						variant="ghost"
						size="icon"
						class="rounded-full transition-all duration-200"
						@click="toggleTheme"
					>
						<Transition
							enter-active-class="transition-all duration-200"
							enter-from-class="opacity-0 rotate-90"
							enter-to-class="opacity-100 rotate-0"
							leave-active-class="transition-all duration-200"
							leave-from-class="opacity-100 rotate-0"
							leave-to-class="opacity-0 -rotate-90"
							mode="out-in"
						>
							<Sun
								v-if="isDark"
								key="sun"
								class="h-5 w-5"
							/>
							<Moon
								v-else
								key="moon"
								class="h-5 w-5"
							/>
						</Transition>
					</Button>
					<!-- Fallback for SSR -->
					<Button
						v-else
						variant="ghost"
						size="icon"
						class="rounded-full transition-all duration-200"
						disabled
					>
						<Sun class="h-5 w-5" />
					</Button>

					<!-- Mobile Menu Button -->
					<Button
						variant="ghost"
						size="icon"
						class="md:hidden rounded-full transition-all duration-200 hover:bg-accent"
						@click="toggleMobileMenu"
					>
						<Menu
							v-if="!isMobileMenuOpen"
							class="h-5 w-5"
						/>
						<X
							v-else
							class="h-5 w-5"
						/>
					</Button>
				</div>
			</div>

			<!-- Mobile Navigation -->
			<Transition
				enter-active-class="transition-all duration-300 ease-out"
				enter-from-class="opacity-0 -translate-y-4"
				enter-to-class="opacity-100 translate-y-0"
				leave-active-class="transition-all duration-200 ease-in"
				leave-from-class="opacity-100 translate-y-0"
				leave-to-class="opacity-0 -translate-y-4"
			>
				<div
					v-if="isMobileMenuOpen"
					class="md:hidden py-4 border-t border-border/50 bg-background/95 backdrop-blur-sm"
				>
					<div class="flex flex-col space-y-1">
						<NuxtLink
							v-for="item in navigation"
							:key="item.name"
							:to="item.href"
							class="px-4 py-3 text-sm font-medium transition-colors duration-200 hover:bg-accent/50 rounded-md mx-2"
							:class="{
								'text-primary bg-primary/10': $route.path === item.href,
								'text-foreground/80 hover:text-foreground': $route.path !== item.href,
							}"
							@click="closeMobileMenu"
						>
							{{ item.name }}
						</NuxtLink>
					</div>
				</div>
			</Transition>
		</div>
	</nav>
</template>

<script setup lang="ts">
	import { Menu, X, Sun, Moon } from "lucide-vue-next";

	const isMobileMenuOpen = ref(false);

	const navigation = [
		{ name: "Home", href: "/" },
		{ name: "Portfolio", href: "/portfolio" },
		{ name: "Contact", href: "/contact" },
	];

	// Theme management
	const colorMode = useColorMode();
	const isClient = ref(false);
	const isDark = computed(() => colorMode.value === "dark");

	// Ensure client-side rendering
	onMounted(() => {
		isClient.value = true;

		// Add keyboard event listener for accessibility
		const handleKeydown = (event: KeyboardEvent) => {
			if (event.key === "Escape" && isMobileMenuOpen.value) {
				closeMobileMenu();
			}
		};

		document.addEventListener("keydown", handleKeydown);

		// Cleanup event listener
		onUnmounted(() => {
			document.removeEventListener("keydown", handleKeydown);
		});
	});

	const toggleTheme = () => {
		try {
			const newMode = isDark.value ? "light" : "dark";
			colorMode.preference = newMode;
		} catch (error) {
			console.warn("Failed to toggle theme:", error);
		}
	};

	const toggleMobileMenu = () => {
		isMobileMenuOpen.value = !isMobileMenuOpen.value;

		// Prevent body scroll when mobile menu is open
		if (import.meta.client) {
			if (isMobileMenuOpen.value) {
				document.body.style.overflow = "hidden";
			} else {
				document.body.style.overflow = "";
			}
		}
	};

	const closeMobileMenu = () => {
		isMobileMenuOpen.value = false;
		// Re-enable body scroll
		if (import.meta.client) {
			document.body.style.overflow = "";
		}
	};

	// Close mobile menu when route changes
	watch(
		() => useRoute().path,
		() => {
			closeMobileMenu();
		}
	);
</script>
