import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";
import type { LeetcodeStats } from "@/lib/types";

export const revalidate = 3600;

const QUERY = /* GraphQL */ `
  query userStats($username: String!) {
    matchedUser(username: $username) {
      username
      submitStats {
        acSubmissionNum {
          difficulty
          count
        }
      }
      profile {
        ranking
      }
    }
    allQuestionsCount {
      difficulty
      count
    }
  }
`;

interface LeetcodeGraphQLResponse {
  data: {
    matchedUser: {
      username: string;
      submitStats: {
        acSubmissionNum: { difficulty: string; count: number }[];
      };
      profile: { ranking: number };
    } | null;
    allQuestionsCount: { difficulty: string; count: number }[];
  };
}

export async function GET() {
  const username = siteConfig.leetcodeUsername;

  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { username },
      }),
      next: { revalidate },
    });

    if (!res.ok) throw new Error(`LeetCode API responded with ${res.status}`);

    const json = (await res.json()) as LeetcodeGraphQLResponse;
    const matchedUser = json.data.matchedUser;

    if (!matchedUser) throw new Error("LeetCode user not found");

    const byDifficulty = Object.fromEntries(
      matchedUser.submitStats.acSubmissionNum.map((d) => [d.difficulty, d.count])
    );
    const totalQuestions =
      json.data.allQuestionsCount.find((q) => q.difficulty === "All")?.count ?? 0;

    const stats: LeetcodeStats = {
      username: matchedUser.username,
      totalSolved: byDifficulty["All"] ?? 0,
      totalQuestions,
      easySolved: byDifficulty["Easy"] ?? 0,
      mediumSolved: byDifficulty["Medium"] ?? 0,
      hardSolved: byDifficulty["Hard"] ?? 0,
      ranking: matchedUser.profile.ranking,
      acceptanceRate: totalQuestions
        ? Math.round(((byDifficulty["All"] ?? 0) / totalQuestions) * 1000) / 10
        : 0,
      profileUrl: `https://leetcode.com/u/${username}/`,
    };

    return NextResponse.json(stats, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
    });
  } catch (error) {
    console.error("[/api/leetcode]", error);
    return NextResponse.json(
      { error: "Unable to fetch LeetCode stats right now." },
      { status: 502 }
    );
  }
}
