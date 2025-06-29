<template>
	<Teleport to="body">
		<div class="fixed bottom-0 right-0 p-4 z-[100] flex flex-col gap-2 max-w-sm w-full">
			<TransitionGroup
				name="toast"
				tag="div"
				class="flex flex-col gap-2"
			>
				<Toast
					v-for="toast in toasts"
					:key="toast.id"
					:title="toast.title"
					:description="toast.description"
					:action="toast.action"
					:variant="toast.variant"
					@close="removeToast(toast.id)"
				/>
			</TransitionGroup>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
	import Toast from "./Toast.vue";
	import { useToast } from "~/composables/useToast";

	const { toasts, removeToast } = useToast();
</script>

<style scoped>
	.toast-move,
	.toast-enter-active,
	.toast-leave-active {
		transition: all 0.3s ease;
	}

	.toast-enter-from {
		opacity: 0;
		transform: translateX(100%);
	}

	.toast-leave-to {
		opacity: 0;
		transform: translateX(100%);
	}

	.toast-leave-active {
		position: absolute;
		right: 1rem;
	}
</style>
