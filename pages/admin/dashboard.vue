<template>
	<div class="min-h-screen bg-gradient-to-br from-background via-background to-muted">
		<!-- Header -->
		<header class="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
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

					<div class="flex items-center space-x-4">
						<Button
							variant="outline"
							size="sm"
							:disabled="loading"
							@click="refreshProjects"
						>
							<RotateCcw
								:class="{ 'animate-spin': loading }"
								class="w-4 h-4 mr-2"
							/>
							Refresh
						</Button>

						<Button
							variant="outline"
							size="sm"
							class="text-destructive hover:text-destructive-foreground hover:bg-destructive"
							@click="logout"
						>
							<LogOut class="w-4 h-4 mr-2" />
							Logout
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
	import type { Project } from "~/types";

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
	const editingProject = ref<Project | null>(null);

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
			const { data } = await $fetch<{ data: Project[] }>("/api/portfolio");
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

	const logout = async () => {
		authLogout();
		toast.success("Logged out successfully");
		await router.push("/admin/login");
	};

	// Initialize
	onMounted(() => {
		refreshProjects();
	});
</script>
