import Database from "better-sqlite3";
import path from "node:path";

export const runtime = "nodejs";

const db = new Database(path.join(process.cwd(), "db.sqlite"));

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = await params;
    const row = db.prepare("SELECT url FROM urls WHERE slug = ?").get(slug) as
      | { url: string }
      | undefined;

    if (!row) return new Response("Not found", { status: 404 });

    return Response.redirect(row.url, 302);
  } catch (err) {
    console.error("GET /r/:slug error:", err);
    return new Response("internal error", { status: 500 });
  }
}
