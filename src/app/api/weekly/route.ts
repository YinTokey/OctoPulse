import githubAPI from "@/utils/githubAPI";
import { TrendInfo } from "@/types/github";

export async function POST() {

    const trendingRepos = await githubAPI.trending("weekly", "javascript") as TrendInfo[];
    const reposDetails = await Promise.all(
        trendingRepos.map((repo) => githubAPI.repoInfo(repo.author, repo.name))
    );

    return new Response(
        JSON.stringify({
            message: "Weekly report task executed",
            repos: reposDetails.map((repo) => repo.data),
        }),
        {
            status: 200,
            headers: { "Content-Type": "application/json" },
        }
    );
}