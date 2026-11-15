"use server";

import { URLProps } from "@/types";
import getCollection, { POSTS_COLLECTION } from "@/db";

export default async function shortenURL(
    url: string,
    alias: string,
): Promise<URLProps> {

    const postsCollection = await getCollection(POSTS_COLLECTION);
    let parsedURL: URL;

    try {
        parsedURL = new URL(url.trim());
    } catch {
        throw new Error("Invalid URL: Could not verify URL. Please try again.");
    }

    if (
        parsedURL.protocol !== "http:" &&
        parsedURL.protocol !== "https:"
    ) {
        throw new Error("Invalid URL: Could not verify URL. Please try again.");
    }

    const cleanAlias = alias.trim();

    if (!/^[a-zA-Z0-9_-]+$/.test(cleanAlias)) {
        throw new Error(
            "Invalid alias: You may only use valid URL characters"
        );
    }

    await postsCollection.createIndex(
        { alias: 1 },
        { unique: true }
    );

    const newLink: URLProps = {
        url: parsedURL.toString(),
        alias: cleanAlias,
    };

    try {
        return newLink;
    } catch (err: unknown) {

        if (
            typeof err === "object" &&
            err !== null &&
            "code" in err &&
            err.code === 11000
        ) {
            throw new Error(
                "Invalid alias: This alias already exists"
            );
        }

        throw err;
    }
}