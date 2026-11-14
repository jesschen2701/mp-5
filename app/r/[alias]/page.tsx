import { notFound, redirect } from "next/navigation";
import { getLinks } from "@/lib/mongodb";

export default async function RedirectPage({
    params
}: {
    params: Promise<{ alias: string }>
}) {
    const { alias } = await params;
    const links = await getLinks();
    const link = await links.findOne({ _id: alias });
    if (!link) {
        notFound();
    }
    redirect(link.url);
}