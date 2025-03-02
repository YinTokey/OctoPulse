import Head from 'next/head';
import dynamic from 'next/dynamic';
import axios from "axios";
import { RepoDetails, RepoResponse} from "@/types/github";

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
        updatedAt: new Date(apiRepo.updated_at).toLocaleDateString(),
        // Simulate historical trend data for the chart
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

// Dynamically import the client-only chart component
const RepoChart = dynamic(() => import('@/app/components/ReportChart'), { ssr: true });

export default async function Page() {

    // Fetch the array of trending repositories.
    const resp = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/weekly');
    const rawRepos = resp.data.repos;
    const repos: RepoDetails[] = rawRepos.map((rawRepo: RepoResponse) => mapRepoData(rawRepo));

    return (
        <>
            <Head>
                <title>Weekly GitHub Trend Report</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* Tailwind CSS */}
                <link
                    href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
                    rel="stylesheet"
                />
            </Head>

            <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
                {/* Overview Section */}
                <header className="text-center mb-10">
                    <h1 className="text-5xl font-extrabold text-blue-700">
                        Weekly GitHub Trend Report
                    </h1>
                    <p className="text-gray-600 mt-2 text-lg">
                        A snapshot of top trending repositories and their performance metrics
                    </p>
                </header>

                <div className="border-t-2 border-gray-200 my-8"></div>

                {/* Render each repository details */}
                {repos.map((repo) => (
                    <section key={repo.id} className="mb-10">
                        <h2 className="text-4xl font-bold mb-6 text-blue-700">{repo.name}</h2>
                        <div className="card border rounded p-6 mb-10">
                            <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                                <div className="md:w-2/3">
                                    <h3 className="text-3xl font-semibold text-blue-800">{repo.fullName}</h3>
                                    <p className="text-gray-700 mt-2">{repo.description}</p>
                                    <ul className="list-disc list-inside text-gray-600 text-base mt-2">
                                        <li>Real-time GitHub API integration</li>
                                        <li>Interactive analytics dashboard</li>
                                        <li>Automated AI-generated insights</li>
                                        <li>Modular architecture for scalability</li>
                                    </ul>
                                </div>
                                <div className="mt-4 md:mt-0 md:w-1/3">
                                    <div className="relative" style={{ height: '200px' }}>
                                        {/* RepoChart is a client component that handles Chart.js */}
                                        <RepoChart trendData={repo.trendData} />
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Key Metrics */}
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-gray-600 text-base">
                                <div>
                                    <strong className="text-green-600">⭐ Stars:</strong> {repo.stars}
                                </div>
                                <div>
                                    <strong className="text-purple-600">🍴 Forks:</strong> {repo.forks}
                                </div>
                                <div>
                                    <strong className="text-blue-600">👀 Watchers:</strong> {repo.watchers}
                                </div>
                                <div>
                                    <strong>❗ Open Issues:</strong> {repo.openIssues}
                                </div>
                                <div>
                                    <strong>Language:</strong>{' '}
                                    <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {repo.language}
                  </span>
                                </div>
                                <div>
                                    <strong>Last Update:</strong> {repo.updatedAt}
                                </div>
                            </div>
                        </div>
                    </section>
                ))}

                {/* Footer */}
                <footer className="text-center text-gray-500 mt-10">
                    <p>&copy; 2025 GitHub Trend Report. All rights reserved.</p>
                    <p className="mt-2">
                        <a href="#" className="text-blue-500 hover:underline">
                            View Full Report Online
                        </a>
                    </p>
                </footer>
            </div>
        </>
    );
}