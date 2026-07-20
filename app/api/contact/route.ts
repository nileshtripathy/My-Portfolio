import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";

// Simple in-memory rate limit (per server instance). For multi-instance
// deployments, swap this for an edge-safe store such as Upstash Redis.
const rateLimitWindowMs = 60_000;
const maxRequestsPerWindow = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < rateLimitWindowMs
  );
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > maxRequestsPerWindow;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  // Honeypot triggered — silently pretend success to confuse bots.
  if (parsed.data.company) {
    return NextResponse.json({ success: true });
  }

  const { name, email, message } = parsed.data;

  try {
    if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: process.env.CONTACT_TO_EMAIL,
        replyTo: email,
        subject: `New message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      });
    } else {
      // No email provider configured — log for local development.
      console.info("[contact] New message", { name, email, message });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[/api/contact]", error);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again." },
      { status: 500 }
    );
  }
}
