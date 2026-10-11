"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type SubmissionState = "idle" | "sending" | "success" | "partial" | "error";
type ContactField = "name" | "email" | "subject" | "message";
type FieldErrors = Partial<Record<ContactField, string>>;

const fieldClassName =
  "mt-2 block min-h-12 w-full border border-graphite/20 bg-white px-4 py-3 text-base text-graphite placeholder:text-slate/70 focus:border-muted-gold focus:outline-2 focus:outline-offset-2 focus:outline-muted-gold";

function PaperPlaneIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M22 2 14.8 22l-4.1-8.7L2 9.2 22 2Z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
      <path
        d="M22 2 10.7 13.3"
        stroke="var(--ivory)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
    </svg>
  );
}


function FieldError({ id, children }: { id: string; children: string | undefined }) {
  if (!children) return null;

  return (
    <p
      className="relative mt-2 w-fit max-w-full rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm leading-5 text-red-800 shadow-sm before:absolute before:-top-1 before:left-4 before:h-2 before:w-2 before:rotate-45 before:border-l before:border-t before:border-red-200 before:bg-red-50"
      id={id}
      role="alert"
    >
      {children}
    </p>
  );
}

export function ContactForm() {
  const [state, setState] = useState<SubmissionState>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const submissionId = useRef<string | null>(null);
  const successPanelRef = useRef<HTMLElement | null>(null);

  function clearFieldError(field: ContactField) {
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function getFieldError(
    field: ContactField,
    element: HTMLInputElement | HTMLTextAreaElement,
  ): string | undefined {
    if (!element.value.trim()) {
      const labels: Record<ContactField, string> = {
        name: "Please enter your name.",
        email: "Please enter your email address.",
        subject: "Please add a subject.",
        message: "Please enter a message.",
      };
      return labels[field];
    }

    if (field === "email" && element.validity.typeMismatch) {
      return "Enter a valid email address, like you@example.com.";
    }

    return undefined;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    const form = event.currentTarget;
    const fields: ContactField[] = ["name", "email", "subject", "message"];
    const nextErrors: FieldErrors = {};

    for (const field of fields) {
      const element = form.elements.namedItem(field) as HTMLInputElement | HTMLTextAreaElement;
      const error = getFieldError(field, element);
      if (error) nextErrors[field] = error;
    }

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidField = fields.find((field) => nextErrors[field]);
      if (firstInvalidField) {
        (form.elements.namedItem(firstInvalidField) as HTMLInputElement | HTMLTextAreaElement).focus();
      }
      return;
    }

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
      setFieldErrors({});
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

  const hasSucceeded = state === "success" || state === "partial";

  useEffect(() => {
    if (!hasSucceeded) return;

    // Wait until the success panel has committed to the DOM before aligning it.
    const frame = window.requestAnimationFrame(() => {
      const panel = successPanelRef.current;
      if (!panel) return;

      // Calculate against the document so the panel's top is aligned consistently
      // even when the form above it has just been replaced.
      const top = window.scrollY + panel.getBoundingClientRect().top;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: Math.max(0, top), behavior: reduceMotion ? "auto" : "smooth" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [hasSucceeded]);

  return (
    hasSucceeded ? (
      <section
        ref={successPanelRef}
        aria-live="polite"
        className="contact-success-panel rounded-2xl border border-graphite/10 bg-white/70 px-6 py-10 text-center shadow-sm sm:px-10"
        role="status"
      >
        <div aria-hidden="true" className="contact-success-illustration mx-auto mb-5">
          <svg className="h-28 w-40 overflow-visible" fill="none" viewBox="0 0 160 112">
            <path
              className="contact-success-flight-path"
              d="M10 91C39 88 55 73 76 53S111 24 143 18"
              stroke="var(--muted-gold)"
              strokeDasharray="3 6"
              strokeLinecap="round"
              strokeWidth="1.5"
            />
            <circle cx="143" cy="18" r="3" fill="var(--muted-gold)" />
            <path
              className="contact-success-sparkle"
              d="M42 34v8m-4-4h8M117 72v6m-3-3h6"
              stroke="var(--muted-gold)"
              strokeLinecap="round"
              strokeWidth="1.5"
            />
            <g className="contact-success-plane" stroke="var(--graphite)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
              {/* Recognizable paper dart silhouette with two folded wings and a center seam. */}
              <path d="M17 53 144 15 104 94 79 66 17 53Z" fill="var(--ivory)" />
              <path d="M17 53 144 15 79 66Z" fill="var(--muted-gold)" />
              <path d="M17 53 86 54 104 94M79 66 86 54 144 15" fill="none" />
              <path d="M79 66 144 15 86 54" fill="var(--ivory)" />
            </g>
          </svg>
        </div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold-ink">
          FulCastle Holdings, Inc.
        </p>
        <h2 className="font-display text-3xl font-medium text-graphite sm:text-4xl">
          Message received.
        </h2>
        {state === "partial" ? (
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate">
            Your message was received, but we couldn’t send a confirmation email. You don’t need to submit it again.
          </p>
        ) : (
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate">
            Thanks for reaching out. Your message is on its way to our team. We’ll follow up if a response is appropriate.
          </p>
        )}
      </section>
    ) : (
    <form className="space-y-6" noValidate onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-semibold text-graphite" htmlFor="contact-name">
          Name
        </label>
        <input
          aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
          aria-invalid={Boolean(fieldErrors.name)}
          autoComplete="name"
          className={`${fieldClassName} ${fieldErrors.name ? "border-red-500 focus:border-red-600" : ""}`}
          id="contact-name"
          maxLength={100}
          name="name"
          onChange={() => clearFieldError("name")}
          placeholder="Your name"
          required
        />
        <FieldError id="contact-name-error">{fieldErrors.name}</FieldError>
      </div>

      <div>
        <label className="block text-sm font-semibold text-graphite" htmlFor="contact-email">
          Email
        </label>
        <input
          aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
          aria-invalid={Boolean(fieldErrors.email)}
          autoComplete="email"
          className={`${fieldClassName} ${fieldErrors.email ? "border-red-500 focus:border-red-600" : ""}`}
          id="contact-email"
          maxLength={254}
          name="email"
          onChange={() => clearFieldError("email")}
          placeholder="you@example.com"
          required
          type="email"
        />
        <FieldError id="contact-email-error">{fieldErrors.email}</FieldError>
      </div>

      <div>
        <label className="block text-sm font-semibold text-graphite" htmlFor="contact-subject">
          Subject
        </label>
        <input
          aria-describedby={fieldErrors.subject ? "contact-subject-error" : undefined}
          aria-invalid={Boolean(fieldErrors.subject)}
          className={`${fieldClassName} ${fieldErrors.subject ? "border-red-500 focus:border-red-600" : ""}`}
          id="contact-subject"
          maxLength={120}
          name="subject"
          onChange={() => clearFieldError("subject")}
          placeholder="What would you like to discuss?"
          required
        />
        <FieldError id="contact-subject-error">{fieldErrors.subject}</FieldError>
      </div>

      <div>
        <label className="block text-sm font-semibold text-graphite" htmlFor="contact-message">
          Message
        </label>
        <textarea
          aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
          aria-invalid={Boolean(fieldErrors.message)}
          className={`${fieldClassName} min-h-40 resize-y ${fieldErrors.message ? "border-red-500 focus:border-red-600" : ""}`}
          id="contact-message"
          maxLength={5000}
          name="message"
          onChange={() => clearFieldError("message")}
          placeholder="Tell us a little more..."
          required
          rows={6}
        />
        <FieldError id="contact-message-error">{fieldErrors.message}</FieldError>
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
        ) : (
          <>
            Send message
            <span aria-hidden="true">
              <PaperPlaneIcon />
            </span>
          </>
        )}
      </button>

      <p
        aria-live="polite"
        className="min-h-6 text-sm leading-6"
        role={state === "error" ? "alert" : "status"}
      >
        {state === "error" && (
          <span className="text-red-800">
            We couldn’t send your message right now. Please try again later.
          </span>
        )}
      </p>
    </form>
    )
  );
}
