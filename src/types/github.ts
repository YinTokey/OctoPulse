interface TrendInfo {
    author: string,
    name: string,
    href: string,
    description: string,
    language: string,
    stars: number,
    forks: number,
    starsInPeriod: number
}

interface RepoDetails {
    name: string
}

export type { TrendInfo, RepoDetails }