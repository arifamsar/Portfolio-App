<template>
	<div class="container mx-auto px-4 pt-20">
		<!-- Hero Section -->
		<section class="min-h-screen flex items-center justify-center relative">
			<div class="text-center space-y-8 max-w-4xl mx-auto">
				<!-- Avatar with futuristic glow -->
				<div class="relative mx-auto w-32 h-32 mb-8">
					<div class="absolute inset-0 bg-gradient-to-r from-primary to-chart-1 rounded-full blur-lg opacity-75 animate-pulse" />
					<div class="relative w-full h-full bg-gradient-to-r from-primary to-chart-1 rounded-full p-1">
						<div class="w-full h-full bg-background rounded-full flex items-center justify-center text-4xl font-bold text-primary">A</div>
					</div>
				</div>

				<!-- Main heading with animated gradient -->
				<div class="space-y-4">
					<h1 class="text-5xl md:text-7xl font-bold leading-tight">
						<span class="bg-gradient-to-r from-foreground via-primary to-chart-1 bg-clip-text text-transparent animate-pulse"> Muhammad Arif Amsar </span>
					</h1>
					<h2 class="text-2xl md:text-3xl text-muted-foreground font-light">
						Mobile Developer &
						<span class="text-primary">Digital Innovator</span>
					</h2>
				</div>

				<!-- Description -->
				<p class="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
					Crafting exceptional mobile experiences with Flutter, React Native, and native Android development. Passionate about turning ideas into reality through clean code and innovative solutions.
				</p>

				<!-- CTA Buttons -->
				<div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
					<Button
						size="lg"
						class="bg-gradient-to-r from-primary to-chart-1 hover:from-primary/90 hover:to-chart-1/90 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
						@click="scrollToProjects"
					>
						View My Work
						<ChevronDown class="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
					</Button>
					<Button
						variant="outline"
						size="lg"
						class="border-primary/50 hover:border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg font-semibold transition-all duration-300"
						@click="navigateTo('/contact')"
					>
						Get In Touch
					</Button>
				</div>

				<!-- Social Links -->
				<div class="flex justify-center space-x-6 pt-8">
					<a
						href="https://github.com/arifamsar"
						target="_blank"
						rel="noopener noreferrer"
						class="text-muted-foreground hover:text-primary transition-colors p-3 rounded-full hover:bg-accent"
					>
						<Github class="h-6 w-6" />
					</a>
					<a
						href="https://id.linkedin.com/in/muhammad-arif-amsar"
						target="_blank"
						rel="noopener noreferrer"
						class="text-muted-foreground hover:text-primary transition-colors p-3 rounded-full hover:bg-accent"
					>
						<Linkedin class="h-6 w-6" />
					</a>
				</div>

				<!-- Scroll indicator -->
				<div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
					<ChevronDown class="h-6 w-6 text-muted-foreground" />
				</div>
			</div>
		</section>

		<!-- About Section -->
		<section
			id="about"
			class="py-20"
		>
			<div class="max-w-6xl mx-auto">
				<div class="text-center mb-16">
					<h2 class="text-4xl font-bold mb-4">About Me</h2>
					<p class="text-muted-foreground text-lg">Passionate mobile developer with expertise in modern technologies</p>
				</div>

				<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<!-- About Content -->
					<div class="space-y-6">
						<p class="text-muted-foreground leading-relaxed">
							I'm a dedicated mobile developer with a passion for creating innovative and user-friendly applications. With expertise in Flutter, React Native, and native Android development, I bring ideas to life through clean, efficient
							code and thoughtful design.
						</p>
						<p class="text-muted-foreground leading-relaxed">
							My journey in mobile development has led me to work on diverse projects, from e-commerce platforms to IoT applications, always focusing on delivering exceptional user experiences and robust functionality.
						</p>

						<!-- Skills -->
						<div class="space-y-4">
							<h3 class="text-xl font-semibold">Core Technologies</h3>
							<div class="flex flex-wrap gap-2">
								<Badge
									v-for="skill in skills"
									:key="skill"
									variant="secondary"
									class="px-3 py-1 text-sm"
								>
									{{ skill }}
								</Badge>
							</div>
						</div>
					</div>

					<!-- Stats Cards -->
					<div class="grid grid-cols-2 gap-6">
						<Card class="p-6 text-center hover:shadow-lg transition-shadow border-border/50">
							<CardContent class="p-0">
								<div class="text-3xl font-bold text-primary mb-2">3+</div>
								<div class="text-muted-foreground">Years Experience</div>
							</CardContent>
						</Card>
						<Card class="p-6 text-center hover:shadow-lg transition-shadow border-border/50">
							<CardContent class="p-0">
								<div class="text-3xl font-bold text-primary mb-2">10+</div>
								<div class="text-muted-foreground">Projects Completed</div>
							</CardContent>
						</Card>
						<Card class="p-6 text-center hover:shadow-lg transition-shadow border-border/50">
							<CardContent class="p-0">
								<div class="text-3xl font-bold text-primary mb-2">5+</div>
								<div class="text-muted-foreground">Technologies</div>
							</CardContent>
						</Card>
						<Card class="p-6 text-center hover:shadow-lg transition-shadow border-border/50">
							<CardContent class="p-0">
								<div class="text-3xl font-bold text-primary mb-2">100%</div>
								<div class="text-muted-foreground">Client Satisfaction</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>

		<!-- Featured Projects -->
		<section
			id="projects"
			class="py-20"
		>
			<div class="max-w-6xl mx-auto">
				<div class="text-center mb-16">
					<h2 class="text-4xl font-bold mb-4">Featured Projects</h2>
					<p class="text-muted-foreground text-lg">Some of my recent work and achievements</p>
				</div>

				<div
					v-if="pending"
					class="text-center py-12"
				>
					<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
				</div>

				<div
					v-else-if="featuredProjects?.length"
					class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
				>
					<ProjectCard
						v-for="project in featuredProjects"
						:key="project.id"
						:project="project"
						class="animate-float"
					/>
				</div>

				<div class="text-center mt-12">
					<Button
						variant="outline"
						size="lg"
						class="border-primary/50 hover:border-primary text-primary hover:bg-primary/10"
						@click="navigateTo('/portfolio')"
					>
						View All Projects
						<ArrowRight class="ml-2 h-5 w-5" />
					</Button>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
	import { Github, Linkedin, ChevronDown, ArrowRight } from "lucide-vue-next";
	import type { Project } from "~/types";

	// SEO
	useSeoMeta({
		title: "Muhammad Arif Amsar - Mobile Developer Portfolio",
		description: "Experienced mobile developer specializing in Flutter, React Native, and Android development. View my portfolio of innovative mobile applications.",
		ogTitle: "Muhammad Arif Amsar - Mobile Developer",
		ogDescription: "Mobile Developer & Digital Innovator",
		ogImage: "/og-image.jpg",
		twitterCard: "summary_large_image",
	});

	// Data
	const skills = ["Flutter", "React Native", "Kotlin", "Dart", "TypeScript", "Firebase", "GraphQL", "REST APIs", "Mobile UI/UX", "CI/CD"];

	// Fetch projects
	const { data: projects, pending } = await useLazyFetch<Project[]>("/api/portfolio");
	const featuredProjects = computed(() => projects.value?.filter((p) => p.featured) || []);

	// Methods
	const scrollToProjects = () => {
		document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
	};
</script>

<style scoped>
	/* Custom animations */
	@keyframes float {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	.animate-float {
		animation: float 6s ease-in-out infinite;
	}

	.animate-float:nth-child(2) {
		animation-delay: -2s;
	}

	.animate-float:nth-child(3) {
		animation-delay: -4s;
	}
</style>
