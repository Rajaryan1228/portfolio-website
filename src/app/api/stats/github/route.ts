import { NextResponse } from "next/server";
import { siteConfig } from "@/data/config";

export async function GET() {
  const username = siteConfig.codingProfiles.github;

  try {
    const headers = {
      "User-Agent": "Portfolio-App",
      Accept: "application/vnd.github.v3+json",
    };

    // 1. Fetch user profile
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(6000),
    });

    if (!userRes.ok) {
      throw new Error(`GitHub user API returned ${userRes.status}`);
    }
    const userData = await userRes.json();

    // 2. Fetch repos for stars & top languages
    let totalStars = 0;
    const languagesMap: Record<string, number> = {};
    const recentRepos: Array<{ name: string; url: string; stars: number; language: string | null }> = [];

    try {
      const reposRes = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`,
        {
          headers,
          next: { revalidate: 3600 },
          signal: AbortSignal.timeout(6000),
        }
      );

      if (reposRes.ok) {
        const repos = await reposRes.json();
        if (Array.isArray(repos)) {
          for (const repo of repos) {
            totalStars += repo.stargazers_count || 0;
            if (repo.language) {
              languagesMap[repo.language] = (languagesMap[repo.language] || 0) + 1;
            }
            if (recentRepos.length < 3 && !repo.fork && repo.name !== username) {
              recentRepos.push({
                name: repo.name,
                url: repo.html_url,
                stars: repo.stargazers_count || 0,
                language: repo.language || null,
              });
            }
          }
        }
      }
    } catch (e) {
      console.warn("Failed to fetch repos details:", e);
    }

    // 3. Fetch contributions count
    let contributions = 0;
    try {
      const contribRes = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
        {
          next: { revalidate: 3600 },
          signal: AbortSignal.timeout(5000),
        }
      );
      if (contribRes.ok) {
        const contribData = await contribRes.json();
        contributions = contribData.total?.lastYear ?? 0;
      }
    } catch (e) {
      console.warn("Failed to fetch contributions API:", e);
    }

    const topLanguages = Object.entries(languagesMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([lang]) => lang);

    return NextResponse.json({
      publicRepos: userData.public_repos ?? 0,
      followers: userData.followers ?? 0,
      following: userData.following ?? 0,
      totalStars,
      contributions,
      topLanguages,
      recentRepos,
      avatarUrl: userData.avatar_url,
      bio: userData.bio,
    });
  } catch (err) {
    console.error("GitHub stats fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch GitHub stats" },
      { status: 502 }
    );
  }
}
