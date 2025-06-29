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
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  }
});
