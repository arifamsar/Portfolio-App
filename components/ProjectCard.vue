<template>
  <Card class="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/20 overflow-hidden bg-card/50 backdrop-blur-sm">
    <!-- Project Image -->
    <div class="relative overflow-hidden h-48 bg-gradient-to-br from-primary/10 to-chart-1/10">
      <img
        v-if="project.image && project.image !== '/projects/placeholder.jpg'"
        :src="project.image"
        :alt="project.title"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      >
      <div v-else class="w-full h-full flex items-center justify-center">
        <div class="text-6xl font-bold text-primary/30">
          {{ project.title.charAt(0) }}
        </div>
      </div>
      
      <!-- Status Badge -->
      <Badge
        :variant="project.status === 'completed' ? 'default' : project.status === 'in-progress' ? 'secondary' : 'outline'"
        class="absolute top-2 right-2 capitalize"
      >
        {{ project.status.replace('-', ' ') }}
      </Badge>

      <!-- Overlay on hover -->
      <div class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div class="flex space-x-2">
          <Button
            v-if="project.demoUrl"
            size="sm"
            variant="secondary"
            class="bg-white/90 hover:bg-white text-primary"
            @click.stop="openDemo"
          >
            <ExternalLink class="h-4 w-4 mr-1" />
            Demo
          </Button>
          <Button
            size="sm"
            variant="secondary"
            class="bg-white/90 hover:bg-white text-primary"
            @click.stop="openGithub"
          >
            <Github class="h-4 w-4 mr-1" />
            Code
          </Button>
        </div>
      </div>
    </div>

    <CardContent class="p-6">
      <!-- Category -->
      <div class="flex items-center justify-between mb-3">
        <Badge variant="outline" class="text-xs">
          {{ project.category }}
        </Badge>
        <div v-if="project.featured" class="text-primary">
          <Star class="h-4 w-4 fill-current" />
        </div>
      </div>

      <!-- Title and Description -->
      <div class="space-y-3 mb-4">
        <h3 class="text-xl font-semibold group-hover:text-primary transition-colors">
          {{ project.title }}
        </h3>
        <p class="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {{ project.description }}
        </p>
      </div>

      <!-- Technologies -->
      <div class="space-y-3">
        <div class="flex flex-wrap gap-1">
          <Badge
            v-for="tech in project.technologies.slice(0, 4)"
            :key="tech"
            variant="secondary"
            class="text-xs px-2 py-1"
          >
            {{ tech }}
          </Badge>
          <Badge
            v-if="project.technologies.length > 4"
            variant="outline"
            class="text-xs px-2 py-1"
          >
            +{{ project.technologies.length - 4 }}
          </Badge>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex space-x-2 mt-4 pt-4 border-t border-border/50">
        <Button
          v-if="project.demoUrl"
          variant="outline"
          size="sm"
          class="flex-1 text-xs"
          @click="openDemo"
        >
          <ExternalLink class="h-3 w-3 mr-1" />
          Live Demo
        </Button>
        <Button
          variant="outline"
          size="sm"
          class="flex-1 text-xs"
          @click="openGithub"
        >
          <Github class="h-3 w-3 mr-1" />
          Source
        </Button>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { ExternalLink, Github, Star } from 'lucide-vue-next'
import type { Project } from '~/types'

interface Props {
  project: Project
}

const props = defineProps<Props>()

const openDemo = () => {
  if (props.project.demoUrl) {
    window.open(props.project.demoUrl, '_blank')
  }
}

const openGithub = () => {
  window.open(props.project.githubUrl, '_blank')
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
