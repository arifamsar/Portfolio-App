import { promises as fs } from "fs";
import { join } from "path";

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

	try {
		const filePath = join(process.cwd(), "server/data/portfolio.json");
		const data = await fs.readFile(filePath, "utf-8");
		const projects: Project[] = JSON.parse(data);

		const projectIndex = projects.findIndex((p) => p.id === parseInt(id!));

		if (projectIndex === -1) {
			throw createError({
				statusCode: 404,
				statusMessage: "Project not found",
			});
		}

		projects[projectIndex] = {
			...projects[projectIndex],
			...body,
			updatedAt: new Date().toISOString(),
		};

		await fs.writeFile(filePath, JSON.stringify(projects, null, 2));

		return projects[projectIndex];
	} catch {
		throw createError({
			statusCode: 500,
			statusMessage: "Failed to update project",
		});
	}
});
