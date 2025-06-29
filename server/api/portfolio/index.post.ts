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
	const body = await readBody(event);

	try {
		const filePath = join(process.cwd(), "server/data/portfolio.json");
		const data = await fs.readFile(filePath, "utf-8");
		const projects: Project[] = JSON.parse(data);

		// Generate new ID
		const newId = Math.max(...projects.map((p: Project) => p.id), 0) + 1;

		const newProject: Project = {
			id: newId,
			...body,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		projects.push(newProject);

		await fs.writeFile(filePath, JSON.stringify(projects, null, 2));

		return newProject;
	} catch {
		throw createError({
			statusCode: 500,
			statusMessage: "Failed to create project",
		});
	}
});
