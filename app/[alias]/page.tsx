import getCollection, { POSTS_COLLECTION } from "@/db";
import { notFound, redirect } from "next/navigation";

export default async function RedirectPage({
                                               params,
                                           }: {
    params: Promise<{ alias: string }>;
}) {
    const { alias } = await params;

    const postsCollection = await getCollection(POSTS_COLLECTION);

    const link = await postsCollection.findOne({
        alias: alias,
    });

    if (!link) {
        notFound();
    }

    redirect(link.url);
}