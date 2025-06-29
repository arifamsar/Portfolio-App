export interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  category: string
  image: string
  demoUrl?: string | null
  githubUrl: string
  featured: boolean
  status: 'completed' | 'in-progress' | 'planned'
  createdAt: string
  updatedAt: string
}

export interface PersonalInfo {
  name: string
  title: string
  bio: string
  location: string
  email: string
  phone?: string
  avatar: string
  socialLinks: {
    github: string
    linkedin: string
    twitter?: string
    website?: string
  }
  skills: string[]
  experience: {
    company: string
    position: string
    duration: string
    description: string
  }[]
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}
