import githubAPI from "@/utils/githubAPI";
import { TrendInfo } from "@/types/github";

export async function POST() {

    const trendingRepos = await githubAPI.trending("weekly", "javascript") as TrendInfo[];

    const reposDetails = await Promise.all(
        trendingRepos.map(async (repo) => {
            const { data: contributors } = await githubAPI.contributors(repo.author, repo.name);
            const { data: details } = await githubAPI.repoInfo(repo.author, repo.name);
            return {
                ...details,
                contributors: contributors.length,
                // lastUpdate: formatUpdatedAt(details.updated_at),
            };
        })
    );

    console.log(reposDetails[0])


    return new Response(
        JSON.stringify({
            message: "Weekly report task executed",
            repos: reposDetails,
        }),
        {
            status: 200,
            headers: { "Content-Type": "application/json" },
        }
    );
}