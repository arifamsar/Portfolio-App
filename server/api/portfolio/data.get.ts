// Default portfolio data for production environment
const defaultPortfolioData = [
	{
		id: 1,
		title: "E-Commerce Mobile App",
		description: "Flutter-based e-commerce application with advanced features including real-time notifications, payment integration, and AR product preview.",
		technologies: ["Flutter", "Dart", "Firebase", "Stripe API", "ARCore"],
		category: "Mobile Development",
		image: "/projects/ecommerce-app.jpg",
		demoUrl: "https://demo.example.com",
		githubUrl: "https://github.com/arifamsar/ecommerce-app",
		featured: true,
		status: "completed",
		createdAt: "2024-01-15T00:00:00.000Z",
		updatedAt: "2024-03-20T00:00:00.000Z",
	},
	{
		id: 2,
		title: "AI-Powered Analytics Dashboard",
		description: "Modern web dashboard with machine learning insights, real-time data visualization, and predictive analytics for business intelligence.",
		technologies: ["Vue.js", "TypeScript", "Python", "TensorFlow", "D3.js"],
		category: "Web Development",
		image: "/projects/analytics-dashboard.jpg",
		demoUrl: "https://analytics.example.com",
		githubUrl: "https://github.com/arifamsar/analytics-dashboard",
		featured: true,
		status: "completed",
		createdAt: "2024-02-10T00:00:00.000Z",
		updatedAt: "2024-04-15T00:00:00.000Z",
	},
	{
		id: 3,
		title: "Smart Home IoT System",
		description: "Comprehensive IoT ecosystem for smart home automation with voice control, energy monitoring, and security features.",
		technologies: ["React", "Node.js", "Arduino", "MQTT", "AWS IoT"],
		category: "IoT Development",
		image: "/projects/smart-home.jpg",
		demoUrl: "https://smarthome.example.com",
		githubUrl: "https://github.com/arifamsar/smart-home-iot",
		featured: false,
		status: "in-progress",
		createdAt: "2024-03-05T00:00:00.000Z",
		updatedAt: "2024-05-22T00:00:00.000Z",
	},
];

export default defineEventHandler(async (event) => {
	// Set cache control headers to prevent stale data
	setHeader(event, "Cache-Control", "no-cache, no-store, must-revalidate");
	setHeader(event, "Pragma", "no-cache");
	setHeader(event, "Expires", "0");

	try {
		// Debug logging
		console.log("Environment:", process.env.NODE_ENV);
		console.log("Has cloudflare env:", !!event.context.cloudflare?.env);
		console.log("Has KV_BINDING:", !!event.context.cloudflare?.env?.KV_BINDING);

		// Try to get data from Cloudflare KV first (in production)
		const kv = event.context.cloudflare?.env?.KV_BINDING;
		if (kv) {
			try {
				console.log("Attempting to read from KV...");
				const data = await kv.get("portfolio-data");
				if (data) {
					console.log("Found data in KV, parsing...");
					return JSON.parse(data);
				}
				console.log("No data in KV, storing default data...");
				// If no data in KV, store default data and return it
				await kv.put("portfolio-data", JSON.stringify(defaultPortfolioData));
				console.log("Default data stored in KV");
				return defaultPortfolioData;
			} catch (kvError) {
				console.warn("KV operation failed:", kvError);
			}
		}

		// Development mode: try to read from file system
		if (process.env.NODE_ENV !== "production") {
			try {
				const { promises: fs } = await import("fs");
				const { join } = await import("path");
				const filePath = join(process.cwd(), "server/data/portfolio.json");
				const data = await fs.readFile(filePath, "utf-8");
				const portfolioData = JSON.parse(data);
				return portfolioData;
			} catch (fileError) {
				console.warn("Could not read portfolio.json, using default data:", fileError);
			}
		}

		// Return default data as fallback
		console.log("Returning default data as fallback");
		return defaultPortfolioData;
	} catch (error) {
		console.error("Error reading portfolio data:", error);
		// Return default data as fallback
		return defaultPortfolioData;
	}
});
