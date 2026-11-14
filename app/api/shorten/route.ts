import { MongoServerError } from "mongodb";
import { getLinks } from "@/lib/mongodb";

export async function POST(request: Request) {
    try{
        const { url, alias } = await request.json();
        if (typeof url !== "string" || typeof alias !== "string"){
            return Response.json(
                { error: "Please enter a URL and an alias." },
                { status: 400 }
            );
        }
        const cleanAlias = alias.trim();
        if (!/^[a-zA-Z0-9_-]+$/.test(cleanAlias) || cleanAlias.length>40){
            return Response.json(
                { error: "Alias must contain 1-40 letters, numbers, - or _." },
                { status: 400 }
            );
        }

        let validUrl: URL;
        try {validUrl = new URL(url.trim());}
        catch {return Response.json(
            { error: "Please enter a valid URL." },
            { status: 400 }
        );}
        if (validUrl.protocol !== "http:" && validUrl.protocol !== "https:") {
            return Response.json(
                { error: "URL must start with http:// or https://." },
                { status: 400 }
            );
        }
        const links = await getLinks();
        await links.insertOne({
            _id: cleanAlias,
            url: validUrl.toString()
        });
        return Response.json(
            { alias: cleanAlias },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof MongoServerError && error.code === 11000) {
            return Response.json(
                { error: "This alias is already taken." },
                { status: 409 }
            );
        }
        return Response.json(
            { error: "Could not save the URL. Please try again." },
            { status: 500 }
        );
    }
}