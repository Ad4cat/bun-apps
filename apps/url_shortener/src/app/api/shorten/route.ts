import Database from "better-sqlite3";
import { customAlphabet } from "nanoid";
import path from "node:path";

export const runtime = "nodejs";

const db = new Database(path.join(process.cwd(), "db.sqlite"));
db.exec(`
  CREATE TABLE IF NOT EXISTS urls (
    slug TEXT PRIMARY KEY,
    url  TEXT NOT NULL
  )
`);

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url || !/^https?:\/\//i.test(url)) {
      return new Response(
        "urlを入力してください。(入力してもエラーが出る場合ページを再読み込みしてください。)",
        { status: 400 }
      );
    }

    const nanoid = customAlphabet(
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
      6
    );

    let slug = "";
    for (let i = 0; i < 5; i++) {
      slug = nanoid();
      const exists = db.prepare("SELECT 1 FROM urls WHERE slug = ?").get(slug);
      if (!exists) {
        db.prepare("INSERT INTO urls (slug, url) VALUES (?, ?)").run(slug, url);
        break;
      }
    }
    if (!slug) return new Response("could not generate slug", { status: 500 });

    return Response.json({ slug });
  } catch (err) {
    console.error("POST /shorten error:", err);
    return new Response("internal error", { status: 500 });
  }
}
