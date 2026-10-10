import { NextResponse } from "next/server";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > 12_000) {
    return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  }

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (!origin || !host) {
    return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  }

  try {
    const originUrl = new URL(origin);
    if (originUrl.host !== host || !["http:", "https:"].includes(originUrl.protocol)) {
      return NextResponse.json({ error: "Invalid request." }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const fields = payload as Record<string, unknown>;

  // Honeypot: silently accept automated submissions without sending email.
  if (cleanText(fields.website)) {
    return NextResponse.json({ ok: true });
  }

  const rawName = cleanText(fields.name);
  const rawEmail = cleanText(fields.email);
  const rawSubject = cleanText(fields.subject);
  const rawMessage = cleanText(fields.message);

  if (
    rawName.length > 100 ||
    rawEmail.length > 254 ||
    rawSubject.length > 120 ||
    rawMessage.length > 5000
  ) {
    return NextResponse.json(
      { error: "One or more fields exceed the allowed length." },
      { status: 400 },
    );
  }

  const name = rawName;
  const email = rawEmail;
  const subject = rawSubject.replace(/[\r\n]+/g, " ");
  const message = rawMessage;

  if (!name || !emailPattern.test(email) || !subject || !message) {
    return NextResponse.json(
      { error: "Please check the form fields and try again." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  const cc = process.env.CONTACT_CC_EMAIL;

  if (!apiKey || !from || !to) {
    console.error("Contact form is not configured: required Resend environment variables are missing.");
    return NextResponse.json(
      { error: "Contact form is temporarily unavailable." },
      { status: 503 },
    );
  }

  const text = [
    "New message from the FulCastle website contact form",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        ...(cc ? { cc: [cc] } : {}),
        reply_to: email,
        subject: `FulCastle website: ${subject}`,
        text,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Resend rejected a contact form email.", {
        status: response.status,
      });
      return NextResponse.json(
        { error: "We couldn’t send your message right now. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    console.error("Resend request failed while sending a contact form email.");
    return NextResponse.json(
      { error: "We couldn’t send your message right now. Please try again later." },
      { status: 502 },
    );
  }
}
