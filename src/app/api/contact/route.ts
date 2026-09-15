import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 120;
const MAX_EMAIL = 200;
const MAX_MESSAGE = 4000;
const MAX_FOCUS = 8;
const MAX_FOCUS_LEN = 40;

type ContactBody = {
  name?: unknown;
  email?: unknown;
  engagement?: unknown;
  focus?: unknown;
  message?: unknown;
};

function asTrimmedString(value: unknown, max: number) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

function asFocusList(value: unknown) {
  if (!Array.isArray(value)) return null;
  const cleaned = value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, MAX_FOCUS)
    .map((item) => item.slice(0, MAX_FOCUS_LEN));
  return cleaned.length ? Array.from(new Set(cleaned)) : null;
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json(
      { error: "Messaging is not configured." },
      { status: 503 },
    );
  }

  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const name = asTrimmedString(body.name, MAX_NAME);
  const email = asTrimmedString(body.email, MAX_EMAIL);
  const engagement = asTrimmedString(body.engagement, 40);
  const message = asTrimmedString(body.message, MAX_MESSAGE);
  const focus = asFocusList(body.focus);

  if (!name || !email || !EMAIL_PATTERN.test(email) || !engagement || !message || !focus) {
    return NextResponse.json({ error: "Invalid form fields." }, { status: 400 });
  }

  if (message.length < 20) {
    return NextResponse.json({ error: "Message too short." }, { status: 400 });
  }

  const text = [
    "Portfolio contact",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Engagement: ${engagement}`,
    `Focus: ${focus.join(", ")}`,
    "",
    message,
  ].join("\n");

  const telegramResponse = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    },
  );

  if (!telegramResponse.ok) {
    return NextResponse.json(
      { error: "Could not deliver the message." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
