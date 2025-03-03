
export async function GET() {

    return new Response(JSON.stringify({ message: "daily report task executed" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}