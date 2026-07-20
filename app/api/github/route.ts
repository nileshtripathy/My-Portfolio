import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";
import type { GithubStats } from "@/lib/types";

export const revalidate = 3600; // Cache upstream data for 1 hour (ISR-style)

interface GithubUserResponse {
  login: string;
  name: string | null;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface GithubRepoResponse {
  stargazers_count: number;
  language: string | null;
  fork: boolean;
}

async function fetchGithub<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "nilesh-portfolio",
      ...(process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {}),
    },
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`GitHub API responded with ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export async function GET() {
  const username = siteConfig.githubUsername;

  try {
    const [user, repos] = await Promise.all([
      fetchGithub<GithubUserResponse>(`https://api.github.com/users/${username}`),
      fetchGithub<GithubRepoResponse[]>(
        `https://api.github.com/users/${username}/repos?per_page=100`
      ),
    ]);

    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

    const languageCounts = new Map<string, number>();
    for (const repo of repos) {
      if (!repo.language || repo.fork) continue;
      languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
    }

    const totalLanguageRepos = Array.from(languageCounts.values()).reduce(
      (a, b) => a + b,
      0
    );

    const topLanguages = Array.from(languageCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        percent: totalLanguageRepos
          ? Math.round((count / totalLanguageRepos) * 100)
          : 0,
      }));

    const stats: GithubStats = {
      login: user.login,
      name: user.name ?? user.login,
      avatarUrl: user.avatar_url,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      totalStars,
      topLanguages,
      profileUrl: user.html_url,
    };

    return NextResponse.json(stats, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
    });
  } catch (error) {
    console.error("[/api/github]", error);
    return NextResponse.json(
      { error: "Unable to fetch GitHub stats right now." },
      { status: 502 }
    );
  }
}
