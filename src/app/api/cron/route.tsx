import {render} from "@react-email/render";
import ReportTemplate from "@/app/components/ReportTemplate";
import { sendEmail } from "@/utils/mailer";
import axios from "axios";

export async function POST() {

    console.log("Executing corn tasks");

    const resp = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/weekly');
    const repos = resp.data.repos;

    const emailHtml = await render(<ReportTemplate repos={repos} />);
    await sendEmail(process.env.TEST_EMAIL || '', 'Weekly Report', emailHtml);

    return new Response(JSON.stringify({ message: "corn tasks executed" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}