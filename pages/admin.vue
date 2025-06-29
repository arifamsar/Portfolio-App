<template>
  <div class="container mx-auto px-4 pt-20">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold">Admin Dashboard</h1>
        <p class="text-muted-foreground">Manage your portfolio projects</p>
      </div>
      <Button 
        class="bg-gradient-to-r from-primary to-chart-1 hover:from-primary/90 hover:to-chart-1/90 text-white"
        @click="openCreateDialog"
      >
        <Plus class="mr-2 h-4 w-4" />
        Add Project
      </Button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardContent class="p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
              <FolderOpen class="h-6 w-6 text-primary" />
            </div>
            <div>
              <p class="text-sm font-medium text-muted-foreground">Total Projects</p>
              <p class="text-2xl font-bold">{{ stats.total }}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent class="p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mr-4">
              <CheckCircle class="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p class="text-sm font-medium text-muted-foreground">Completed</p>
              <p class="text-2xl font-bold">{{ stats.completed }}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent class="p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mr-4">
              <Clock class="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p class="text-sm font-medium text-muted-foreground">In Progress</p>
              <p class="text-2xl font-bold">{{ stats.inProgress }}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent class="p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mr-4">
              <Star class="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p class="text-sm font-medium text-muted-foreground">Featured</p>
              <p class="text-2xl font-bold">{{ stats.featured }}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Projects Table -->
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
        <CardDescription>Manage all your portfolio projects</CardDescription>
      </CardHeader>
      <CardContent>
        <!-- Loading State -->
        <div v-if="pending" class="space-y-4">
          <div v-for="i in 5" :key="i" class="h-16 bg-muted animate-pulse rounded" />
        </div>

        <!-- Projects List -->
        <div v-else-if="projects?.length" class="space-y-4">
          <div
            v-for="project in projects"
            :key="project.id"
            class="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:border-primary/20 transition-colors"
          >
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-gradient-to-br from-primary/20 to-chart-1/20 rounded-lg flex items-center justify-center">
                <span class="text-lg font-bold text-primary">{{ project.title.charAt(0) }}</span>
              </div>
              <div>
                <div class="flex items-center space-x-2">
                  <h3 class="font-semibold">{{ project.title }}</h3>
                  <Badge v-if="project.featured" variant="secondary" class="text-xs">
                    <Star class="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                  <Badge
                    :variant="project.status === 'completed' ? 'default' : project.status === 'in-progress' ? 'secondary' : 'outline'"
                    class="text-xs capitalize"
                  >
                    {{ project.status.replace('-', ' ') }}
                  </Badge>
                </div>
                <p class="text-sm text-muted-foreground">{{ project.category }}</p>
              </div>
            </div>
            
            <div class="flex items-center space-x-2">
              <Button variant="ghost" size="sm" @click="editProject(project)">
                <Edit class="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" @click="deleteProject(project)">
                <Trash2 class="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <FolderOpen class="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 class="text-lg font-semibold mb-2">No projects yet</h3>
          <p class="text-muted-foreground mb-4">Create your first project to get started</p>
          <Button @click="openCreateDialog">
            <Plus class="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Project Form Dialog -->
    <Dialog v-model:open="isDialogOpen">
      <DialogContent class="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{{ editingProject ? 'Edit Project' : 'Create New Project' }}</DialogTitle>
          <DialogDescription>
            {{ editingProject ? 'Update project information' : 'Add a new project to your portfolio' }}
          </DialogDescription>
        </DialogHeader>
        
        <form class="space-y-6" @submit.prevent="saveProject">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="title">Title *</Label>
              <Input
                id="title"
                v-model="form.title"
                placeholder="Project title"
                required
              />
            </div>
            <div class="space-y-2">
              <Label for="category">Category *</Label>
              <Input
                id="category"
                v-model="form.category"
                placeholder="e.g., Mobile Development"
                required
              />
            </div>
          </div>

          <div class="space-y-2">
            <Label for="description">Description *</Label>
            <Textarea
              id="description"
              v-model="form.description"
              placeholder="Detailed project description"
              rows="4"
              required
            />
          </div>

          <div class="space-y-2">
            <Label for="technologies">Technologies *</Label>
            <Input
              id="technologies"
              v-model="technologiesInput"
              placeholder="Flutter, React Native, Firebase (comma separated)"
              required
            />
            <p class="text-xs text-muted-foreground">Separate technologies with commas</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="image">Image URL</Label>
              <Input
                id="image"
                v-model="form.image"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div class="space-y-2">
              <Label for="githubUrl">GitHub URL *</Label>
              <Input
                id="githubUrl"
                v-model="form.githubUrl"
                placeholder="https://github.com/username/repo"
                required
              />
            </div>
          </div>

          <div class="space-y-2">
            <Label for="demoUrl">Demo URL</Label>
            <Input
              id="demoUrl"
              v-model="form.demoUrl"
              placeholder="https://demo.example.com"
            />
          </div>

          <div class="flex items-center space-x-6">
            <div class="flex items-center space-x-2">
              <Checkbox id="featured" v-model:checked="form.featured" />
              <Label for="featured">Featured project</Label>
            </div>
            
            <div class="space-y-2">
              <Label for="status">Status</Label>
              <Select v-model="form.status">
                <SelectTrigger class="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="planned">Planned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" @click="closeDialog">
              Cancel
            </Button>
            <Button type="submit" :disabled="isSubmitting">
              <Loader2 v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" />
              {{ editingProject ? 'Update' : 'Create' }} Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

    <!-- Delete Confirmation Dialog -->
    <Dialog v-model:open="isDeleteDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{{ projectToDelete?.title }}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" @click="isDeleteDialogOpen = false">
            Cancel
          </Button>
          <Button variant="destructive" :disabled="isSubmitting" @click="confirmDelete">
            <Loader2 v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { Plus, FolderOpen, Edit, Trash2, CheckCircle, Clock, Star, Loader2 } from 'lucide-vue-next'
