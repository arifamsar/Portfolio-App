export interface Project {
	id: number;
	title: string;
	description: string;
	technologies: string[];
	category: string;
	image: string;
	demoUrl?: string | null;
	githubUrl?: string;
	github?: string; // alias for githubUrl
	live?: string; // alias for demoUrl
	featured: boolean;
	status: "completed" | "in-progress" | "planned";
	createdAt: string;
	updatedAt: string;
}

export interface PersonalInfo {
	name: string;
	title: string;
	bio: string;
	location: string;
	email: string;
	phone?: string;
	avatar: string;
	socialLinks: {
		github: string;
		linkedin: string;
		twitter?: string;
		website?: string;
	};
	skills: string[];
	experience: {
		company: string;
		position: string;
		duration: string;
		description: string;
	}[];
}

export interface ContactForm {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export interface GitHubRepo {
	id: number;
	name: string;
	full_name: string;
	description: string | null;
	html_url: string;
	clone_url: string;
	language: string | null;
	stargazers_count: number;
	forks_count: number;
	size: number;
	created_at: string;
	updated_at: string;
	pushed_at: string;
	topics: string[];
	private: boolean;
	fork: boolean;
	archived: boolean;
	disabled: boolean;
	default_branch: string;
	open_issues_count: number;
	license: string | null;
	visibility: string;
}

export interface GitHubApiResponse {
	success: boolean;
	data: GitHubRepo[];
	total: number;
	username: string;
}
