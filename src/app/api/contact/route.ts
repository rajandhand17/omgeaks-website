import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "rajandhand17@gmail.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.omgeaks.com";

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function sendWithResend(payload: Required<Pick<ContactBody, "name" | "email" | "message">> & ContactBody) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || "OmGeaks Contact <onboarding@resend.dev>",
      to: [TO_EMAIL],
      reply_to: payload.email,
      subject: `OmGeaks enquiry from ${payload.name}`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Phone: ${payload.phone || "—"}`,
        `Company: ${payload.company || "—"}`,
        "",
        "Message:",
        payload.message,
      ].join("\n"),
    }),
  });

  const data = (await res.json().catch(() => ({}))) as { message?: string; id?: string };
  if (!res.ok) {
    throw new Error(data.message || "Resend failed to deliver the email.");
  }
  return { provider: "resend" as const, id: data.id };
}

async function sendWithGmail(payload: Required<Pick<ContactBody, "name" | "email" | "message">> & ContactBody) {
  const user = process.env.GMAIL_USER || TO_EMAIL;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!pass) return null;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const info = await transporter.sendMail({
    from: `"OmGeaks Website" <${user}>`,
    to: TO_EMAIL,
    replyTo: payload.email,
    subject: `OmGeaks enquiry from ${payload.name}`,
    text: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone || "—"}`,
      `Company: ${payload.company || "—"}`,
      "",
      "Message:",
      payload.message,
    ].join("\n"),
    html: `
      <h2>New OmGeaks enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(payload.phone || "—")}</p>
      <p><strong>Company:</strong> ${escapeHtml(payload.company || "—")}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(payload.message).replace(/\n/g, "<br/>")}</p>
    `,
  });

  return { provider: "gmail" as const, id: info.messageId };
}

async function sendWithWeb3Forms(payload: Required<Pick<ContactBody, "name" | "email" | "message">> & ContactBody) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) return null;

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `OmGeaks enquiry from ${payload.name}`,
      from_name: "OmGeaks Website",
      name: payload.name,
      email: payload.email,
      phone: payload.phone || "—",
      company: payload.company || "—",
      message: payload.message,
    }),
  });

  const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Web3Forms delivery failed.");
  }
  return { provider: "web3forms" as const };
}

async function sendWithFormSubmit(payload: Required<Pick<ContactBody, "name" | "email" | "message">> & ContactBody) {
  const res = await fetch(`https://formsubmit.co/ajax/${TO_EMAIL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: SITE_URL,
      Referer: `${SITE_URL}/contact`,
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      phone: payload.phone || "—",
      company: payload.company || "—",
      message: payload.message,
      _subject: `OmGeaks enquiry from ${payload.name}`,
      _template: "table",
      _captcha: "false",
      _replyto: payload.email,
    }),
  });

  const data = (await res.json().catch(() => ({}))) as {
    success?: string | boolean;
    message?: string;
  };

  const success = data.success === true || data.success === "true";
  if (!res.ok || !success) {
    const msg = data.message || "FormSubmit could not deliver this message.";
    // Surface activation clearly
    if (/activation/i.test(msg)) {
      throw new Error(
        "Email delivery needs a one-time activation. Check rajandhand17@gmail.com for a FormSubmit “Activate Form” email and click the link, then try again."
      );
    }
    throw new Error(msg);
  }

  return { provider: "formsubmit" as const };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const company = body.company?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and project details are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }

  const payload = { name, email, phone, company, message };
  const errors: string[] = [];

  try {
    const viaResend = await sendWithResend(payload);
    if (viaResend) {
      return NextResponse.json({ ok: true, provider: viaResend.provider });
    }
  } catch (err) {
    errors.push(err instanceof Error ? err.message : "Resend failed");
  }

  try {
    const viaGmail = await sendWithGmail(payload);
    if (viaGmail) {
      return NextResponse.json({ ok: true, provider: viaGmail.provider });
    }
  } catch (err) {
    errors.push(err instanceof Error ? err.message : "Gmail SMTP failed");
  }

  try {
    const viaWeb3 = await sendWithWeb3Forms(payload);
    if (viaWeb3) {
      return NextResponse.json({ ok: true, provider: viaWeb3.provider });
    }
  } catch (err) {
    errors.push(err instanceof Error ? err.message : "Web3Forms failed");
  }

  try {
    const viaFormSubmit = await sendWithFormSubmit(payload);
    return NextResponse.json({ ok: true, provider: viaFormSubmit.provider });
  } catch (err) {
    errors.push(err instanceof Error ? err.message : "FormSubmit failed");
  }

  return NextResponse.json(
    {
      ok: false,
      error:
        errors[errors.length - 1] ||
        "Could not send your message. Please try WhatsApp instead.",
      details: errors,
    },
    { status: 502 }
  );
}
