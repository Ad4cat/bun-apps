"use client";

import { useEffect } from "react";

export function RedirectClient({ slug }: { slug: string }) {
  useEffect(() => {
    window.location.replace(`/api/r/${slug}`);
  }, [slug]);

  return (
    <>
      <main className="grid place-content-center min-h-[60vh] text-center p-6">
        <p className="text-sm text-muted-foreground">
          短縮URLにリダイレクトしています…
        </p>
        <p className="mt-2">
          もし移動しない場合は{" "}
          <a className="underline" href={`/api/r/${slug}`}>
            こちら
          </a>
          をクリック
        </p>
      </main>
    </>
  );
}
