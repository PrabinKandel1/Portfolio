/**
 * GitHub Integration Engine
 * Connects to public API for Prabin369 without authentication.
 */
document.addEventListener("DOMContentLoaded", () => {
    const GITHUB_USERNAME = "Prabin369";
    const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`;
    const repoContainer = document.getElementById("github-repo-grid");

    if (!repoContainer) return;

    // Premium Skeleton Loader
    const renderSkeletons = () => {
        repoContainer.innerHTML = Array(4).fill(`
            <div class="animate-pulse flex flex-col p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 h-40">
                <div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-4"></div>
                <div class="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full mb-2"></div>
                <div class="h-3 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-auto"></div>
                <div class="flex gap-3 mt-4">
                    <div class="h-3 bg-gray-200 dark:bg-gray-800 rounded w-12"></div>
                    <div class="h-3 bg-gray-200 dark:bg-gray-800 rounded w-12"></div>
                </div>
            </div>
        `).join("");
    };

    const fetchRepos = async () => {
        renderSkeletons();
        try {
            const response = await fetch(GITHUB_API_URL);
            if (!response.ok) throw new Error("Network response failed");
            const repos = await response.json();
            
            repoContainer.innerHTML = repos.map(repo => `
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="group flex flex-col p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all duration-300">
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">${repo.name}</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-auto">${repo.description || "No description provided."}</p>
                    <div class="flex items-center gap-4 mt-4 text-xs font-medium text-gray-400 dark:text-gray-500">
                        ${repo.language ? `<span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-blue-500"></span>${repo.language}</span>` : ""}
                        <span class="flex items-center gap-1">⭐ ${repo.stargazers_count}</span>
                    </div>
                </a>
            `).join("");
        } catch (error) {
            repoContainer.innerHTML = `
                <div class="col-span-full p-6 text-center rounded-2xl bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/20">
                    <p class="text-sm font-medium">Unable to load GitHub repositories at this time.</p>
                    <button onclick="window.open('https://github.com/${GITHUB_USERNAME}', '_blank')" class="mt-2 text-xs underline opacity-80 hover:opacity-100">View profile directly</button>
                </div>
            `;
        }
    };

    fetchRepos();
});