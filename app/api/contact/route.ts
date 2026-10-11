import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 12_000;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_SUBJECT_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 5_000;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function cleanText(value: unknown): string | null {
  if (typeof value !== "string") return null;
  return value.trim();
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function renderNotificationHtml(fields: ContactFields): string {
  const name = escapeHtml(fields.name);
  const email = escapeHtml(fields.email);
  const subject = escapeHtml(fields.subject);
  const message = escapeHtml(fields.message).replace(/\r?\n/g, "<br>");

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f6f3ed;font-family:Arial,Helvetica,sans-serif;color:#101722;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">A new inquiry has arrived through the FulCastle website.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f3ed;padding:32px 12px;">
      <tr><td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:100%;max-width:600px;background:#fffdf9;border:1px solid #e4dfd5;">
          <tr><td style="padding:28px 32px;background:#101722;border-bottom:3px solid #c6ae7a;">
            <p style="margin:0;color:#c6ae7a;font-size:11px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;">FulCastle Holdings, Inc.</p>
            <h1 style="margin:14px 0 0;color:#f6f3ed;font-size:25px;line-height:1.25;font-weight:500;">Website inquiry</h1>
            <p style="margin:8px 0 0;color:#d2d6dc;font-size:14px;line-height:1.6;">A new message has been submitted through the contact form.</p>
          </td></tr>
          <tr><td style="padding:28px 32px;">
            <p style="margin:0 0 18px;color:#68717d;font-size:11px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;">Contact details</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr><td style="padding:0 0 16px;width:100px;vertical-align:top;color:#68717d;font-size:13px;">Name</td><td style="padding:0 0 16px;color:#101722;font-size:14px;line-height:1.6;overflow-wrap:anywhere;">${name}</td></tr>
              <tr><td style="padding:0 0 16px;vertical-align:top;color:#68717d;font-size:13px;">Email</td><td style="padding:0 0 16px;color:#101722;font-size:14px;line-height:1.6;overflow-wrap:anywhere;"><a href="mailto:${email}" style="color:#66552d;text-decoration:underline;">${email}</a></td></tr>
              <tr><td style="padding:0 0 16px;vertical-align:top;color:#68717d;font-size:13px;">Subject</td><td style="padding:0 0 16px;color:#101722;font-size:14px;line-height:1.6;overflow-wrap:anywhere;">${subject}</td></tr>
            </table>
            <div style="margin-top:8px;padding-top:22px;border-top:1px solid #e4dfd5;">
              <p style="margin:0 0 12px;color:#68717d;font-size:11px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;">Message</p>
              <div style="color:#101722;font-size:14px;line-height:1.8;overflow-wrap:anywhere;">${message}</div>
            </div>
          </td></tr>
          <tr><td style="padding:18px 32px;border-top:1px solid #e4dfd5;background:#fbf8f2;color:#68717d;font-size:11px;line-height:1.6;">This message was sent through the contact form on the FulCastle Holdings, Inc. website.</td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

function renderNotificationText(fields: ContactFields): string {
  return [
    "FULCASTLE HOLDINGS, INC. — WEBSITE INQUIRY",
    "",
    "CONTACT DETAILS",
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Subject: ${fields.subject}`,
    "",
    "MESSAGE",
    fields.message,
    "",
    "Sent through the FulCastle Holdings, Inc. website contact form.",
  ].join("\n");
}

function renderAcknowledgmentHtml(name: string): string {
  const safeName = escapeHtml(name);
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f6f3ed;font-family:Arial,Helvetica,sans-serif;color:#101722;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f3ed;padding:32px 12px;">
      <tr><td align="center">
        <table role="presentation" width="560" cellspacing="0" cellpadding="0" style="width:100%;max-width:560px;background:#fffdf9;border:1px solid #e4dfd5;">
          <tr><td style="padding:28px 32px;background:#101722;border-bottom:3px solid #c6ae7a;">
            <p style="margin:0;color:#c6ae7a;font-size:11px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;">FulCastle Holdings, Inc.</p>
            <h1 style="margin:14px 0 0;color:#f6f3ed;font-size:24px;line-height:1.3;font-weight:500;">Thank you for reaching out.</h1>
          </td></tr>
          <tr><td style="padding:30px 32px;">
            <p style="margin:0 0 14px;font-size:15px;line-height:1.8;">Hello ${safeName},</p>
            <p style="margin:0 0 14px;color:#394452;font-size:14px;line-height:1.8;">We’ve received your message through the FulCastle website contact form. Thank you for taking the time to get in touch.</p>
            <p style="margin:0;color:#394452;font-size:14px;line-height:1.8;">If a response is appropriate, the right person will follow up. This is an automated confirmation; please do not reply to this email with sensitive information.</p>
          </td></tr>
          <tr><td style="padding:18px 32px;border-top:1px solid #e4dfd5;background:#fbf8f2;color:#68717d;font-size:11px;line-height:1.6;">FulCastle Holdings, Inc. · Website contact acknowledgment</td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

function invalidFields() {
  return NextResponse.json(
    { error: "Please check the form fields and try again." },
    { status: 400 },
  );
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
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

  let rawBody: string;
  try {
    rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Request is too large." }, { status: 413 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
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

  const name = cleanText(fields.name);
  const rawEmail = cleanText(fields.email);
  const rawSubject = cleanText(fields.subject);
  const message = cleanText(fields.message);

  if (
    name === null ||
    rawEmail === null ||
    rawSubject === null ||
    message === null ||
    name.length === 0 ||
    rawEmail.length === 0 ||
    rawSubject.length === 0 ||
    message.length === 0 ||
    name.length > MAX_NAME_LENGTH ||
    rawEmail.length > MAX_EMAIL_LENGTH ||
    rawSubject.length > MAX_SUBJECT_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH ||
    /[\r\n]/.test(rawEmail) ||
    /[\r\n]/.test(rawSubject)
  ) {
    return invalidFields();
  }

  // Preserve the local part; email domains are case-insensitive.
  const atIndex = rawEmail.lastIndexOf("@");
  const email =
    atIndex > 0
      ? `${rawEmail.slice(0, atIndex)}@${rawEmail.slice(atIndex + 1).toLowerCase()}`
      : rawEmail;

  if (!emailPattern.test(email)) {
    return invalidFields();
  }

  const validated: ContactFields = {
    name,
    email,
    subject: rawSubject.replace(/[\r\n]+/g, " "),
    message,
  };

  const apiKey = process.env.RESEND_API_KEY;
  const configuredFrom = process.env.RESEND_FROM_EMAIL;
  const fromAddress = configuredFrom?.match(/<([^<>]+)>/)?.[1] ?? configuredFrom;
  const from = fromAddress?.includes("@")
    ? `FulCastle Holdings, Inc. <${fromAddress}>`
    : configuredFrom;
  const to = process.env.CONTACT_TO_EMAIL;
  const cc = process.env.CONTACT_CC_EMAIL;

  if (!apiKey || !from || !to) {
    console.error("Contact form is not configured: required Resend environment variables are missing.");
    return NextResponse.json(
      { error: "Contact form is temporarily unavailable." },
      { status: 503 },
    );
  }

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
        reply_to: validated.email,
        subject: `Website Inquiry — ${validated.subject}`,
        html: renderNotificationHtml(validated),
        text: renderNotificationText(validated),
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Resend rejected a contact form email.", { status: response.status });
      return NextResponse.json(
        { error: "We couldn’t send your message right now. Please try again later." },
        { status: 502 },
      );
    }

    // The inquiry notification is the primary delivery. Do not ask the visitor to
    // retry it if only the secondary acknowledgment fails, which would duplicate it.
    let acknowledgementSent = true;
    try {
      const acknowledgement = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [validated.email],
          subject: "We received your message — FulCastle Holdings, Inc.",
          html: renderAcknowledgmentHtml(validated.name),
          text: [
            "FULCASTLE HOLDINGS, INC.",
            "",
            `Hello ${validated.name},`,
            "",
            "We’ve received your message through the FulCastle website contact form. Thank you for taking the time to get in touch.",
            "If a response is appropriate, the right person will follow up.",
            "",
            "This is an automated confirmation; please do not reply with sensitive information.",
          ].join("\n"),
        }),
        cache: "no-store",
      });
      acknowledgementSent = acknowledgement.ok;
      if (!acknowledgement.ok) {
        console.error("Resend rejected a contact acknowledgment.", { status: acknowledgement.status });
      }
    } catch {
      acknowledgementSent = false;
      console.error("Resend request failed while sending a contact acknowledgment.");
    }

    return NextResponse.json({ ok: true, acknowledgementSent });
  } catch {
    console.error("Resend request failed while sending a contact form email.");
    return NextResponse.json(
      { error: "We couldn’t send your message right now. Please try again later." },
      { status: 502 },
    );
  }
}
