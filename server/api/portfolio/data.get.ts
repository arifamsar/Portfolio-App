import { promises as fs } from "fs";
import { join } from "path";

export default defineEventHandler(async (event) => {
	try {
		// Try to get data from Cloudflare KV first (in production)
		if (process.env.NODE_ENV === "production") {
			const kv = event.context.cloudflare?.env?.KV;
			if (kv) {
				const data = await kv.get("portfolio-data");
				if (data) {
					return JSON.parse(data);
				}
			}
		}

		// Fallback to file system (development/preview)
		const filePath = join(process.cwd(), "server/data/portfolio.json");
		const data = await fs.readFile(filePath, "utf-8");
		const portfolioData = JSON.parse(data);

		// Store in KV for future requests (if available)
		if (process.env.NODE_ENV === "production") {
			const kv = event.context.cloudflare?.env?.KV;
			if (kv) {
				await kv.put("portfolio-data", JSON.stringify(portfolioData));
			}
		}

		return portfolioData;
	} catch (error) {
		console.error("Error reading portfolio data:", error);
		throw createError({
			statusCode: 500,
			statusMessage: "Failed to read portfolio data",
		});
	}
});
