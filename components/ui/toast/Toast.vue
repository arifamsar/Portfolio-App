<template>
	<div
		v-if="visible"
		class="fixed bottom-4 right-4 z-[100] max-w-sm w-full"
		:class="['transform transition-all duration-300 ease-in-out', visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0']"
	>
		<div
			class="relative p-4 rounded-lg shadow-lg border backdrop-blur-sm"
			:class="variantClasses"
		>
			<!-- Close button -->
			<Button
				variant="ghost"
				size="icon"
				class="absolute top-2 right-2 h-6 w-6 rounded-full"
				@click="$emit('close')"
			>
				<X class="h-3 w-3" />
			</Button>

			<!-- Content -->
			<div class="pr-8">
				<div
					v-if="title"
					class="font-semibold text-sm mb-1"
				>
					{{ title }}
				</div>
				<div
					v-if="description"
					class="text-sm opacity-90"
				>
					{{ description }}
				</div>

				<!-- Action button -->
				<div
					v-if="action"
					class="mt-3"
				>
					<Button
						variant="outline"
						size="sm"
						class="h-8 text-xs"
						@click="action.onClick"
					>
						{{ action.label }}
					</Button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Button } from "~/components/ui/button";
	import { X } from "lucide-vue-next";
	import type { ToastAction } from "~/composables/useToast";

	interface Props {
		title?: string;
		description?: string;
		action?: ToastAction;
		variant?: "default" | "destructive" | "success" | "warning";
		visible?: boolean;
	}

	const props = withDefaults(defineProps<Props>(), {
		title: undefined,
		description: undefined,
		action: undefined,
		variant: "default",
		visible: true,
	});

	defineEmits<{
		close: [];
	}>();

	const variantClasses = computed(() => {
		switch (props.variant) {
			case "destructive":
				return "bg-destructive/90 text-destructive-foreground border-destructive/20";
			case "success":
				return "bg-green-500/90 text-white border-green-500/20";
			case "warning":
				return "bg-yellow-500/90 text-white border-yellow-500/20";
			default:
				return "bg-background/90 text-foreground border-border";
		}
	});
</script>
