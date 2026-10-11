"use client";

import { FormEvent, useRef, useState } from "react";

type SubmissionState = "idle" | "sending" | "success" | "partial" | "error";

const fieldClassName =
  "mt-2 block min-h-12 w-full border border-graphite/20 bg-white px-4 py-3 text-base text-graphite placeholder:text-slate/70 focus:border-muted-gold focus:outline-2 focus:outline-offset-2 focus:outline-muted-gold";

function PaperPlaneIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M21.5 2.5 14 21.5l-4-8-8-4 19.5-7Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
      <path
        d="M21.5 2.5 10 13.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path
        d="m5 12 4.5 4.5L19 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function ContactForm() {
  const [state, setState] = useState<SubmissionState>("idle");
  const submissionId = useRef<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    submissionId.current ??= crypto.randomUUID();
    setState("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Contact-Submission-Id": submissionId.current,
        },
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

      const result: unknown = await response.json().catch(() => null);
      form.reset();
      submissionId.current = null;
      setState(
        result && typeof result === "object" &&
        "acknowledgementSent" in result && result.acknowledgementSent === false
          ? "partial"
          : "success",
      );
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
        aria-busy={state === "sending"}
        className="inline-flex min-h-12 items-center justify-center gap-3 bg-muted-gold px-6 py-3 text-sm font-semibold text-graphite transition-[filter,transform,background-color] duration-200 hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted-gold disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none"
        disabled={state === "sending"}
        type="submit"
      >
        {state === "sending" ? (
          <>
            Sending…
            <span aria-hidden="true" className="motion-safe:animate-pulse">
              <PaperPlaneIcon />
            </span>
          </>
        ) : state === "success" || state === "partial" ? (
          <>
            Sent!
            <CheckIcon />
          </>
        ) : (
          <>
            Send message
            <PaperPlaneIcon />
          </>
        )}
      </button>

      <p
        aria-live="polite"
        className="min-h-6 text-sm leading-6"
        role={state === "error" ? "alert" : "status"}
      >
        {state === "success" && (
          <span className="text-emerald-800">
            Thanks for reaching out. Your message has been sent.
          </span>
        )}
        {state === "partial" && (
          <span className="text-amber-800">
            Your message was received, but we couldn’t send a confirmation email. You don’t need to submit it again.
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
