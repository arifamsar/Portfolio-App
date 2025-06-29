// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	compatibilityDate: "2025-05-15",
	devtools: { enabled: true },
	modules: ["@nuxt/eslint", "shadcn-nuxt", "@vueuse/nuxt", "@nuxtjs/color-mode"],
	css: ["~/assets/css/tailwind.css"],
	vite: {
		plugins: [tailwindcss()],
	},
	colorMode: {
		preference: "system", // default value of $colorMode.preference
		fallback: "light", // fallback value if not system preference found
		hid: "nuxt-color-mode-script",
		globalName: "__NUXT_COLOR_MODE__",
		componentName: "ColorScheme",
		classPrefix: "",
		classSuffix: "",
		storageKey: "nuxt-color-mode",
		dataValue: "theme", // Add data attribute for better compatibility
	},
	shadcn: {
		/**
		 * Prefix for all the imported component
		 */
		prefix: "",
		/**
		 * Directory that the component lives in.
		 * @default "./components/ui"
		 */
		componentDir: "./components/ui",
	},
	nitro: {
		preset: "cloudflare-pages",
		experimental: {
			wasm: true,
		},
		compatibilityDate: "2024-06-29",
		storage: {
			redis: {
				driver: "cloudflare-kv-binding",
				binding: "KV_BINDING", // KV namespace binding name
			},
		},
		rollupConfig: {
			external: ["__STATIC_CONTENT_MANIFEST"],
		},
	},
	ssr: true,
	routeRules: {
		// Homepage will fetch data dynamically to ensure fresh data
		"/": { ssr: true, prerender: false, headers: { "cache-control": "no-cache" } },
		// Portfolio page will fetch data dynamically
		"/portfolio": { ssr: true, prerender: false, headers: { "cache-control": "no-cache" } },
		// Admin pages are SPA mode
		"/admin/**": { ssr: false },
		// API routes use Cloudflare Workers with no cache for portfolio data
		"/api/portfolio/**": { cors: true, headers: { "cache-control": "no-cache, no-store, must-revalidate" } },
		"/api/**": { cors: true },
	},
});
