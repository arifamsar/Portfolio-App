import { getPortfolioData } from "~/server/utils/portfolioStorage";

export default defineEventHandler(async (_event) => {
	try {
		return getPortfolioData();
	} catch (error) {
		console.error("Failed to read portfolio data:", error);
		throw createError({
			statusCode: 500,
			statusMessage: "Failed to read portfolio data",
		});
	}
});
