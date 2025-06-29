export interface ToastAction {
	label: string;
	onClick: () => void;
}

export interface Toast {
	id: string;
	title?: string;
	description?: string;
	action?: ToastAction;
	variant?: "default" | "destructive" | "success" | "warning";
	duration?: number;
}

export const useToast = () => {
	const toasts = ref<Toast[]>([]);

	const addToast = (toast: Omit<Toast, "id">) => {
		const id = Math.random().toString(36).substr(2, 9);
		const newToast: Toast = {
			id,
			duration: 5000,
			...toast,
		};

		toasts.value.push(newToast);

		if (newToast.duration && newToast.duration > 0) {
			setTimeout(() => {
				removeToast(id);
			}, newToast.duration);
		}

		return id;
	};

	const removeToast = (id: string) => {
		const index = toasts.value.findIndex((toast) => toast.id === id);
		if (index !== -1) {
			toasts.value.splice(index, 1);
		}
	};

	const toast = (toast: Omit<Toast, "id">) => addToast(toast);

	// Convenience methods
	toast.success = (title: string, description?: string) => addToast({ title, description, variant: "success" });

	toast.error = (title: string, description?: string) => addToast({ title, description, variant: "destructive" });

	toast.warning = (title: string, description?: string) => addToast({ title, description, variant: "warning" });

	return {
		toasts: readonly(toasts),
		toast,
		removeToast,
	};
};
