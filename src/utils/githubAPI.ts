import axios from "axios"
import * as cheerio from 'cheerio';
import { TrendInfo } from "@/types/github";

class GithubAPI {

    static async trending(period: string, language: string) {
        const response = await axios.get(
            `https://github.com/trending/${encodeURIComponent(language)}?since=${period}`,
            { headers: { Accept: 'text/html' } },
        );
        const $ = cheerio.load(response.data);
        const repos: TrendInfo[] = [];

        $('article').each((_, repoElement) => {
            // Get the title text, e.g. "author / repository"
            const rawTitle = $(repoElement).find('h2.h3 a').text().trim();
            const title = rawTitle.replace(/\s/g, ''); // Remove all whitespace
            const [author, name] = title.split('/');

            // Construct the URLs used in the DOM for stars and forks
            const starLink = `/${author}/${name}/stargazers`;
            const forkLink = `/${author}/${name}/network/members`;

            // Determine the text to search for based on the period.
            let periodText = '';
            if (period === 'daily') {
                periodText = 'stars today';
            } else if (period === 'weekly') {
                periodText = 'stars this week';
            } else {
                periodText = 'stars this month';
            }

            // Extract and clean the numeric strings
            const starsStr = $(repoElement)
                .find(`[href="${starLink}"]`)
                .text()
                .trim()
                .replace(/,/g, '');
            const forksStr = $(repoElement)
                .find(`[href="${forkLink}"]`)
                .text()
                .trim()
                .replace(/,/g, '');
            const starsPeriodStr =
                $(repoElement)
                    .find(`span.float-sm-right:contains('${periodText}')`)
                    .text()
                    .trim()
                    .replace(periodText, '')
                    .replace(/,/g, '') || '0';

            repos.push({
                author,
                name,
                href: `https://github.com/${author}/${name}`,
                description: $(repoElement).find('p').text().trim() || "",
                language: $(repoElement).find('[itemprop=programmingLanguage]').text().trim(),
                stars: parseInt(starsStr, 10) || 0,
                forks: parseInt(forksStr, 10) || 0,
                starsInPeriod: parseInt(starsPeriodStr, 10) || 0,
            });
        });
        return repos;

    }

    static async repoInfo(author: string, name: string) {
        return await axios.get(`https://api.github.com/repos/${author}/${name}`, {
            headers: {
                'Authorization': `token ${process.env.GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        })
    }

    static async stargazers(author: string, name: string) {
        return await axios.get(`https://api.github.com/repos/${author}/${name}/stargazers`)
    }

    static async contributors(author: string, name: string) {
        return await axios.get(`https://api.github.com/repos/${author}/${name}/contributors`, {
            headers: {
                'Authorization': `token ${process.env.GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        })
    }

    static async commits(author: string, name: string) {
        return await axios.get(`https://api.github.com/repos/${author}/${name}/commits`)
    }

}

export default GithubAPI