import githubAPI from "@/utils/githubAPI";

export async function POST() {

    console.log("Running scheduled daily report task");

    const resp = await githubAPI.trending("daily", "javascript");

    console.log(resp);

    return new Response(JSON.stringify({ message: "daily report task executed" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}