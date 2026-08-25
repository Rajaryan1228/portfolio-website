import { NextResponse } from "next/server";
import { siteConfig } from "@/data/config";

// We try two different public LeetCode APIs in order.
// If the first is down (common for Heroku free tier), we fall back to the second.
//
// API 1: alfa-leetcode-api.onrender.com  (more reliable)
// API 2: leetcode-stats-api.herokuapp.com (fallback)

async function fetchFromAlfa(username: string) {
  const res = await fetch(
    `https://alfa-leetcode-api.onrender.com/${username}/solved`,
    { next: { revalidate: 3600 }, signal: AbortSignal.timeout(8000) }
  );
  if (!res.ok) throw new Error(`alfa API ${res.status}`);
  const data = await res.json();

  // Also fetch ranking separately
  const resProfile = await fetch(
    `https://alfa-leetcode-api.onrender.com/${username}`,
    { next: { revalidate: 3600 }, signal: AbortSignal.timeout(8000) }
  );
  const profile = resProfile.ok ? await resProfile.json() : {};

  return {
    easySolved: data.easySolved ?? 0,
    mediumSolved: data.mediumSolved ?? 0,
    hardSolved: data.hardSolved ?? 0,
    totalSolved: data.solvedProblem ?? 0,
    ranking: profile.ranking ?? 0,
    acceptanceRate: profile.totalSubmissionNum?.[0]?.submissions
      ? Math.round(
          (profile.totalSubmissionNum[0].count /
            profile.totalSubmissionNum[0].submissions) *
            1000
        ) / 10
      : 0,
  };
}

async function fetchFromHeroku(username: string) {
  const res = await fetch(
    `https://leetcode-stats-api.herokuapp.com/${username}`,
    { next: { revalidate: 3600 }, signal: AbortSignal.timeout(8000) }
  );
  if (!res.ok) throw new Error(`heroku API ${res.status}`);
  const data = await res.json();
  if (data.status === "error") throw new Error(data.message);

  return {
    easySolved: data.easySolved ?? 0,
    mediumSolved: data.mediumSolved ?? 0,
    hardSolved: data.hardSolved ?? 0,
    totalSolved: data.totalSolved ?? 0,
    ranking: data.ranking ?? 0,
    acceptanceRate: data.acceptanceRate ?? 0,
  };
}

export async function GET() {
  const username = siteConfig.codingProfiles.leetcode;

  // Try primary API, then fallback
  try {
    const data = await fetchFromAlfa(username);
    return NextResponse.json(data);
  } catch (e1) {
    console.warn("LeetCode primary API failed, trying fallback:", e1);
    try {
      const data = await fetchFromHeroku(username);
      return NextResponse.json(data);
    } catch (e2) {
      console.error("Both LeetCode APIs failed:", e2);
      return NextResponse.json(
        { error: "Failed to fetch LeetCode stats" },
        { status: 502 }
      );
    }
  }
}
