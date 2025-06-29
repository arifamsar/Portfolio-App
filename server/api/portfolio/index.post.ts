import { addProject, getNextId } from "~/server/utils/portfolioStorage";
import type { Project } from "~/types";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	try {
		const newId = getNextId();

		const newProject: Project = {
			id: newId,
			...body,
			category: body.category || "Web Development",
			featured: body.featured || false,
			status: body.status || "completed",
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		addProject(newProject);

		return newProject;
	} catch (error) {
		console.error("Failed to create project:", error);
		throw createError({
			statusCode: 500,
			statusMessage: "Failed to create project",
		});
	}
});
