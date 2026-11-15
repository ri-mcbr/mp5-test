"use client";

import shortenURL from "@/lib/shortenURL";
import { URLProps } from "@/types";
import {
    Button,
    FormHelperText,
    TextField,
} from "@mui/material";
import { useState } from "react";

export default function URLShortener({
                                         append,
                                         baseURL,
                                     }: {
    append: (link: URLProps) => void;
    baseURL: string;
}) {
    const [url, setURL] = useState("");
    const [alias, setAlias] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <form
            className="w-full max-w-2xl rounded-xl p-5 bg-white shadow-lg"
            onSubmit={async (event) => {
                event.preventDefault();

                setError("");
                setLoading(true);

                try {
                    const newLink = await shortenURL(url, alias);

                    append(newLink);

                } catch (err: unknown) {

                    if (err instanceof Error) {
                        setError(err.message);
                    } else {
                        setError("Something went wrong");
                    }

                } finally {
                    setLoading(false);
                }
            }}
        >
            <h2 className="text-xl font-bold text-gray-900">
                Shorten a URL
            </h2>

            <p className="text-sm text-gray-500 mb-6">
                Enter a long URL to create a shorter, shareable link
            </p>

            <label className="text-sm font-medium text-gray-900">
                URL
            </label>

            <TextField
                variant="filled"
                sx={{
                    backgroundColor: "#e8f0fe",
                    width: "100%",
                    marginTop: "4px",
                    marginBottom: "16px",
                }}
                placeholder="https://example.com/very/long/url"
                value={url}
                onChange={(e) => setURL(e.target.value)}
            />

            <label className="text-sm font-medium text-gray-900">
                Custom Alias
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-2 mt-2 mb-4">

                <span className="text-sm text-gray-500 whitespace-nowrap">
                    {baseURL}/
                </span>

                <TextField
                    variant="outlined"
                    size="small"
                    sx={{
                        width: "100%",
                    }}
                    placeholder="your-custom-alias"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                />

            </div>

            <Button
                sx={{
                    width: "100%",
                    backgroundColor: "#10b981",
                    "&:hover": {
                        backgroundColor: "#059669",
                    },
                    textTransform: "none",
                }}
                variant="contained"
                type="submit"
                disabled={
                    url.trim() === "" ||
                    alias.trim() === "" ||
                    loading
                }
            >
                {loading ? "Shortening..." : "Shorten"}
            </Button>

            {error && (
                <FormHelperText
                    error
                    sx={{
                        textAlign: "center",
                        marginTop: "12px",
                    }}
                >
                    {error}
                </FormHelperText>
            )}

        </form>
    );
}