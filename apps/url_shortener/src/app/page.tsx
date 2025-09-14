"use client";

import { Button } from "@/components/ui/button";
import CopyButton from "@/components/ui/copy";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [prog, setProg] = useState<boolean>(false);
  const [url, setURL] = useState<string>("");
  const [shortURL, setShortURL] = useState<string>("");
  const [err, setErr] = useState<string>("");

  const submit = async () => {
    setProg(true);
    setErr("");
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    if (!res.ok) {
      const error = await res.text();
      setErr(error);
      setProg(false);
      return;
    }
    const data = await res.json();
    setShortURL(`http://localhost:3000/r/${data.slug}`);
    setProg(false);
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="flex flex-col space-y-5 p-5">
        <div className="flex justify-center">
          <Input
            placeholder="https://example.com"
            className="lg:min-w-lg w-fit"
            disabled={prog}
            onChange={(e) => setURL(e.target.value)}
          />
          <Button
            variant="outline"
            type="submit"
            className="ml-1 hover:cursor-pointer"
            disabled={prog}
            onClick={submit}
          >
            {prog ? <LoaderCircle className="animate-spin" /> : "短縮"}
          </Button>
        </div>

        <div className="mx-auto">
          {err && (
            <>
              <span className="text-red-500">{err}</span>
            </>
          )}

          {shortURL && (
            <>
              <span>
                <a className="underline" href={shortURL}>
                  {shortURL}
                </a>
              </span>
              <CopyButton className="ml-2" text={shortURL} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
