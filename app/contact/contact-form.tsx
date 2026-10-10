"use client";

import { FormEvent, useState } from "react";

type SubmissionState = "idle" | "sending" | "success" | "error";

const fieldClassName =
  "mt-2 block min-h-12 w-full border border-graphite/20 bg-white px-4 py-3 text-base text-graphite placeholder:text-slate/70 focus:border-muted-gold focus:outline-2 focus:outline-offset-2 focus:outline-muted-gold";

export function ContactForm() {
  const [state, setState] = useState<SubmissionState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    setState("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      });

      if (!response.ok) {
        setState("error");
        return;
      }

      form.reset();
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-semibold text-graphite" htmlFor="contact-name">
          Name
        </label>
        <input
          autoComplete="name"
          className={fieldClassName}
          id="contact-name"
          maxLength={100}
          name="name"
          placeholder="Your name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-graphite" htmlFor="contact-email">
          Email
        </label>
        <input
          autoComplete="email"
          className={fieldClassName}
          id="contact-email"
          maxLength={254}
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-graphite" htmlFor="contact-subject">
          Subject
        </label>
        <input
          className={fieldClassName}
          id="contact-subject"
          maxLength={120}
          name="subject"
          placeholder="What would you like to discuss?"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-graphite" htmlFor="contact-message">
          Message
        </label>
        <textarea
          className={`${fieldClassName} min-h-40 resize-y`}
          id="contact-message"
          maxLength={5000}
          name="message"
          placeholder="Tell us a little more..."
          required
          rows={6}
        />
      </div>

      <div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          autoComplete="off"
          id="contact-website"
          name="website"
          tabIndex={-1}
          type="text"
        />
      </div>

      <button
        className="inline-flex min-h-12 items-center justify-center gap-3 bg-muted-gold px-6 py-3 text-sm font-semibold text-graphite transition-colors hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted-gold disabled:cursor-not-allowed disabled:opacity-60"
        disabled={state === "sending"}
        type="submit"
      >
        {state === "sending" ? "Sending..." : "Send message"}
        {state !== "sending" && <span aria-hidden="true">↗</span>}
      </button>

      <p aria-live="polite" className="text-sm leading-6" role="status">
        {state === "success" && (
          <span className="text-emerald-800">
            Thanks for reaching out. Your message has been sent.
          </span>
        )}
        {state === "error" && (
          <span className="text-red-800">
            We couldn’t send your message right now. Please try again later.
          </span>
        )}
      </p>
    </form>
  );
}
