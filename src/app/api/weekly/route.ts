import githubAPI from "@/utils/githubAPI";
import { TrendInfo } from "@/types/github";

export async function POST() {

    console.log("Running scheduled weekly report task");

    const resp = await githubAPI.trending("weekly", "javascript") as Array<TrendInfo>;

    console.log(resp[0]);

    // first repo test
    const detail = await githubAPI.repoInfo(resp[0].author, resp[0].name);
    console.log(detail);


    return new Response(JSON.stringify({ message: "Weekly report task executed" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}