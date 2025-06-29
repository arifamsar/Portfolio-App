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
	const body = await readBody(event);

	console.log("=== Creating new project ===");
	console.log("Request body:", body);

	try {
		// Get current projects by calling the data endpoint directly
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

		// Generate new ID
		const newId = Math.max(...currentProjects.map((p: Project) => p.id), 0) + 1;

		const newProject: Project = {
			id: newId,
			...body,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		const updatedProjects = [...currentProjects, newProject];
		console.log("Total projects after creation:", updatedProjects.length);

		// Try to save to Cloudflare KV
		if (kv) {
			try {
				await kv.put("portfolio-data", JSON.stringify(updatedProjects));
				console.log("Successfully saved to KV");
				return newProject;
			} catch (kvError) {
				console.error("Failed to save to KV:", kvError);
				throw createError({
					statusCode: 500,
					statusMessage: "Failed to save project to KV storage",
				});
			}
		}

		// Development mode: save to file system
		if (process.env.NODE_ENV !== "production") {
			try {
				const { promises: fs } = await import("fs");
				const { join } = await import("path");
				const filePath = join(process.cwd(), "server/data/portfolio.json");
				await fs.writeFile(filePath, JSON.stringify(updatedProjects, null, 2));
				return newProject;
			} catch (fileError) {
				console.warn("Could not write to portfolio.json:", fileError);
			}
		}

		// If no storage available, just return the new project
		// Note: This means data won't persist, but API won't fail
		return newProject;
	} catch (error) {
		console.error("Error creating project:", error);
		throw createError({
			statusCode: 500,
			statusMessage: "Failed to create project",
		});
	}
});
