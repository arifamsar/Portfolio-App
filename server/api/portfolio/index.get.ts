export default defineEventHandler(async (_event) => {
  try {
    const projects = await $fetch('/api/portfolio/data')
    return projects
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch portfolio data'
    })
  }
})
