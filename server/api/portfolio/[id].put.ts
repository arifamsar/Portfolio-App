interface Project {
	id: number;
	title: string;
	description: string;
	technologies: string[];
	category: string;
	image: string;
	demoUrl?: string | null;
	githubUrl: string;
	featured: boolean;
	status: "completed" | "in-progress" | "planned";
	createdAt: string;
	updatedAt: string;
}

export default defineEventHandler(async (event) => {
	const id = getRouterParam(event, "id");
	const body = await readBody(event);

	console.log("=== Updating project ===");
	console.log("Project ID:", id);
	console.log("Request body:", body);

	try {
		// Get current projects
		let currentProjects: Project[] = [];

		// Try to get from KV first
		const kv = event.context.cloudflare?.env?.KV_BINDING;
		if (kv) {
			try {
				const kvData = await kv.get("portfolio-data");
				if (kvData) {
					currentProjects = JSON.parse(kvData);
					console.log("Loaded projects from KV:", currentProjects.length);
				}
			} catch (kvError) {
				console.warn("Failed to read from KV:", kvError);
			}
		}

		// Fallback to file system in development
		if (currentProjects.length === 0 && process.env.NODE_ENV !== "production") {
			try {
				const { promises: fs } = await import("fs");
				const { join } = await import("path");
				const filePath = join(process.cwd(), "server/data/portfolio.json");
				const data = await fs.readFile(filePath, "utf-8");
				currentProjects = JSON.parse(data);
				console.log("Loaded projects from file:", currentProjects.length);
			} catch (fileError) {
				console.warn("Failed to read from file:", fileError);
			}
		}

		const projectIndex = currentProjects.findIndex((p: Project) => p.id === parseInt(id!));

		if (projectIndex === -1) {
			throw createError({
				statusCode: 404,
				statusMessage: "Project not found",
			});
		}

		currentProjects[projectIndex] = {
			...currentProjects[projectIndex],
			...body,
			updatedAt: new Date().toISOString(),
		};

		console.log("Updated project:", currentProjects[projectIndex]);

		// Try to save to Cloudflare KV
		if (kv) {
			try {
				await kv.put("portfolio-data", JSON.stringify(currentProjects));
				console.log("Successfully updated in KV");
				return currentProjects[projectIndex];
			} catch (kvError) {
				console.error("Failed to save to KV:", kvError);
				throw createError({
					statusCode: 500,
					statusMessage: "Failed to update project in KV storage",
				});
			}
		}

		// Development mode: save to file system
		if (process.env.NODE_ENV !== "production") {
			try {
				const { promises: fs } = await import("fs");
				const { join } = await import("path");
				const filePath = join(process.cwd(), "server/data/portfolio.json");
				await fs.writeFile(filePath, JSON.stringify(currentProjects, null, 2));
				return currentProjects[projectIndex];
			} catch (fileError) {
				console.warn("Could not write to portfolio.json:", fileError);
			}
		}

		// If no storage available, just return the updated project
		return currentProjects[projectIndex];
	} catch (error) {
		console.error("Error updating project:", error);
		throw createError({
			statusCode: 500,
			statusMessage: "Failed to update project",
		});
	}
});
