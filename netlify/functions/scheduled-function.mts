import type { Config } from "@netlify/functions"
import fetch from "node-fetch";

export default async (req: Request) => {
    const { next_run } = await req.json()

    console.log("Received event! Next invocation at:", next_run)
    const url = "https://octopulse.netlify.app/api/cron"
    try {
        fetch(url, {method: "POST"})
    } catch (e) {
        console.log(e);
    }
}

export const config: Config = {
    schedule: "@hourly"
}