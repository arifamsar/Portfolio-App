<template>
	<NuxtLayout>
		<NuxtRouteAnnouncer />
		<NuxtPage />
		<Toaster />
	</NuxtLayout>
</template>

<script setup lang="ts">
	import Toaster from "~/components/ui/toast/Toaster.vue";
</script>
