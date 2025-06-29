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
		storage: {
			redis: {
				driver: "cloudflare-kv-binding",
				binding: "KV", // KV namespace binding name
			},
		},
		rollupConfig: {
			external: ["__STATIC_CONTENT_MANIFEST"],
		},
	},
	ssr: true,
	routeRules: {
		// Homepage pre-rendered at build time
		"/": { prerender: true },
		// Admin pages are SPA mode
		"/admin/**": { ssr: false },
		// API routes use Cloudflare Workers
		"/api/**": { cors: true, headers: { "cache-control": "max-age=300" } },
	},
});
