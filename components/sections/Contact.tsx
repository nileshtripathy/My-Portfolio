"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, Send, CheckCircle2, Github, Linkedin, Code2 } from "lucide-react";
import { contactSchema, type ContactSchema } from "@/lib/validations/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import GlassCard from "@/components/ui/GlassCard";
import TextReveal from "@/components/ui/TextReveal";
import { siteConfig } from "@/lib/site";

const socials = [
  { label: "GitHub", href: siteConfig.links.github, icon: Github },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: Linkedin },
  { label: "LeetCode", href: siteConfig.links.leetcode, icon: Code2 },
];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", company: "" },
  });

  async function onSubmit(values: ContactSchema) {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative py-28 md:py-36">
      <div className="section-container">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-cyan">
              Contact
            </span>
            <TextReveal
              as="h2"
              text="Let's build something worth shipping."
              className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl"
            />
            <p className="mt-6 max-w-md text-balance text-ink-muted">
              Open to internships, freelance collaborations, and interesting
              engineering problems. Drop a message and I&apos;ll get back within
              a day or two.
            </p>

            <div className="mt-8 flex items-center gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="glass flex h-11 w-11 items-center justify-center rounded-full text-ink-muted transition-colors hover:text-accent-cyan"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <GlassCard className="p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              {/* Honeypot — hidden from real users */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
                {...register("company")}
              />

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Ada Lovelace"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  {...register("name")}
                />
                {errors.name && (
                  <p id="name-error" className="text-xs text-accent-amber">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  {...register("email")}
                />
                {errors.email && (
                  <p id="email-error" className="text-xs text-accent-amber">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about the project or role..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  {...register("message")}
                />
                {errors.message && (
                  <p id="message-error" className="text-xs text-accent-amber">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send className="h-4 w-4" />
                  </>
                )}
              </Button>

              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                  className="flex items-center gap-2 text-sm text-accent-emerald"
                >
                  <CheckCircle2 className="h-4 w-4" /> Message sent — thanks for
                  reaching out!
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  className="text-sm text-red-400"
                >
                  Something went wrong. Please try again or email me directly.
                </motion.p>
              )}
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
