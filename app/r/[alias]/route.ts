
import { redirect } from "next/navigation";
import { getLinks } from "@/lib/mongodb";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ alias: string }> }
) {
    const { alias } = await params;

    const links = await getLinks();
    const link = await links.findOne({ _id: alias });

    if (!link) {
        return new Response("Alias not found", { status: 404 });
    }

    redirect(link.url);
}
