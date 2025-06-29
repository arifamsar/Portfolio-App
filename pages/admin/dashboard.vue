<template>
	<div class="min-h-screen bg-gradient-to-br from-background via-background to-muted pt-16">
		<!-- Header -->
		<header class="bg-card/80 backdrop-blur-sm border-b border-border sticky top-16 z-40">
			<div class="container mx-auto px-4 py-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center space-x-4">
						<h1 class="text-2xl font-bold text-gradient">Admin Dashboard</h1>
						<Badge
							variant="secondary"
							class="bg-primary/10 text-primary"
						>
							Portfolio Manager
						</Badge>
					</div>

					<div class="flex items-center space-x-2 sm:space-x-4">
						<Button
							variant="outline"
							size="sm"
							:disabled="loading"
							class="whitespace-nowrap"
							@click="refreshProjects"
						>
							<RotateCcw
								:class="{ 'animate-spin': loading }"
								class="w-4 h-4 mr-2"
							/>
							<span class="hidden sm:inline">Refresh</span>
						</Button>

						<Button
							variant="destructive"
							size="sm"
							class="bg-destructive hover:bg-destructive/90 text-destructive-foreground whitespace-nowrap"
							title="Logout (Ctrl+L)"
							@click="handleLogout"
						>
							<LogOut class="w-4 h-4 mr-2" />
							<span class="hidden sm:inline">Logout</span>
						</Button>
					</div>
				</div>
			</div>
		</header>

		<div class="container mx-auto px-4 py-8">
			<!-- Stats Cards -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<Card class="glass-morphism border-primary/20">
					<CardContent class="p-6">
						<div class="flex items-center space-x-4">
							<div class="p-3 rounded-full bg-primary/10">
								<FolderOpen class="w-6 h-6 text-primary" />
							</div>
							<div>
								<p class="text-sm text-muted-foreground">Total Projects</p>
								<p class="text-2xl font-bold">{{ projects.length }}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card class="glass-morphism border-accent/20">
					<CardContent class="p-6">
						<div class="flex items-center space-x-4">
							<div class="p-3 rounded-full bg-accent/10">
								<Eye class="w-6 h-6 text-accent" />
							</div>
							<div>
								<p class="text-sm text-muted-foreground">Published</p>
								<p class="text-2xl font-bold">{{ publishedCount }}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card class="glass-morphism border-chart-3/20">
					<CardContent class="p-6">
						<div class="flex items-center space-x-4">
							<div class="p-3 rounded-full bg-chart-3/10">
								<Calendar class="w-6 h-6 text-chart-3" />
							</div>
							<div>
								<p class="text-sm text-muted-foreground">Last Updated</p>
								<p class="text-sm font-medium">{{ lastUpdated }}</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<!-- Projects Management -->
			<Card class="glass-morphism border-primary/20">
				<CardHeader>
					<div class="flex items-center justify-between">
						<div>
							<CardTitle class="text-xl">Project Management</CardTitle>
							<CardDescription>Manage your portfolio projects</CardDescription>
						</div>
						<Button
							class="bg-gradient-cyber hover:opacity-90 glow-primary"
							@click="openCreateDialog"
						>
							<Plus class="w-4 h-4 mr-2" />
							Add Project
						</Button>
					</div>
				</CardHeader>

				<CardContent>
					<div
						v-if="loading"
						class="flex items-center justify-center py-8"
					>
						<Loader2 class="w-6 h-6 animate-spin text-primary" />
						<span class="ml-2 text-muted-foreground">Loading projects...</span>
					</div>

					<div
						v-else-if="projects.length === 0"
						class="text-center py-8"
					>
						<FolderOpen class="w-12 h-12 text-muted-foreground mx-auto mb-4" />
						<p class="text-muted-foreground">No projects found. Create your first project!</p>
					</div>

					<div
						v-else
						class="space-y-4"
					>
						<div
							v-for="project in projects"
							:key="project.id"
							class="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/30 transition-colors bg-card/50"
						>
							<div class="flex items-center space-x-4">
								<img
									:src="project.image"
									:alt="project.title"
									class="w-16 h-16 rounded-lg object-cover"
								/>
								<div>
									<h3 class="font-semibold">{{ project.title }}</h3>
									<p class="text-sm text-muted-foreground">{{ project.description }}</p>
									<div class="flex items-center space-x-2 mt-1">
										<Badge
											v-for="tech in project.technologies"
											:key="tech"
											variant="secondary"
											class="text-xs"
										>
											{{ tech }}
										</Badge>
									</div>
								</div>
							</div>

							<div class="flex items-center space-x-2">
								<Button
									variant="outline"
									size="sm"
									@click="editProject(project)"
								>
									<Edit class="w-4 h-4" />
								</Button>
								<Button
									variant="outline"
									size="sm"
									class="text-destructive hover:text-destructive-foreground hover:bg-destructive"
									@click="deleteProject(project.id)"
								>
									<Trash2 class="w-4 h-4" />
								</Button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<!-- GitHub Repositories -->
			<Card class="glass-morphism border-chart-2/20 mt-8">
				<CardHeader>
					<div class="flex items-center justify-between">
						<div>
							<CardTitle class="text-xl flex items-center space-x-2">
								<svg
									class="w-5 h-5"
									viewBox="0 0 24 24"
									fill="currentColor"
								>
									<path
										d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
									/>
								</svg>
								<span>GitHub Repositories</span>
							</CardTitle>
							<CardDescription>Browse your GitHub repositories</CardDescription>
						</div>
						<div class="flex items-center space-x-2">
							<Input
								v-model="githubUsername"
								placeholder="GitHub username"
								class="w-40"
								@keyup.enter="fetchRepositories"
							/>
							<Button
								variant="outline"
								size="sm"
								:disabled="loadingRepos"
								@click="fetchRepositories"
							>
								<RotateCcw
									:class="{ 'animate-spin': loadingRepos }"
									class="w-4 h-4 mr-2"
								/>
								Fetch
							</Button>
						</div>
					</div>
				</CardHeader>

				<CardContent>
					<div
						v-if="loadingRepos"
						class="flex items-center justify-center py-8"
					>
						<Loader2 class="w-6 h-6 animate-spin text-primary" />
						<span class="ml-2 text-muted-foreground">Loading repositories...</span>
					</div>

					<div
						v-else-if="repositories.length === 0 && !loadingRepos"
						class="text-center py-8"
					>
						<svg
							class="w-12 h-12 text-muted-foreground mx-auto mb-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
							/>
						</svg>
						<p class="text-muted-foreground">No repositories found. Enter a GitHub username and click Fetch.</p>
					</div>

					<div
						v-else
						class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
					>
						<div
							v-for="repo in repositories"
							:key="repo.id"
							class="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors bg-card/50"
						>
							<div class="flex items-start justify-between mb-2">
								<h3 class="font-semibold text-sm truncate pr-2">{{ repo.name }}</h3>
								<div class="flex items-center space-x-1 text-xs text-muted-foreground">
									<svg
										class="w-3 h-3"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
										/>
									</svg>
									<span>{{ repo.stargazers_count }}</span>
								</div>
							</div>

							<p class="text-xs text-muted-foreground mb-3 line-clamp-2">
								{{ repo.description || "No description available" }}
							</p>

							<div class="flex items-center justify-between">
								<div class="flex items-center space-x-2">
									<div
										v-if="repo.language"
										class="w-2 h-2 rounded-full"
										:class="getLanguageColor(repo.language)"
									/>
									<span class="text-xs text-muted-foreground">{{ repo.language || "Unknown" }}</span>
								</div>

								<div class="flex items-center space-x-1">
									<Button
										variant="ghost"
										size="sm"
										class="h-6 px-2"
										@click="openRepository(repo.html_url)"
									>
										<svg
											class="w-3 h-3"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
											/>
										</svg>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>

		<!-- Project Form Dialog -->
		<Dialog v-model:open="showProjectDialog">
			<DialogContent class="max-w-2xl glass-morphism">
				<DialogHeader>
					<DialogTitle>{{ editingProject ? "Edit Project" : "Create New Project" }}</DialogTitle>
					<DialogDescription>
						{{ editingProject ? "Update project information" : "Add a new project to your portfolio" }}
					</DialogDescription>
				</DialogHeader>

				<div class="space-y-4">
					<div class="grid grid-cols-2 gap-4">
						<div class="space-y-2">
							<Label for="title">Title</Label>
							<Input
								id="title"
								v-model="projectForm.title"
								placeholder="Project title"
								required
							/>
						</div>

						<div class="space-y-2">
							<Label for="image">Image URL</Label>
							<Input
								id="image"
								v-model="projectForm.image"
								placeholder="https://example.com/image.jpg"
								required
							/>
						</div>
					</div>

					<div class="space-y-2">
						<Label for="description">Description</Label>
						<Textarea
							id="description"
							v-model="projectForm.description"
							placeholder="Project description"
							rows="3"
							required
						/>
					</div>

					<div class="grid grid-cols-2 gap-4">
						<div class="space-y-2">
							<Label for="github">GitHub URL</Label>
							<Input
								id="github"
								v-model="projectForm.github"
								placeholder="https://github.com/username/repo"
							/>
						</div>

						<div class="space-y-2">
							<Label for="live">Live URL</Label>
							<Input
								id="live"
								v-model="projectForm.live"
								placeholder="https://project-demo.com"
							/>
						</div>
					</div>

					<div class="space-y-2">
						<Label for="technologies">Technologies (comma-separated)</Label>
						<Input
							id="technologies"
							v-model="technologiesInput"
							placeholder="Vue.js, TypeScript, Tailwind CSS"
							required
						/>
					</div>
				</div>

				<DialogFooter>
					<Button
						variant="outline"
						@click="closeProjectDialog"
					>
						Cancel
					</Button>
					<Button
						class="bg-gradient-cyber hover:opacity-90"
						:disabled="saving"
						@click="saveProject"
					>
						<Loader2
							v-if="saving"
							class="w-4 h-4 mr-2 animate-spin"
						/>
						{{ saving ? "Saving..." : editingProject ? "Update" : "Create" }}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>

		<!-- Logout Confirmation Dialog -->
		<Dialog v-model:open="showLogoutDialog">
			<DialogContent class="max-w-md glass-morphism">
				<DialogHeader>
					<DialogTitle class="flex items-center space-x-2">
						<LogOut class="w-5 h-5 text-destructive" />
						<span>Confirm Logout</span>
					</DialogTitle>
					<DialogDescription> Are you sure you want to logout? You'll need to login again to access the admin dashboard. </DialogDescription>
				</DialogHeader>

				<DialogFooter class="gap-2">
					<Button
						variant="outline"
						@click="showLogoutDialog = false"
					>
						Cancel
					</Button>
					<Button
						variant="destructive"
						class="bg-destructive hover:bg-destructive/90"
						@click="confirmLogout"
					>
						<LogOut class="w-4 h-4 mr-2" />
						Yes, Logout
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>

		<!-- Floating Logout Button (Mobile Fallback) -->
		<Button
			class="fixed bottom-4 right-4 z-50 bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg rounded-full w-12 h-12 md:hidden"
			title="Logout (Ctrl+L)"
			@click="handleLogout"
		>
			<LogOut class="w-5 h-5" />
		</Button>
	</div>
