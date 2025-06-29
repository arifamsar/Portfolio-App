<template>
	<footer class="bg-card/50 border-t border-border/50 mt-20">
		<div class="container mx-auto px-4 py-8">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				<!-- About Section -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-foreground">Muhammad Arif Amsar</h3>
					<p class="text-muted-foreground text-sm">Mobile Developer passionate about creating innovative solutions with Flutter, React Native, and native Android development.</p>
					<div class="flex space-x-4">
						<a
							href="https://github.com/arifamsar"
							target="_blank"
							rel="noopener noreferrer"
							class="text-muted-foreground hover:text-primary transition-colors"
						>
							<Github class="h-5 w-5" />
						</a>
						<a
							href="https://id.linkedin.com/in/muhammad-arif-amsar"
							target="_blank"
							rel="noopener noreferrer"
							class="text-muted-foreground hover:text-primary transition-colors"
						>
							<Linkedin class="h-5 w-5" />
						</a>
					</div>
				</div>

				<!-- Quick Links -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-foreground">Quick Links</h3>
					<div class="flex flex-col space-y-2">
						<NuxtLink
							v-for="link in quickLinks"
							:key="link.name"
							:to="link.href"
							class="text-muted-foreground hover:text-primary transition-colors text-sm"
						>
							{{ link.name }}
						</NuxtLink>
					</div>
				</div>

				<!-- Contact Info -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-foreground">Get In Touch</h3>
					<div class="space-y-2 text-sm text-muted-foreground">
						<p>Ready to discuss your next project?</p>
						<NuxtLink
							to="/contact"
							class="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
						>
							Let's connect <ExternalLink class="ml-1 h-3 w-3" />
						</NuxtLink>
					</div>
				</div>
			</div>

			<!-- Copyright -->
			<div class="border-t border-border/50 mt-8 pt-8 text-center">
				<p class="text-muted-foreground text-sm">
					© {{ currentYear }} Muhammad Arif Amsar. Built with <span class="text-primary">Nuxt.js</span> &
					<span class="text-primary">shadcn/ui</span>
				</p>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
	import { Github, Linkedin, ExternalLink } from "lucide-vue-next";

	const currentYear = new Date().getFullYear();

	const quickLinks = [
		{ name: "Home", href: "/" },
		{ name: "Portfolio", href: "/portfolio" },
		{ name: "Contact", href: "/contact" },
		{ name: "Admin", href: "/admin" },
	];
</script>
