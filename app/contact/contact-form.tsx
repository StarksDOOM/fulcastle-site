"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

type SubmissionState = "idle" | "sending" | "success" | "partial" | "error";
type ContactField = "name" | "email" | "subject" | "message";
type FieldErrors = Partial<Record<ContactField, string>>;

const fieldClassName =
  "mt-2 block min-h-12 w-full border border-graphite/20 bg-white px-4 py-3 text-base text-graphite placeholder:text-slate/70 focus:border-muted-gold focus:outline-2 focus:outline-offset-2 focus:outline-muted-gold";

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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const submissionId = useRef<string | null>(null);
  const successPanelRef = useRef<HTMLElement | null>(null);

  function handleFieldChange(
    field: ContactField,
    element: HTMLInputElement | HTMLTextAreaElement,
  ) {
    // Only revalidate fields that have already failed submission validation.
    // Keep the message visible until the value is actually valid.
    if (!fieldErrors[field]) return;

    const error = getFieldError(field, element);
    setFieldErrors((current) => {
      if (current[field] === error) return current;
      const next = { ...current };
      if (error) next[field] = error;
      else delete next[field];
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
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  const scrollToConfirmation = useCallback(() => {
    const panel = successPanelRef.current;
    if (!panel) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    panel.scrollIntoView({ block: "start", behavior: reduceMotion ? "auto" : "smooth" });
  }, []);

  useEffect(() => {
    if (!hasSucceeded) return;

    // Wait for React to replace the form, then align the confirmation panel itself.
    const frame = window.requestAnimationFrame(scrollToConfirmation);

    return () => window.cancelAnimationFrame(frame);
  }, [hasSucceeded, scrollToConfirmation]);

  return (
    hasSucceeded ? (
      <section
        ref={successPanelRef}
        aria-live="polite"
        className="contact-success-panel rounded-2xl border border-graphite/10 bg-white/70 px-6 py-10 text-center shadow-sm sm:px-10"
        role="status"
        onAnimationEnd={(event) => {
          // The entrance transform changes the panel's visual bounds. Re-align once
          // that transform finishes so the panel's actual top stays at the viewport top.
          if (event.target === event.currentTarget) scrollToConfirmation();
        }}
      >
        <div aria-hidden="true" className="contact-success-illustration mx-auto mb-5">
          <svg className="h-32 w-52 overflow-visible" fill="none" viewBox="0 0 190 116">
            <defs>
              <mask id="contact-flight-trail-mask">
                <path
                  d="M6 96C36 93 58 76 86 54S130 24 165 20"
                  pathLength="1"
                  stroke="white"
                  strokeWidth="16"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                >
                  {!prefersReducedMotion && (
                    <animate
                      attributeName="stroke-dashoffset"
                      from="1"
                      to="0"
                      dur="1.9s"
                      fill="freeze"
                    />
                  )}
                </path>
              </mask>
            </defs>
            <path
              className="contact-success-flight-path"
              d="M6 96C36 93 58 76 86 54S130 24 165 20"
              mask="url(#contact-flight-trail-mask)"
              stroke="var(--muted-gold)"
              strokeDasharray="3 6"
              strokeLinecap="round"
              strokeWidth="1.5"
            />
            {/* Arrival dot placed at the endpoint where the plane settles */}
            <circle cx="165" cy="20" r="3.5" fill="var(--muted-gold)" />
            <path
              className="contact-success-sparkle"
              d="M50 36v8m-4-4h8M136 74v6m-3-3h6"
              stroke="var(--muted-gold)"
              strokeLinecap="round"
              strokeWidth="1.5"
            />
            <g
              className="contact-success-plane"
              transform={prefersReducedMotion ? "translate(165 20)" : undefined}
            >
              {!prefersReducedMotion && (
                <animateMotion
                  dur="2.2s"
                  path="M6 96C36 93 58 76 86 54S130 24 165 20"
                  calcMode="spline"
                  keyPoints="0; 0.25; 0.65; 1"
                  keyTimes="0; 0.28; 0.68; 1"
                  keySplines="0.4 0 0.2 1; 0.25 0.1 0.25 1; 0.2 0 0.1 1"
                  rotate="auto"
                  fill="freeze"
                />
              )}
              {/* Paper plane scaled bigger (0.105) and centered at (670, 412) with smooth vector rendering */}
              <g transform="rotate(24.5) scale(0.105) translate(-670, -412)">
                <image
                  href="/images/paper-plane-no-path.svg"
                  x="0"
                  y="0"
                  width="1216"
                  height="832"
                  preserveAspectRatio="xMidYMid meet"
                  style={{ shapeRendering: "geometricPrecision" }}
                />
              </g>
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
          onChange={(event) => handleFieldChange("name", event.currentTarget)}
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
          onChange={(event) => handleFieldChange("email", event.currentTarget)}
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
          onChange={(event) => handleFieldChange("subject", event.currentTarget)}
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
          onChange={(event) => handleFieldChange("message", event.currentTarget)}
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
              <Send aria-hidden="true" className="h-[18px] w-[18px]" />
            </span>
          </>
        ) : (
          <>
            Send message
            <span aria-hidden="true">
              <Send aria-hidden="true" className="h-[18px] w-[18px]" />
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
