"use client";

import { useEffect, useState } from "react";
import URLShortener from "./components/URLShortener";
import { URLProps } from "@/types";
import { Button } from "@mui/material";

export default function Home() {
    const [latestLink, setLatestLink] = useState<URLProps | null>(null);
    const [baseURL, setBaseURL] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setBaseURL(window.location.origin);
    }, []);

    const shortenedURL = latestLink
        ? `${baseURL}/${latestLink.alias}`
        : "";

    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center bg-gradient-to-b from-emerald-50 to-emerald-100 p-6">

            <div className="text-center mt-14 mb-7">

                <h1 className="text-3xl font-bold text-gray-900">
                    URL Shortener
                </h1>

                <p className="text-sm text-gray-500 mt-2">
                    Shorten your long URLs into compact, shareable links
                </p>

            </div>

            <URLShortener
                baseURL={baseURL}
                append={(newLink: URLProps) => {
                    setLatestLink(newLink);
                    setCopied(false);
                }}
            />

            {latestLink && (
                <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-lg p-4 mt-5">

                    <p className="text-sm text-gray-500 mb-2">
                        Your shortened URL:
                    </p>

                    <div className="flex justify-between items-center gap-2">

                        <a
                            href={shortenedURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-gray-900 break-all hover:underline"
                        >
                            {shortenedURL}
                        </a>

                        <Button
                            variant="text"
                            color="inherit"
                            onClick={async () => {
                                try {
                                    await navigator.clipboard.writeText(
                                        shortenedURL
                                    );

                                    setCopied(true);

                                } catch {
                                    setCopied(false);
                                }
                            }}
                        >
                            {copied ? "Copied!" : "Copy"}
                        </Button>

                    </div>

                </div>
            )}

        </div>
    );
}