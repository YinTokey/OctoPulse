
import githubAPI from "@/utils/githubAPI";
import {RepoDetails, RepoResponse, TrendInfo} from "@/types/github";
import { formatUpdatedAt } from "@/utils/date";
import ReportTemplate from '@/app/components/ReportTemplate';
import { sendEmail } from "@/utils/mailer";
import { render } from '@react-email/render';

function mapRepoData(apiRepo: RepoResponse): RepoDetails {
    return {
        id: apiRepo.id,
        name: apiRepo.name,
        fullName: apiRepo.full_name,
        description: apiRepo.description,
        stars: apiRepo.stargazers_count,
        forks: apiRepo.forks_count,
        watchers: apiRepo.watchers_count,
        openIssues: apiRepo.open_issues_count,
        language: apiRepo.language,
        html_url: apiRepo.html_url,
        contributors: apiRepo.contributors,
        updatedAt: formatUpdatedAt(apiRepo.updated_at),
        trendData: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            data: [
                apiRepo.stargazers_count - 500,
                apiRepo.stargazers_count - 400,
                apiRepo.stargazers_count - 300,
                apiRepo.stargazers_count - 200,
                apiRepo.stargazers_count,
            ],
            color: 'rgba(54, 162, 235, 1)', // Blue for steady growth
        },
    };
}

export async function GET() {

    const trendingRepos = await githubAPI.trending("weekly", "javascript") as TrendInfo[];

    const reposDetails = await Promise.all(
        trendingRepos.map(async (repo) => {
            const { data: contributors } = await githubAPI.contributors(repo.author, repo.name);
            const { data: details } = await githubAPI.repoInfo(repo.author, repo.name);
            return {
                ...details,
                contributors: contributors.length,
            };
        })
    );

    const repos: RepoDetails[] = reposDetails.map((rawRepo: RepoResponse) => mapRepoData(rawRepo));

    const emailHtml = await render(<ReportTemplate repos={repos} />);
    console.log(emailHtml.length)
    await sendEmail(process.env.TEST_EMAIL || '', 'Weekly Report', emailHtml);

    return new Response(
        JSON.stringify({
            message: "Weekly report task executed",
            repos: repos
        }),
        {
            status: 200,
            headers: { "Content-Type": "application/json" },
        }
    );
}