<template>
  <div class="container mx-auto px-4 pt-20">
    <!-- Header Section -->
    <section class="py-16 text-center">
      <div class="max-w-3xl mx-auto space-y-6">
        <h1 class="text-4xl md:text-6xl font-bold">
          <span class="bg-gradient-to-r from-foreground via-primary to-chart-1 bg-clip-text text-transparent">
            My Portfolio
          </span>
        </h1>
        <p class="text-lg text-muted-foreground">
          Explore my mobile development projects, from innovative apps to complex systems
        </p>
      </div>
    </section>

    <!-- Filters and Search -->
    <section class="py-8">
      <div class="max-w-4xl mx-auto">
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
          <!-- Search -->
          <div class="relative flex-1 max-w-md">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              v-model="searchQuery"
              placeholder="Search projects..."
              class="pl-10"
            />
          </div>

          <!-- Filters -->
          <div class="flex flex-wrap gap-2">
            <Button
              v-for="category in categories"
              :key="category"
              :variant="selectedCategory === category ? 'default' : 'outline'"
              size="sm"
              @click="selectedCategory = category"
            >
              {{ category }}
            </Button>
          </div>

          <!-- Sort -->
          <Select v-model="sortBy">
            <SelectTrigger class="w-48">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="title">Title A-Z</SelectItem>
              <SelectItem value="category">Category</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="py-8">
      <div class="max-w-7xl mx-auto">
        <!-- Loading State -->
        <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card v-for="i in 6" :key="i" class="h-96 animate-pulse">
            <div class="h-48 bg-muted" />
            <CardContent class="p-6 space-y-3">
              <div class="h-4 bg-muted rounded w-3/4" />
              <div class="h-4 bg-muted rounded w-1/2" />
              <div class="space-y-2">
                <div class="h-3 bg-muted rounded" />
                <div class="h-3 bg-muted rounded w-5/6" />
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Projects -->
        <div v-else-if="filteredProjects.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard
            v-for="project in filteredProjects"
            :key="project.id"
            :project="project"
            class="hover:scale-105 transition-transform duration-300"
          />
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20">
          <div class="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
            <FolderOpen class="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 class="text-xl font-semibold mb-2">No Projects Found</h3>
          <p class="text-muted-foreground mb-6">
            {{ searchQuery ? 'Try adjusting your search terms' : 'Try changing your filters' }}
          </p>
          <Button variant="outline" @click="clearFilters">
            Clear Filters
          </Button>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-card/30 rounded-lg my-16">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-12">Project Statistics</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="space-y-2">
            <div class="text-3xl font-bold text-primary">{{ stats.total }}</div>
            <div class="text-muted-foreground">Total Projects</div>
          </div>
          <div class="space-y-2">
            <div class="text-3xl font-bold text-chart-1">{{ stats.completed }}</div>
            <div class="text-muted-foreground">Completed</div>
          </div>
          <div class="space-y-2">
            <div class="text-3xl font-bold text-chart-2">{{ stats.inProgress }}</div>
            <div class="text-muted-foreground">In Progress</div>
          </div>
          <div class="space-y-2">
            <div class="text-3xl font-bold text-chart-3">{{ stats.technologies }}</div>
            <div class="text-muted-foreground">Technologies</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 text-center">
      <div class="max-w-2xl mx-auto space-y-6">
        <h2 class="text-3xl font-bold">Have a Project in Mind?</h2>
        <p class="text-muted-foreground text-lg">
          Let's collaborate and bring your ideas to life with cutting-edge mobile solutions
        </p>
        <Button
          size="lg"
          class="bg-gradient-to-r from-primary to-chart-1 hover:from-primary/90 hover:to-chart-1/90 text-white"
          @click="navigateTo('/contact')"
        >
          Start a Project
          <ArrowRight class="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Search, FolderOpen, ArrowRight } from 'lucide-vue-next'
import type { Project } from '~/types'

// SEO
useSeoMeta({
  title: 'Portfolio - Muhammad Arif Amsar',
  description: 'Browse my mobile development portfolio featuring Flutter, React Native, and Android projects.',
  ogTitle: 'Portfolio - Muhammad Arif Amsar',
  ogDescription: 'Mobile development projects and applications'
})

// Data
const { data: projects, pending } = await useLazyFetch<Project[]>('/api/portfolio')

// Reactive state
const searchQuery = ref('')
const selectedCategory = ref('All')
const sortBy = ref('newest')

// Computed
const categories = computed(() => {
  if (!projects.value) return ['All']
  const cats = [...new Set(projects.value.map(p => p.category))]
  return ['All', ...cats]
})

const filteredProjects = computed(() => {
  if (!projects.value) return []
  
  let filtered = projects.value

  // Filter by category
  if (selectedCategory.value !== 'All') {
    filtered = filtered.filter(p => p.category === selectedCategory.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.technologies.some(tech => tech.toLowerCase().includes(query))
    )
  }

  // Sort
  switch (sortBy.value) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      break
    case 'oldest':
      filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      break
    case 'title':
      filtered.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'category':
      filtered.sort((a, b) => a.category.localeCompare(b.category))
      break
  }

  return filtered
})

const stats = computed(() => {
  if (!projects.value) return { total: 0, completed: 0, inProgress: 0, technologies: 0 }
  
  const allTech = new Set()
  projects.value.forEach(p => p.technologies.forEach(tech => allTech.add(tech)))
  
  return {
    total: projects.value.length,
    completed: projects.value.filter(p => p.status === 'completed').length,
    inProgress: projects.value.filter(p => p.status === 'in-progress').length,
    technologies: allTech.size
  }
})

// Methods
const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'All'
  sortBy.value = 'newest'
}
</script>
