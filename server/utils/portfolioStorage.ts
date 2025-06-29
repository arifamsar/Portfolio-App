import type { Project } from "~/types";
import initialData from "~/server/data/portfolio.json";

// In-memory storage untuk Cloudflare Pages
// PERINGATAN: Data akan hilang setelah function restart
// Untuk production, gunakan Cloudflare KV atau database eksternal
let portfolioData: Project[] = [...initialData];

export function getPortfolioData(): Project[] {
	return portfolioData;
}

export function setPortfolioData(data: Project[]): void {
	portfolioData = [...data];
}

export function addProject(project: Project): void {
	portfolioData.push(project);
}

export function updateProject(id: number, updatedProject: Partial<Project>): Project | null {
	const index = portfolioData.findIndex(p => p.id === id);
	if (index === -1) return null;
	
	portfolioData[index] = { ...portfolioData[index], ...updatedProject, updatedAt: new Date().toISOString() };
	return portfolioData[index];
}

export function deleteProject(id: number): boolean {
	const index = portfolioData.findIndex(p => p.id === id);
	if (index === -1) return false;
	
	portfolioData.splice(index, 1);
	return true;
}

export function getNextId(): number {
	return Math.max(...portfolioData.map(p => p.id), 0) + 1;
}
