import { RedirectClient } from "@/components/ui/RedirectClient";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug: slugArray } = await params;
  const slug = slugArray?.[0];
  if (!slug) return notFound();

  return <RedirectClient slug={slug} />;
}
