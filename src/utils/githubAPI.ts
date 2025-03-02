import trending from "trending-github"
import axios from "axios";

class GithubAPI {

    static async trending(period: string, language: string) {
        return await trending(period, language)
    }

    static async repoInfo(author: string, name: string) {
        return await axios.get(`https://api.github.com/repos/${author}/${name}`)
    }

    static async stargazers(author: string, name: string) {
        return await axios.get(`https://api.github.com/repos/${author}/${name}/stargazers`)
    }

    static async contributors(author: string, name: string) {
        return await axios.get(`https://api.github.com/repos/${author}/${name}/contributors`)
    }

    static async commits(author: string, name: string) {
        return await axios.get(`https://api.github.com/repos/${author}/${name}/commits`)
    }

}

export default GithubAPI