export default defineNuxtPlugin((nuxtApp) => {
	let loadingElement: HTMLElement | null = null;

	const showLoading = () => {
		// Create loading indicator
		if (!loadingElement) {
			loadingElement = document.createElement("div");
			loadingElement.className = "page-loading";
			document.body.appendChild(loadingElement);
		}
	};

	const hideLoading = () => {
		// Remove loading indicator with delay to allow page transition
		if (loadingElement) {
			setTimeout(() => {
				if (loadingElement && loadingElement.parentNode) {
					loadingElement.parentNode.removeChild(loadingElement);
					loadingElement = null;
				}
			}, 300);
		}
	};

	// Router hooks for loading states
	nuxtApp.hook("page:start", () => {
		showLoading();
	});

	nuxtApp.hook("page:finish", () => {
		hideLoading();
	});

	// Handle route errors
	nuxtApp.hook("vue:error", () => {
		hideLoading();
	});
});
