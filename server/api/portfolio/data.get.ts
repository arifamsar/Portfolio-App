import { promises as fs } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (_event) => {
  try {
    const filePath = join(process.cwd(), 'server/data/portfolio.json')
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to read portfolio data'
    })
  }
})
