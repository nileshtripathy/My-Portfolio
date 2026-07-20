export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  href?: string;
  repoHref?: string;
  status: "live" | "building";
  accent: "indigo" | "cyan" | "emerald";
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface GithubStats {
  login: string;
  name: string;
  avatarUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  topLanguages: { name: string; percent: number }[];
  profileUrl: string;
}

export interface LeetcodeStats {
  username: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  acceptanceRate: number;
  profileUrl: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}
