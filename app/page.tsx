"use client";

import { useState } from "react";

export default function Home(){
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function shorten(){
    setError("");
    setShortUrl("");
    setLoading(true);
    try{
      const response= await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url, alias })
      });
      const result = await response.json();
      if (response.ok) {
        setShortUrl(
            `${window.location.origin}/r/${result.alias}`
        );
      }else{
        setError(result.error);
      }
    } catch {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }
  return (
      <main className="container">
        <h1>URL Shortener </h1>
        <p className="subtitle">
          Create a short, shareable link.
        </p>
        <form onSubmit={(event) => {
          event.preventDefault();
          shorten();
        }}>
          <label htmlFor={"url"}>Destination URL</label>
          <input
            id="url"
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            required
          />

          <label htmlFor="alias">Custom Alias</label>
          <input
              id="alias"
              type="text"
              placeholder="my-link"
              value={alias}
              onChange={(event) => setAlias(event.target.value)}
              maxLength={40}
              required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Shorten URL"}
          </button>
        </form>
        {error && (
            <p className="error">{error}</p>
        )}
        {shortUrl && (
            <div className="result">
              <label htmlFor="shortUrl">
                Your shortened URL:
              </label>
              <input
                id="shortUrl"
                type="text"
                value={shortUrl}
                readOnly
              />
              <p>Select and copy the link above to share it.</p>
              <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                Test shortened link
              </a>
            </div>
        )}
      </main>
  );
}