</template>

<script setup lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
	import { Button } from "~/components/ui/button";
	import { Badge } from "~/components/ui/badge";
	import { Input } from "~/components/ui/input";
	import { Label } from "~/components/ui/label";
	import { Textarea } from "~/components/ui/textarea";
	import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/dialog";
	import { Plus, Edit, Trash2, LogOut, RotateCcw, FolderOpen, Eye, Calendar, Loader2 } from "lucide-vue-next";
	import { useToast } from "~/composables/useToast";
	import type { Project, GitHubRepo } from "~/types";

	interface GitHubApiResponse {
		success: boolean;
		data: GitHubRepo[];
		total: number;
		username: string;
	}

	definePageMeta({
		middleware: "admin",
		title: "Admin Dashboard",
	});

	const { logout: authLogout } = useAuth();
	const { toast } = useToast();
	const router = useRouter();

	// State
	const projects = ref<Project[]>([]);
	const loading = ref(true);
	const saving = ref(false);
	const showProjectDialog = ref(false);
	const showLogoutDialog = ref(false);
	const editingProject = ref<Project | null>(null);

	// GitHub repositories state
	const repositories = ref<GitHubRepo[]>([]);
	const loadingRepos = ref(false);
	const githubUsername = ref("arifamsar");

	// Form state
	const projectForm = reactive({
		title: "",
		description: "",
		image: "",
		github: "",
		live: "",
		technologies: [] as string[],
	});

	const technologiesInput = ref("");

	// Computed
	const publishedCount = computed(() => projects.value.length);
	const lastUpdated = computed(() => {
		if (projects.value.length === 0) return "N/A";
		return new Date().toLocaleDateString();
	});

	// Methods
	const refreshProjects = async () => {
		loading.value = true;
		try {
			const data = await $fetch<Project[]>("/api/portfolio");
			projects.value = data || [];
			toast.success("Projects refreshed successfully");
		} catch (error) {
			console.error("Failed to fetch projects:", error);
			toast.error("Failed to refresh projects");
		} finally {
			loading.value = false;
		}
	};

	const openCreateDialog = () => {
		editingProject.value = null;
		resetForm();
		showProjectDialog.value = true;
	};

	const editProject = (project: Project) => {
		editingProject.value = project;
		projectForm.title = project.title;
		projectForm.description = project.description;
		projectForm.image = project.image;
		projectForm.github = project.github || "";
		projectForm.live = project.live || "";
		projectForm.technologies = [...project.technologies];
		technologiesInput.value = project.technologies.join(", ");
		showProjectDialog.value = true;
	};

	const resetForm = () => {
		projectForm.title = "";
		projectForm.description = "";
		projectForm.image = "";
		projectForm.github = "";
		projectForm.live = "";
		projectForm.technologies = [];
		technologiesInput.value = "";
	};

	const closeProjectDialog = () => {
		showProjectDialog.value = false;
		editingProject.value = null;
		resetForm();
	};

	const saveProject = async () => {
		saving.value = true;

		try {
			// Parse technologies
			projectForm.technologies = technologiesInput.value
				.split(",")
				.map((tech) => tech.trim())
				.filter((tech) => tech.length > 0);

			const projectData = {
				title: projectForm.title,
				description: projectForm.description,
				image: projectForm.image,
				github: projectForm.github || undefined,
				live: projectForm.live || undefined,
				technologies: projectForm.technologies,
			};

			if (editingProject.value) {
				// Update existing project
				await $fetch(`/api/portfolio/${editingProject.value.id}`, {
					method: "PUT",
					body: projectData,
				});
				toast.success("Project updated successfully");
			} else {
				// Create new project
				await $fetch("/api/portfolio", {
					method: "POST",
					body: projectData,
				});
				toast.success("Project created successfully");
			}

			await refreshProjects();
			closeProjectDialog();
		} catch (error) {
			console.error("Failed to save project:", error);
			toast.error("Failed to save project");
		} finally {
			saving.value = false;
		}
	};

	const deleteProject = async (id: number) => {
		if (!confirm("Are you sure you want to delete this project?")) return;

		try {
			await $fetch(`/api/portfolio/${id}`, {
				method: "DELETE",
			});
			toast.success("Project deleted successfully");
			await refreshProjects();
		} catch (error) {
			console.error("Failed to delete project:", error);
			toast.error("Failed to delete project");
		}
	};

	// GitHub repositories methods
	const fetchRepositories = async () => {
		if (!githubUsername.value.trim()) {
			toast.error("Please enter a GitHub username");
			return;
		}

		loadingRepos.value = true;
		try {
			const response = await $fetch<GitHubApiResponse>("/api/github/repositories", {
				query: { username: githubUsername.value.trim() },
			});

			repositories.value = response.data || [];
			toast.success(`Found ${response.total} repositories for ${response.username}`);
		} catch (error) {
			console.error("Failed to fetch repositories:", error);
			toast.error("Failed to fetch GitHub repositories");
			repositories.value = [];
		} finally {
			loadingRepos.value = false;
		}
	};

	const openRepository = (url: string) => {
		window.open(url, "_blank");
	};

	const getLanguageColor = (language: string | null): string => {
		if (!language) return "bg-gray-400";

		const colors: Record<string, string> = {
			JavaScript: "bg-yellow-400",
			TypeScript: "bg-blue-600",
			Python: "bg-green-600",
			Java: "bg-orange-600",
			"C++": "bg-blue-800",
			"C#": "bg-purple-600",
			PHP: "bg-indigo-600",
			Ruby: "bg-red-600",
			Go: "bg-cyan-600",
			Rust: "bg-orange-800",
			Swift: "bg-orange-500",
			Kotlin: "bg-purple-500",
			Dart: "bg-blue-500",
			Vue: "bg-green-500",
			React: "bg-blue-400",
			HTML: "bg-orange-400",
			CSS: "bg-blue-500",
			Shell: "bg-gray-600",
			Dockerfile: "bg-blue-700",
		};

		return colors[language] || "bg-gray-400";
	};

	const handleLogout = () => {
		showLogoutDialog.value = true;
	};

	const confirmLogout = async () => {
		authLogout();
		toast.success("Logged out successfully");
		showLogoutDialog.value = false;
		await router.push("/admin/login");
	};

	// Initialize
	onMounted(() => {
		refreshProjects();

		// Add keyboard shortcut for logout (Ctrl+L)
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === "l") {
				event.preventDefault();
				handleLogout();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		// Cleanup on unmount
		onUnmounted(() => {
			document.removeEventListener("keydown", handleKeyDown);
		});
	});
</script>