import type { Project } from '~/types'

// SEO
useSeoMeta({
  title: 'Admin Dashboard - Muhammad Arif Amsar',
  description: 'Portfolio management dashboard'
})

// Data
const { data: projects, pending, refresh } = await useLazyFetch<Project[]>('/api/portfolio')

// State
const isDialogOpen = ref(false)
const isDeleteDialogOpen = ref(false)
const isSubmitting = ref(false)
const editingProject = ref<Project | null>(null)
const projectToDelete = ref<Project | null>(null)

// Form
const form = reactive({
  title: '',
  description: '',
  technologies: [] as string[],
  category: '',
  image: '',
  demoUrl: '',
  githubUrl: '',
  featured: false,
  status: 'in-progress' as 'completed' | 'in-progress' | 'planned'
})

const technologiesInput = ref('')

// Computed
const stats = computed(() => {
  if (!projects.value) return { total: 0, completed: 0, inProgress: 0, featured: 0 }
  
  return {
    total: projects.value.length,
    completed: projects.value.filter(p => p.status === 'completed').length,
    inProgress: projects.value.filter(p => p.status === 'in-progress').length,
    featured: projects.value.filter(p => p.featured).length
  }
})

// Methods
const openCreateDialog = () => {
  editingProject.value = null
  resetForm()
  isDialogOpen.value = true
}

const editProject = (project: Project) => {
  editingProject.value = project
  fillForm(project)
  isDialogOpen.value = true
}

const deleteProject = (project: Project) => {
  projectToDelete.value = project
  isDeleteDialogOpen.value = true
}

const resetForm = () => {
  Object.assign(form, {
    title: '',
    description: '',
    technologies: [],
    category: '',
    image: '',
    demoUrl: '',
    githubUrl: '',
    featured: false,
    status: 'in-progress'
  })
  technologiesInput.value = ''
}

const fillForm = (project: Project) => {
  Object.assign(form, {
    title: project.title,
    description: project.description,
    technologies: [...project.technologies],
    category: project.category,
    image: project.image,
    demoUrl: project.demoUrl || '',
    githubUrl: project.githubUrl,
    featured: project.featured,
    status: project.status
  })
  technologiesInput.value = project.technologies.join(', ')
}

const saveProject = async () => {
  if (isSubmitting.value) return
  
  isSubmitting.value = true
  
  try {
    // Parse technologies
    form.technologies = technologiesInput.value
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech.length > 0)
    
    const projectData = {
      ...form,
      demoUrl: form.demoUrl || null
    }
    
    if (editingProject.value) {
      // Update existing project
      await $fetch(`/api/portfolio/${editingProject.value.id}`, {
        method: 'PUT',
        body: projectData
      })
    } else {
      // Create new project
      await $fetch('/api/portfolio', {
        method: 'POST',
        body: projectData
      })
    }
    
    await refresh()
    closeDialog()
  } catch (error) {
    console.error('Error saving project:', error)
    alert('Error saving project. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

const confirmDelete = async () => {
  if (!projectToDelete.value || isSubmitting.value) return
  
  isSubmitting.value = true
  
  try {
    await $fetch(`/api/portfolio/${projectToDelete.value.id}`, {
      method: 'DELETE'
    })
    
    await refresh()
    isDeleteDialogOpen.value = false
    projectToDelete.value = null
  } catch (error) {
    console.error('Error deleting project:', error)
    alert('Error deleting project. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

const closeDialog = () => {
  isDialogOpen.value = false
  editingProject.value = null
  resetForm()
}

// Watch for technologies input changes
watch(technologiesInput, (value) => {
  form.technologies = value
    .split(',')
    .map(tech => tech.trim())
    .filter(tech => tech.length > 0)
})
</script>
