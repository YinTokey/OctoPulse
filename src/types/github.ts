type TrendInfo = {
    author: string,
    name: string,
    href: string,
    description: string,
    language: string,
    stars: number,
    forks: number,
    starsInPeriod: number
}

type RepoDetails = {
    id: number;
    name: string;
    fullName: string;
    description: string;
    stars: number;
    forks: number;
    watchers: number;
    openIssues: number;
    language: string;
    updatedAt: string;
    trendData: {
        labels: string[];
        data: number[];
        color: string;
    };
};

type RepoResponse = {
    id: number;
    name: string;
    full_name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    watchers_count: number;
    open_issues_count: number;
    language: string;
    updated_at: string;
};


export type { TrendInfo, RepoDetails, RepoResponse }