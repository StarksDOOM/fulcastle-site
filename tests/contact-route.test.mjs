import assert from "node:assert/strict";
import test from "node:test";
import { POST } from "../app/api/contact/route.ts";

const originalFetch = globalThis.fetch;
const originalEnv = {
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
  CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
  CONTACT_CC_EMAIL: process.env.CONTACT_CC_EMAIL,
};

function configureEnvironment() {
  process.env.RESEND_API_KEY = "test-key";
  process.env.RESEND_FROM_EMAIL = "contact@fulcastle.com";
  process.env.CONTACT_TO_EMAIL = "inbox@example.com";
  process.env.CONTACT_CC_EMAIL = "copy@example.com";
}

function request(body, options = {}) {
  const headers = new Headers({
    "content-type": "application/json",
    host: "example.com",
    origin: "https://example.com",
    ...options.headers,
  });
  return new Request("https://example.com/api/contact", {
    method: "POST",
    headers,
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const validPayload = {
  name: "Avery Example",
  email: "Avery@EXAMPLE.COM",
  subject: "Partnership inquiry",
  message: "Please contact me about a potential partnership.",
  website: "",
};

test("contact endpoint validates fields and sends escaped branded notification plus acknowledgment", async () => {
  configureEnvironment();
  const sent = [];
  globalThis.fetch = async (_url, init) => {
    sent.push(JSON.parse(init.body));
    return new Response("{}", { status: 200 });
  };

  try {
    const response = await POST(request({
      ...validPayload,
      name: '<img src=x onerror="alert(1)">',
      message: "<script>alert('xss')</script>\nSecond line",
    }));
    const result = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(result, { ok: true, acknowledgementSent: true });
    assert.equal(sent.length, 2);
    assert.equal(sent[0].to[0], "inbox@example.com");
    assert.equal(sent[0].cc[0], "copy@example.com");
    assert.equal(sent[0].reply_to, "Avery@example.com");
    assert.match(sent[0].subject, /^Website Inquiry — Partnership inquiry$/);
    assert.ok(sent[0].html.includes("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;"));
    assert.doesNotMatch(sent[0].html, /<img src=x onerror=/);
    assert.doesNotMatch(sent[0].html, /<script>alert/);
    assert.match(sent[0].text, /<script>alert\('xss'\)<\/script>/);
    assert.equal(sent[1].to[0], "Avery@example.com");
    assert.match(sent[1].html, /Thank you for reaching out/);
    assert.ok(sent[1].html.includes("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;"));
    assert.doesNotMatch(sent[1].html, /<img src=x onerror=/);
    assert.match(sent[1].text, /Hello <img src=x onerror="alert\\(1\\)">,/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("rejects malformed JSON and non-object payloads", async () => {
  const malformed = await POST(request("{"));
  assert.equal(malformed.status, 400);

  const nonObject = await POST(request(["not", "an", "object"]));
  assert.equal(nonObject.status, 400);
});

test("rejects missing, wrong-type, malformed-email, and oversized fields", async () => {
  for (const payload of [
    { ...validPayload, name: "" },
    { ...validPayload, name: 42 },
    { ...validPayload, email: "not-an-email" },
    { ...validPayload, message: "x".repeat(5001) },
  ]) {
    const response = await POST(request(payload));
    assert.equal(response.status, 400);
  }
});

test("rejects mismatched origins", async () => {
  const response = await POST(request(validPayload, {
    headers: { origin: "https://attacker.example" },
  }));
  assert.equal(response.status, 403);
});

test("honeypot silently accepts bots without sending mail", async () => {
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return new Response("{}", { status: 200 });
  };

  try {
    const response = await POST(request({ ...validPayload, website: "https://spam.example" }));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.equal(calls, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("reports primary provider failure without claiming success", async () => {
  configureEnvironment();
  globalThis.fetch = async () => new Response("provider details must not leak", { status: 429 });

  try {
    const response = await POST(request(validPayload));
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), {
      error: "We couldn’t send your message right now. Please try again later.",
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("reports acknowledgment failure separately after notification succeeds", async () => {
  configureEnvironment();
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return calls === 1
      ? new Response("{}", { status: 200 })
      : new Response("provider details must not leak", { status: 503 });
  };

  try {
    const response = await POST(request(validPayload));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true, acknowledgementSent: false });
    assert.equal(calls, 2);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("rejects missing origin/host and preserves the configured environment in tests", async () => {
  const response = await POST(request(validPayload, {
    headers: { origin: "", host: "" },
  }));
  assert.equal(response.status, 403);

  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});
