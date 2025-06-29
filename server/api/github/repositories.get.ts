interface GitHubRepository {
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
	license: { name: string } | null;
	visibility: string;
}

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const username = (query.username as string) || "arifamsar"; // Default username

	try {
		// Fetch repositories from GitHub API
		const response = await $fetch<GitHubRepository[]>(`https://api.github.com/users/${username}/repos`, {
			query: {
				sort: "updated",
				per_page: 30,
				type: "owner",
			},
			headers: {
				"User-Agent": "Portfolio-App",
				Accept: "application/vnd.github.v3+json",
			},
		});

		// Transform the data to match our needs
		const repositories = response.map((repo) => ({
			id: repo.id,
			name: repo.name,
			full_name: repo.full_name,
			description: repo.description,
			html_url: repo.html_url,
			clone_url: repo.clone_url,
			language: repo.language,
			stargazers_count: repo.stargazers_count,
			forks_count: repo.forks_count,
			size: repo.size,
			created_at: repo.created_at,
			updated_at: repo.updated_at,
			pushed_at: repo.pushed_at,
			topics: repo.topics || [],
			private: repo.private,
			fork: repo.fork,
			archived: repo.archived,
			disabled: repo.disabled,
			default_branch: repo.default_branch,
			open_issues_count: repo.open_issues_count,
			license: repo.license?.name || null,
			visibility: repo.visibility,
		}));

		return {
			success: true,
			data: repositories,
			total: repositories.length,
			username,
		};
	} catch (error: unknown) {
		console.error("GitHub API Error:", error);

		const err = error as { status?: number; message?: string };
		throw createError({
			statusCode: err.status || 500,
			statusMessage: err.message || "Failed to fetch GitHub repositories",
		});
	}
});
