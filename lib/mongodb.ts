import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;

if (!uri){
    throw new Error("MONGO_URI is missing.");
}

const client = new MongoClient(uri);

export async function getLinks(){
    await client.connect();
    return client.db("urlShortener")
        .collection<{ _id: string; url: string}>("links");
}